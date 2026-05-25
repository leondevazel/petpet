import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import PetScreen from './src/screens/PetScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <PetScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
