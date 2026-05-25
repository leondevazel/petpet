import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';
import { AnimalId } from '../data/animals';

const USER_ID = 'default_user'; // single-user MVP

export interface SavedState {
  affinity: Record<AnimalId, number>;
  unlocked: Record<AnimalId, boolean>;
}

export async function loadFromFirebase(): Promise<SavedState | null> {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, 'users', USER_ID));
    return snap.exists() ? (snap.data() as SavedState) : null;
  } catch {
    return null;
  }
}

export async function saveToFirebase(state: SavedState): Promise<void> {
  if (!db) return;
  try {
    await setDoc(doc(db, 'users', USER_ID), state, { merge: true });
  } catch {
    // silent fail — local storage is the source of truth
  }
}
