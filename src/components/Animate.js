import {Animated, Easing, Platform} from 'react-native';

/**
 * Efeito de animação genérica usada nos componentes.
 */
export const QuinticEaseOut = Easing.bezier(0.23, 1, 0.32, 1);

/**
 * Animação genérica usada nos componentes.
 *
 * @param value
 * @param toValue
 * @param callback
 */
const Animate = (value, toValue, callback, native, start, duration) => {
  const hardwareAccelerated = Platform.select({ios: false, default: true});

  const animation = Animated.timing(value, {
    duration: duration || 150,
    easing: QuinticEaseOut,
    toValue: toValue,
    useNativeDriver: native || hardwareAccelerated,
  });

  if (start === undefined || start === true) {
    animation.start(callback);
  }

  return animation;
};

export default Animate;
