import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
const segmentWidth = 2;
const rulerWidth = 500;

export default StyleSheet.create({
  segment: {
    width: segmentWidth,
  },
  ruler: {
    width: rulerWidth,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
