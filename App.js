/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Slider from './src/components/Slider';
import Ruler from './src/components/Ruler';

class App extends React.Component {
  state = {
    money: 0,
  };
  render() {
    const renderItem = () => {
      return (
        <View
          style={{
            elevation: 5,
            width: 60,
            height: 60,
            borderRadius: 30,
            borderColor: '#f1f2f6',
            backgroundColor: 'white',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}></View>
      );
    };
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{justifyContent: 'center', flexDirection: 'column', flex: 1}}>
          <View style={{flex: 4, backgroundColor: '#fefefe'}}>
            <Text style={{color: '#000'}}>
              Money to Save :{this.state.money}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fefefe',
              alignItems: 'flex-end',
            }}>
            <Slider
              renderItem={() => renderItem()}
              onDrop={val => this.setState({money: val})}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
