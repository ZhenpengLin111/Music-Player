import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { SplashScreen, Stack } from "expo-router";
import { useCallback } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { colors } from "@/constants/tokens";
import TrackPlayer from "react-native-track-player";
import { playbackService } from "@/constants/playbackService";

SplashScreen.preventAutoHideAsync() // Keep the splash screen visible while we fetch resources

TrackPlayer.registerPlaybackService(() => playbackService)

const App = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded
  })

  useLogTrackPlayerState()
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />

        <StatusBar />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

      <Stack.Screen
        name="player"
        options={{
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 400,
          headerShown: false
        }}
      />

      <Stack.Screen
        name="(modals)/addToPlaylist"
        options={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor: colors.background
          },
          headerTitle: 'Add to playlist',
          headerTitleStyle: {
            color: colors.text
          }
        }}
      />
    </Stack>
  )
}

export default App