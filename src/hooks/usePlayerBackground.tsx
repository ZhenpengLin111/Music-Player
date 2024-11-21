import { colors } from "@/constants/tokens"
import { useEffect, useState } from "react"
import { IOSImageColors } from 'react-native-image-colors/build/types'
import { getColors } from 'react-native-image-colors' //Fetch prominent colors from an image.

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<IOSImageColors | null>(null)

  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl
    }).then((colors) => setImageColors(colors as IOSImageColors))
  }, [imageUrl])

  return { imageColors }
}