import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, color }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assets/panel/1.png');
      break;
    case '2':
      imageSource = require('../assets/panel/2.png');
      break;
    case '3':
      imageSource = require('../assets/panel/3.png');
      break;
    case 'romb':
      imageSource = require('../assets/romb.png');
      iconStyle.push({tintColor: color});
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fff',
  },
});

export default Icons;
