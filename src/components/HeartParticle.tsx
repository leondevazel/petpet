import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const SYMBOLS = ['❤️', '💕', '💖', '💗', '⭐', '✨'];

interface Props {
  x: number;
  y: number;
  onDone: () => void;
}

export default function HeartParticle({ x, y, onDone }: Props) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);

  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  const drift = (Math.random() - 0.5) * 60;

  useEffect(() => {
    scale.value = withSequence(withSpring(1.4), withSpring(1));
    translateY.value = withTiming(-90, { duration: 900, easing: Easing.out(Easing.quad) });
    translateX.value = withTiming(drift, { duration: 900 });
    opacity.value = withTiming(0, { duration: 900 }, finished => {
      if (finished) runOnJS(onDone)();
    });
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.heart, { left: x - 16, top: y - 16 }, style]}>
      <Text style={styles.symbol}>{symbol}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  heart: {
    position: 'absolute',
    zIndex: 10,
  },
  symbol: {
    fontSize: 28,
  },
});
