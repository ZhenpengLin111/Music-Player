import { TrackList } from "@/components/TrackList";
import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { View, ScrollView } from 'react-native'
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useFavorites } from "@/store/library";
import { trackTitleFilter } from "@/helpers/filter";
import { useMemo } from "react";
import { generateTracksListId } from "@/helpers/miscellaneous";

const FavoritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs'
    }
  })

  const favoritesTracks = useFavorites().favorites

  const filteredFavoritesTracks = useMemo(() => {
    if (!search) return favoritesTracks

    return favoritesTracks.filter(trackTitleFilter(search))
  }, [search, favoritesTracks])

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TrackList id={generateTracksListId('favorites', search)} scrollEnabled={false} tracks={filteredFavoritesTracks} />
      </ScrollView>
    </View>
  )
}

export default FavoritesScreen