import React, { FC } from 'react';
import {
  Image as NativeImage,
  ImageProps,
  ImageSourcePropType,
  Omit,
} from 'react-native';

export interface IImageProps {
  source: ImageSourcePropType;
}

type IImageTypes = IImageProps & Omit<ImageProps, 'source'>;

const Image: FC<IImageTypes> = ({ source, defaultSource, ...props }) => {
  // const [imageSource,] = useState<ImageSourcePropType | undefined>(defaultSource);

  // useEffect(() => {
  //   if (source !== undefined) {
  //     if ((source as ImageURISource).uri) {
  //       const nSource = source as ImageURISource;
  //       NativeImage.getSize(
  //         source.uri,
  //         (width: number, height: number) => { },
  //         error => {
  //           console.warn(`Image is not Loaded \n reason:${error}`);
  //         },
  //       );
  //     }
  //   }
  // }, []);

  return (
    <NativeImage source={source} defaultSource={defaultSource} {...props} />
  );
};

export default Image;
