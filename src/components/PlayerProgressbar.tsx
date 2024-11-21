import { StyleSheet, Text, View, ViewProps } from 'react-native'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import { formatSecondsToMinutes } from '@/helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '@/styles'
import { colors, fontSize } from '@/constants/tokens'

export const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250) // pull the current track progress for the given interval, and this interval will be 250 millisecond

  const isSliding = useSharedValue(false) // to tell if the user is sliding along the progress bar or not
  const progress = useSharedValue(0)
  const min = useSharedValue(0)
  const max = useSharedValue(1)

  const trackElapsedTime = formatSecondsToMinutes(position)
  const trackRemainingTime = formatSecondsToMinutes(duration - position)

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0 // to calculate how much the track has progress over time, how many percent?
  }

  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilsStyles.slider}
        thumbWidth={0}
        renderBubble={() => null} // idling the render bubble
        theme={{
          minimumTrackTintColor: colors.minimumTrackTintColor,
          maximumTrackTintColor: colors.maximumTrackTintColor
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration) // every time we slide and we stop to a specific positon, trigger the seekTo operation
        }}
        onSlidingComplete={async (value) => {
          // if the user is not sliding, we should not update the postion
          if (!isSliding.value) return

          isSliding.value = false

          await TrackPlayer.seekTo(value * duration)
        }}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>

        <Text style={styles.timeText}>
          {'-'} {trackRemainingTime}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 20
  },
  timeText: {
    ...defaultStyles.text,
    color: colors.text,
    opacity: 0.75,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    fontWeight: '500',
  }
})