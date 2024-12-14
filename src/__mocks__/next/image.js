// __mocks__/next/image.js
import React from 'react';

const NextImage = ({ src, alt, ...rest }) => {
  return <img src={src} alt={alt} {...rest} />;
};

export default NextImage;
