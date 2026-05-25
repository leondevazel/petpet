import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ANIMALS, AnimalData, AnimalId } from '../data/animals';

interface Props {
  selected: AnimalId;
  unlocked: Record<AnimalId, boolean>;
  affinity: Record<AnimalId, number>;
  onSelect: (id: AnimalId) => void;
}

export default function AnimalSelector({ selected, unlocked, affinity, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {ANIMALS.map(animal => {
          const isUnlocked = unlocked[animal.id];
          const isSelected = selected === animal.id;
          const ratio = isUnlocked ? Math.min(affinity[animal.id] / animal.maxAffinity, 1) : 0;

          return (
            <TouchableOpacity
              key={animal.id}
              onPress={() => isUnlocked && onSelect(animal.id)}
              activeOpacity={isUnlocked ? 0.7 : 1}
              style={[
                styles.slot,
                isSelected && { borderColor: animal.accentColor, backgroundColor: animal.bgColor },
                !isUnlocked && styles.locked,
              ]}
            >
              {isUnlocked ? (
                <>
                  <Text style={styles.emoji}>{animal.emoji}</Text>
                  {/* mini gauge */}
                  <View style={styles.miniGaugeTrack}>
                    <View
                      style={[
                        styles.miniGaugeFill,
                        { width: `${ratio * 100}%` as any, backgroundColor: animal.accentColor },
                      ]}
                    />
                  </View>
                </>
              ) : (
                <Text style={styles.lock}>🔒</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#333',
    backgroundColor: '#FAF0DC',
  },
  scroll: {
    paddingHorizontal: 12,
    gap: 8,
  },
  slot: {
    width: 58,
    height: 58,
    borderWidth: 3,
    borderColor: '#888',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  emoji: {
    fontSize: 28,
  },
  lock: {
    fontSize: 22,
  },
  locked: {
    opacity: 0.4,
  },
  miniGaugeTrack: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderWidth: 1,
    borderColor: '#999',
    overflow: 'hidden',
  },
  miniGaugeFill: {
    height: '100%',
  },
});
