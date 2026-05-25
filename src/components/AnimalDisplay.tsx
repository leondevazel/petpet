import React, { useEffect, useRef, useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { AnimalData, AnimalMood } from '../data/animals';
import HeartParticle from './HeartParticle';

interface Heart {
  id: number;
  x: number;
  y: number;
}

interface Props {
  animal: AnimalData;
  affinity: number;
  onPet: (amount: number) => void;
}

let heartCounter = 0;

function getMood(affinity: number, max: number): AnimalMood {
  const r = affinity / max;
  if (r >= 0.8) return 'love';
  if (r >= 0.3) return 'happy';
  return 'idle';
}

export default function AnimalDisplay({ animal, affinity, onPet }: Props) {
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);

  const lastPetX = useSharedValue(0);
  const lastPetTime = useSharedValue(0);

  const [hearts, setHearts] = useState<Heart[]>([]);

  const mood = getMood(affinity, animal.maxAffinity);

  // Idle bounce
  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 900 }),
        withTiming(0, { duration: 900 }),
      ),
      -1,
    );
    return () => cancelAnimation(translateY);
  }, [animal.id]);

  const spawnHeart = useCallback((x: number, y: number) => {
    const id = heartCounter++;
    setHearts(prev => [...prev, { id, x, y }]);
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
  }, []);

  const triggerPet = (x: number, y: number) => {
    'worklet';
    // Wiggle
    cancelAnimation(rotateZ);
    rotateZ.value = withSequence(
      withTiming(-18, { duration: 65 }),
      withTiming(18, { duration: 65 }),
      withTiming(-10, { duration: 65 }),
      withTiming(10, { duration: 65 }),
      withTiming(0, { duration: 65 }),
    );
    scale.value = withSequence(
      withSpring(1.18, { damping: 6, stiffness: 200 }),
      withSpring(1, { damping: 12 }),
    );
    runOnJS(onPet)(animal.affinityPerStroke);
    runOnJS(spawnHeart)(x, y);
  };

  const panGesture = Gesture.Pan()
    .minDistance(8)
    .onBegin(e => {
      lastPetX.value = e.x;
    })
    .onUpdate(e => {
      const dx = Math.abs(e.x - lastPetX.value);
      const now = Date.now();
      if (dx > 22 && now - lastPetTime.value > 180) {
        lastPetX.value = e.x;
        lastPetTime.value = now;
        triggerPet(e.absoluteX, e.absoluteY - 80);
      }
    });

  const animalStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={[styles.wrapper, { backgroundColor: animal.bgColor }]}>
      {/* Hearts layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {hearts.map(h => (
          <HeartParticle key={h.id} x={h.x} y={h.y} onDone={() => removeHeart(h.id)} />
        ))}
      </View>

      <GestureDetector gesture={panGesture}>
        <View style={styles.hitArea}>
          <Animated.View style={animalStyle}>
            <Text style={styles.emoji}>{animal.emoji}</Text>
          </Animated.View>
        </View>
      </GestureDetector>

      {/* Message bubble */}
      <View style={[styles.bubble, { borderColor: animal.accentColor }]}>
        <Text style={[styles.bubbleText, { color: animal.accentColor }]}>
          {animal.messages[mood]}
        </Text>
      </View>

      <Text style={styles.hint}>← 손가락으로 쓰다듬어 주세요 →</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  hitArea: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 130,
    textAlign: 'center',
  },
  bubble: {
    backgroundColor: '#FFFFFFEE',
    borderWidth: 3,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
    maxWidth: 280,
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
    fontWeight: '600',
  },
  hint: {
    marginTop: 12,
    fontSize: 10,
    color: '#AAA',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
});
