import React from 'react';
import weatherIconMap from './weatherIcon';

const WeatherIcons = ({ weatherType, size = 60 }) => {
  const iconSrc = weatherIconMap[weatherType] || weatherIconMap['Clear'];

  return (
    <img
      src={iconSrc}
      alt={weatherType}
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default WeatherIcons;
