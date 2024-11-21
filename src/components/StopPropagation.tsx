import { View } from "react-native"
import { PropsWithChildren } from "react"

export const StopPropagation = ({ children }: PropsWithChildren) => {
  return (
    <View onStartShouldSetResponder={() => true} onTouchEnd={(e) => e.stopPropagation()}>
      {children}
    </View>
  )
}