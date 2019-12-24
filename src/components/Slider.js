import React, {PureComponent} from 'react';
import {
  PanResponder,
  Animated,
  Dimensions,
  View,
  Vibration,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('screen');

class Slider extends PureComponent {
  state = {
    scale: 50,
    saveValue: 0,
    slidePan: new Animated.ValueXY(),
    displacementX: 0,
    vibrate: false,
    press: false,
    startY: {set: false, value: 0},
  };

  unit =
    width / (this.props.maxScale - this.props.minScale) + this.props.minScale;

  createPanHandler = () => {
    panresponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({press: true});
      },
      onPanResponderMove: (evt, gestureState) => {
        let val = Math.round(gestureState.moveX / this.unit);
        //Store Location of First Touch
        if (this.state.startY.set == false) {
          this.setState({startY: {set: true, value: gestureState.moveY}});
        }

        //Move in X-axis if displacement in Y isn't great enough else Start movement in Y
        if (
          gestureState.moveY >
          this.state.startY.value - this.props.itemRadius
        ) {
          this.setState({scale: val});
          Animated.event([
            {x: this.state.slidePan.x, y: this.state.slidePan.y},
          ])({
            x: gestureState.dx,
            y: 0,
          });
          this.setState({displacementX: gestureState.dx});
          this.setState({vibrate: false});
        } else {
          if (!this.state.vibrate) {
            Vibration.vibrate(10);
          }
          this.setState({vibrate: true});
          Animated.event([
            {x: this.state.slidePan.x, y: this.state.slidePan.y},
          ])({
            x: this.state.displacementX,
            y: gestureState.dy,
          });
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        Vibration.vibrate(20);
        this.setState({startY: {set: false, value: 0}});
        this.setState({displacementX: 0});
        this.setState({press: false});
        if (
          gestureState.moveY <
          this.state.startY.value - this.props.dropZoneDistance
        ) {
          console.log(this.state.scale);
          this.props.onDrop(this.state.scale);
          this.setState({saveValue: this.state.scale});
        }

        this.setState({scale: 50});
        Animated.spring(this.state.slidePan, {
          toValue: {x: 0, y: 0},
          friction: 5,
        }).start();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  };

  constructor(props) {
    super(props);
    this.createPanHandler();
  }

  render() {
    const panStyle = {
      transform: this.state.slidePan.getTranslateTransform(),
    };
    return (
      <View>
        <View
          style={{
            width: width,
            height: this.props.itemRadius * 2,
            borderRadius: this.props.itemRadius,
            backgroundColor: '#f1f2f6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {this.state.press && (
            <Text
              style={{
                fontSize: 40,
                fontFamily: 'Menlo',
              }}>
              {this.state.scale.toString()}
            </Text>
          )}
          <Animated.View
            {...panresponder.panHandlers}
            style={[panStyle, {position: 'absolute'}]}>
            {this.props.renderItem()}
          </Animated.View>
        </View>
      </View>
    );
  }
}

Slider.defaultProps = {
  minScale: 0,
  maxScale: 100,
  itemRadius: 30,
  dropZoneDistance: 150,
  onDrop: () => x,
};

Slider.propTypes = {
  renderItem: PropTypes.func.isRequired,
  minScale: PropTypes.number,
  maxScale: PropTypes.number,
  itemRadius: PropTypes.number,
  dropZoneDistance: PropTypes.number,
  onDrop: PropTypes.func,
  renderScale: PropTypes.func,
};

export default Slider;
