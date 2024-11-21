import { colors } from "@/constants/tokens"
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { ViewStyle, View, TouchableOpacity, StyleSheet } from "react-native"
import TrackPlayer, { useIsPlaying } from "react-native-track-player"

type PlayerControlsProps = {
  style?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton />

        <PlayPauseButton iconSize={48}/>

        <SkipToNextButton />
      </View>
    </View>
  )
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
  const { playing } = useIsPlaying() // tells whether if the track player is in the state 'playing'

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play} // play or pause the current track
      >
        <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  )
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name="backward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})