// set up react-native-track-player

import { useEffect, useRef } from "react"
import TrackPlayer, { Capability, RatingType, RepeatMode } from "react-native-track-player"

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10, // introduce a caching system to avoid buffering when fetching resources on outer API
  })

  await TrackPlayer.updateOptions({
    ratingType: RatingType.Heart,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop
    ]
  }) // for setting up remote control feature

  await TrackPlayer.setVolume(0.5) // not too loud
  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false) // to avoid re-executing the useEffect in case the application reloads again

  useEffect(() => {
    setupPlayer().then(() => {
      isInitialized.current = true
      onLoad?.() // excute this function if it is defined
    })
      .catch((error) => {
        isInitialized.current = true
        console.error(error)
      })
  }, [onLoad])
}