import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://www.dropbox.com/scl/fi/pub6lsd80izv9hg89mpj3/ChatGPT-Image-Feb-26-2026-02_46_37-PM.png?rlkey=nyp3nzm5qyj9l6p0jnzykyps4&st=zdegfqsw&raw=1' }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
