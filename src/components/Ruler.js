import React from 'react';
import {View} from 'react-native';
import styles from '../assets/Style/StyleSheet';
const data = [...Array(101).keys()].map(i => i);
const Ruler = () => {
  return (
    <View style={styles.ruler}>
      {data.map(i => {
        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: '#000000',
                height: 20,
                marginRight: i === data.length - 1 ? 0 : 20,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Ruler;
