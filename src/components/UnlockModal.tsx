import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { ANIMALS, AnimalId } from '../data/animals';

interface Props {
  animalId: AnimalId;
  onClose: () => void;
}

export default function UnlockModal({ animalId, onClose }: Props) {
  const animal = ANIMALS.find(a => a.id === animalId)!;
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 8, stiffness: 120 });
    rotation.value = withRepeat(
      withSequence(withTiming(-10, { duration: 200 }), withTiming(10, { duration: 200 })),
      4,
      true,
    );
  }, []);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.card, { borderColor: animal.accentColor, backgroundColor: animal.bgColor }]}>
          <Text style={styles.congrats}>★ 해금! ★</Text>
          <Animated.View style={emojiStyle}>
            <Text style={styles.bigEmoji}>{animal.emoji}</Text>
          </Animated.View>
          <Text style={[styles.animalName, { color: animal.accentColor }]}>{animal.name}</Text>
          <Text style={styles.message}>{animal.unlockMessage}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.button, { backgroundColor: animal.accentColor }]}
          >
            <Text style={styles.buttonText}>쓰다듬으러 가기!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    padding: 28,
    borderWidth: 4,
    alignItems: 'center',
    gap: 12,
  },
  congrats: {
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
  },
  bigEmoji: {
    fontSize: 100,
  },
  animalName: {
    fontSize: 22,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: '#444',
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: '#333',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
