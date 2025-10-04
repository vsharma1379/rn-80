import type { ImageProps, ImageSourcePropType } from 'react-native';

import { useMemo } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import * as z from 'zod';

import { useTheme } from '@/theme';
import getAssetsContext from '@/theme/assets/getAssetsContext';

type Properties = {
  readonly extension?: string;
  readonly path: string;
} & Omit<ImageProps, 'source'>;

const images = getAssetsContext('images');

function AssetByVariant({ extension = 'png', path, ...props }: Properties) {
  const { variant } = useTheme();

  const image = useMemo(() => {
    const getDefaultSource = () =>
      z.custom<ImageSourcePropType>().parse(images(`./${path}.${extension}`));

    try {
      if (variant === 'default') {
        return getDefaultSource();
      }

      try {
        return z
          .custom<ImageSourcePropType>()
          .parse(images(`./${variant}/${path}.${extension}`));
      } catch (error) {
        console.warn(
          `Couldn't load the image: ${path}.${extension} for the variant ${variant}, Fallback to default`,
          error,
        );
        return getDefaultSource();
      }
    } catch (error) {
      console.error(`Couldn't load the image: ${path}`, error);
      return undefined;
    }
  }, [path, extension, variant]);

  return (
    <>
      <Text style={styles.whiteText}>vivek sharma</Text>
      {image && <Image source={image} testID="variant-image" {...props} />}
    </>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AssetByVariant;
