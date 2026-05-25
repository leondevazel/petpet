import { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANIMALS, AnimalId } from '../data/animals';
import { loadFromFirebase, saveToFirebase } from '../firebase/service';

const STORAGE_KEY = '@petpet:affinity';
const UNLOCKED_KEY = '@petpet:unlocked';

const DEFAULT_AFFINITY: Record<AnimalId, number> = {
  dog: 0, cat: 0, rabbit: 0, hamster: 0, bird: 0,
};

const DEFAULT_UNLOCKED: Record<AnimalId, boolean> = {
  dog: true, cat: false, rabbit: false, hamster: false, bird: false,
};

export interface AffinityHook {
  affinity: Record<AnimalId, number>;
  unlocked: Record<AnimalId, boolean>;
  newlyUnlocked: AnimalId | null;
  clearNewlyUnlocked: () => void;
  addAffinity: (id: AnimalId, amount: number) => void;
}

export function useAffinity(): AffinityHook {
  const [affinity, setAffinity] = useState<Record<AnimalId, number>>(DEFAULT_AFFINITY);
  const [unlocked, setUnlocked] = useState<Record<AnimalId, boolean>>(DEFAULT_UNLOCKED);
  const [newlyUnlocked, setNewlyUnlocked] = useState<AnimalId | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      // Try Firebase first, fall back to AsyncStorage
      const remote = await loadFromFirebase();
      if (remote) {
        setAffinity(remote.affinity);
        setUnlocked(remote.unlocked);
        return;
      }
      const [affinityStr, unlockedStr] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(UNLOCKED_KEY),
      ]);
      if (affinityStr) setAffinity(JSON.parse(affinityStr));
      if (unlockedStr) setUnlocked(JSON.parse(unlockedStr));
    })();
  }, []);

  const persist = useCallback(
    (nextAffinity: Record<AnimalId, number>, nextUnlocked: Record<AnimalId, boolean>) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextAffinity));
        AsyncStorage.setItem(UNLOCKED_KEY, JSON.stringify(nextUnlocked));
        saveToFirebase({ affinity: nextAffinity, unlocked: nextUnlocked });
      }, 500);
    },
    [],
  );

  const addAffinity = useCallback(
    (id: AnimalId, amount: number) => {
      setAffinity(prev => {
        const animal = ANIMALS.find(a => a.id === id)!;
        const current = prev[id];
        if (current >= animal.maxAffinity) return prev;

        const next = Math.min(current + amount, animal.maxAffinity);
        const nextAffinity = { ...prev, [id]: next };

        // Check for unlock
        if (next >= animal.maxAffinity && current < animal.maxAffinity) {
          const idx = ANIMALS.findIndex(a => a.id === id);
          if (idx < ANIMALS.length - 1) {
            const nextAnimal = ANIMALS[idx + 1];
            setUnlocked(prevUnlocked => {
              if (prevUnlocked[nextAnimal.id]) return prevUnlocked;
              const nextUnlocked = { ...prevUnlocked, [nextAnimal.id]: true };
              setNewlyUnlocked(nextAnimal.id);
              persist(nextAffinity, nextUnlocked);
              return nextUnlocked;
            });
          } else {
            setUnlocked(prevUnlocked => {
              persist(nextAffinity, prevUnlocked);
              return prevUnlocked;
            });
          }
        } else {
          setUnlocked(prevUnlocked => {
            persist(nextAffinity, prevUnlocked);
            return prevUnlocked;
          });
        }

        return nextAffinity;
      });
    },
    [persist],
  );

  const clearNewlyUnlocked = useCallback(() => setNewlyUnlocked(null), []);

  return { affinity, unlocked, newlyUnlocked, clearNewlyUnlocked, addAffinity };
}
