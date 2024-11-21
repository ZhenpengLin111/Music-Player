import { TrackList } from "@/components/TrackList";
import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { ScrollView, View } from 'react-native'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import { useTracks } from "@/store/library";
import { generateTracksListId } from "@/helpers/miscellaneous";

const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs',
    }
  })

  const tracks = useTracks()

  const filteredTracks = useMemo(() => {
    if (!search) return tracks

    return tracks.filter(trackTitleFilter(search))
  }, [search, tracks]) // calculating filteredSongs could be very expensive operation, to aviod calulating filteredSongs on every rerender.

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList id={generateTracksListId('songs', search)} tracks={filteredTracks} scrollEnabled={false} />
      </ScrollView>
    </View>
  )
}

export default SongsScreen