import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
});
