import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import { useAffinity } from '../hooks/useAffinity';
import { ANIMALS, AnimalId } from '../data/animals';
import AnimalDisplay from '../components/AnimalDisplay';
import AnimalSelector from '../components/AnimalSelector';
import AffinityGauge from '../components/AffinityGauge';
import UnlockModal from '../components/UnlockModal';

export default function PetScreen() {
  const [selectedId, setSelectedId] = useState<AnimalId>('dog');
  const { affinity, unlocked, newlyUnlocked, clearNewlyUnlocked, addAffinity } = useAffinity();

  const animal = ANIMALS.find(a => a.id === selectedId)!;

  const handlePet = useCallback(
    (amount: number) => {
      addAffinity(selectedId, amount);
    },
    [selectedId, addAffinity],
  );

  const handleSelect = useCallback((id: AnimalId) => {
    setSelectedId(id);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF0DC" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🐾 PetPet! 🐾</Text>
      </View>

      {/* Animal tabs */}
      <AnimalSelector
        selected={selectedId}
        unlocked={unlocked}
        affinity={affinity}
        onSelect={handleSelect}
      />

      {/* Main petting area */}
      <AnimalDisplay
        animal={animal}
        affinity={affinity[selectedId]}
        onPet={handlePet}
      />

      {/* Affinity gauge */}
      <View style={styles.gaugeArea}>
        <AffinityGauge animal={animal} affinity={affinity[selectedId]} />
      </View>

      {/* Unlock modal */}
      {newlyUnlocked && (
        <UnlockModal
          animalId={newlyUnlocked}
          onClose={() => {
            clearNewlyUnlocked();
            setSelectedId(newlyUnlocked);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAF0DC',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#333',
    backgroundColor: '#FAF0DC',
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
  },
  gaugeArea: {
    paddingVertical: 12,
    borderTopWidth: 3,
    borderTopColor: '#333',
    backgroundColor: '#FAF0DC',
  },
});
