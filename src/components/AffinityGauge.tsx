import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from 'react-native-reanimated';
import { AnimalData } from '../data/animals';

interface Props {
  animal: AnimalData;
  affinity: number;
}

const GAUGE_WIDTH = 280;

export default function AffinityGauge({ animal, affinity }: Props) {
  const ratio = Math.min(affinity / animal.maxAffinity, 1);
  const fillWidth = ratio * GAUGE_WIDTH;
  const isMax = affinity >= animal.maxAffinity;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>호감도</Text>
        <Text style={[styles.value, { color: animal.accentColor }]}>
          {isMax ? 'MAX! 💕' : `${Math.floor(affinity)} / ${animal.maxAffinity}`}
        </Text>
      </View>

      <View style={[styles.track, { width: GAUGE_WIDTH }]}>
        {/* Pixel-art segment lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={[styles.segment, { left: (GAUGE_WIDTH / 10) * i }]} />
        ))}
        <LinearGradient
          colors={isMax ? ['#FFD700', '#FF8C00'] : [animal.accentColor + 'CC', animal.accentColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: fillWidth }]}
        />
      </View>

      {isMax && (
        <Text style={[styles.maxText, { color: animal.accentColor }]}>
          ✨ 다음 동물이 해금되었어요! ✨
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#555',
    letterSpacing: 1,
  },
  value: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  track: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderWidth: 3,
    borderColor: '#333',
    overflow: 'hidden',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  segment: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#33333322',
    zIndex: 1,
  },
  maxText: {
    marginTop: 8,
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
