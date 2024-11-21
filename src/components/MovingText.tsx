// Moving text animation for text is too long
import { useEffect } from 'react'
import Animated, { withTiming, cancelAnimation, Easing, StyleProps, useAnimatedStyle, useSharedValue, withRepeat, withDelay } from 'react-native-reanimated'

export type MovingTextProps = {
  text: string
  animationThreshold: number
  style?: StyleProps
}

export const MovingText = ({ text, animationThreshold, style }: MovingTextProps) => {
  const translateX = useSharedValue(0)
  const shouldAnimate = text.length >= animationThreshold

  const textWidth = text.length * 3

  useEffect(() => {
    if (!shouldAnimate) return

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(
          -textWidth, //aniamtion going from left to right
          {
            duration: 5000, // duration of the animation
            easing: Easing.linear // a easing function
          }
        ), -1, true)) // 1s, withRepeat: if the animation should be back and fore forever, withTiming: the actual animation, -1 means the animation goes forever, true: reverse the animation

    return () => {
      cancelAnimation(translateX)
      translateX.value = 0
    }
  }, [translateX, text, animationThreshold, shouldAnimate, textWidth])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    }
  })

  return <Animated.Text
    numberOfLines={1}
    style={[
      style,
      animatedStyle,
      shouldAnimate && {
        width: 9999, // preventing the ellipsis from appearing
        paddingLeft: 16, // avoid the initial character being barely visible
      }
    ]}>
    {text}
  </Animated.Text>
}