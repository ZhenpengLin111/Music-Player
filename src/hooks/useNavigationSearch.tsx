// for search functionality
import { colors } from '@/constants/tokens'
import { useLayoutEffect, useState } from 'react'
import { SearchBarProps } from 'react-native-screens'
import { useNavigation } from 'expo-router'

const defaultSearchOptions: SearchBarProps = {
  tintColor: colors.primary,
  hideWhenScrolling: false
}

export const useNavigationSearch = ({ searchBarOptions }: { searchBarOptions?: SearchBarProps }) => {
  const [search, setSearch] = useState('')
  const navigation = useNavigation() //Expo Router exports a custom useNavigation hook that optionally accepts a relative route fragment to access any parent navigation prop.

  const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent: { text } }) => {
    setSearch(text)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText:
          handleOnChangeText // a call back function that will update our search when we are going to type something in the search bar
      }
    })
  }, [navigation, searchBarOptions])

  return search
}

