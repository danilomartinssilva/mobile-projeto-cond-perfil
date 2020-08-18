import React, {Component} from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, dimensions} from '../theme';
import Animate from './Animate';
import OkCancelView from './OkCancelView';

export default class DatePickerIOS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dismiss: false,
      animated: new Animated.Value(0),
    };
  }

  _onShow = () => {
    this.setState({dismiss: true}, () => {
      Animate(this.state.animated, 1);
    });
  };

  _onDismiss = () => {
    Animate(this.state.animated, 0).start(({finished}) => {
      if (!finished) {
        return;
      }

      this.setState({dismiss: false});
      this.props.onDismiss(false);
    });
  };

  render() {
    const {children, visible} = this.props;
    const {animated} = this.state;

    const translateY = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    return (
      <Modal
        onShow={this._onShow}
        onDismiss={this._onDismiss}
        hardwareAccelerated={false}
        transparent={true}
        visible={visible}>
        <TouchableWithoutFeedback onPress={this._onDismiss}>
          <Animated.View style={[styles.backdrop]} />
        </TouchableWithoutFeedback>
        <Animated.View style={{...styles.wrapper, transform: [{translateY}]}}>
          <OkCancelView
            onCancel={() => {
              this.props.onCancel();
              this._onDismiss();
            }}
            onOk={() => {
              this.props.onOk();
              this._onDismiss();
            }}
          />
          <View style={styles.datePicker}>{children}</View>
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backdrop,
  },
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  datePicker: {
    width: dimensions.width,
    backgroundColor: colors.lightTint,
  },
});
