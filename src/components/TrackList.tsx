import { FlatList, FlatListProps, View, Text } from "react-native";
import library from '@/assets/data/library.json'
import TrackListItem from "./TrackListItem";
import { utilsStyles } from "@/styles";
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "@/constants/images";
import { useRef } from "react";
import { useQueue } from "@/store/queue";
import { QueueControls } from "./QueueControls";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  id: string
  tracks: Track[]
  hideQueueControls?: boolean
}

const ItemDivider = () => {
  return (
    <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
  )
}

export const TrackList = ({ id, tracks, hideQueueControls = false, ...flatlistProps }: TracksListProps) => {
  const queueOffset = useRef(0) // not causing a rerender when the Q offset change so store it inside a useRef, it's used for saving the currently index of the truck being played
  const { activeQueueId, setActiveQueueId } = useQueue()

  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

    if (trackIndex === -1) return // if can not find the track, do nothing

    const isChangingQueue = id !== activeQueueId

    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex)
      const afterTracks = tracks.slice(trackIndex + 1)

      await TrackPlayer.reset()

      // we construct the new queue
      await TrackPlayer.add(selectedTrack)
      await TrackPlayer.add(afterTracks)
      await TrackPlayer.add(beforeTracks)

      await TrackPlayer.play()

      queueOffset.current = trackIndex
      setActiveQueueId(id)
    } else {
      const nextTrackIndex = trackIndex - queueOffset.current < 0
        ? tracks.length + trackIndex - queueOffset.current
        : trackIndex - queueOffset.current

      await TrackPlayer.skip(nextTrackIndex)
      TrackPlayer.play()
    }
  }

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
      ListHeaderComponent={!hideQueueControls ? <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} /> : undefined}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>
            No songs found
          </Text>
          <FastImage
            source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      renderItem={({ item: track }) => (
        <TrackListItem
          track={track}
          onTrackSelect={handleTrackSelect}
        />
      )}
      {...flatlistProps}
    />
  )
}