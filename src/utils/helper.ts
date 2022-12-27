import Device from 'react-native-device-info';
import {Dimensions} from 'react-native';

export const Helper = {
  isTablet: () => {
    return Device.isTablet();
  },
  windowWidth: () => {
    const {width} = Dimensions.get('window');
    return width;
  }
}