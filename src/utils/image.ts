export function getImageSource(image: string | number | undefined) {
  if (typeof image === 'string') {
    return { uri: image };
  }
  return image;
} 