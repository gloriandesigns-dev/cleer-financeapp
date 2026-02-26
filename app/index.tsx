import React, { useEffect } from 'react';
import { StyleSheet, Image, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, runOnJS } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const hintOpacity = useSharedValue(0);

  useEffect(() => {
    // Soft fade-in animation
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withTiming(1, { duration: 800 });
    hintOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
  }, []);

  const handlePress = () => {
    // Soft fade-out animation before navigation
    opacity.value = withTiming(0, { duration: 500 });
    scale.value = withTiming(1.05, { duration: 500 });
    hintOpacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(router.replace)('/onboarding');
    });
  };

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const animatedHintStyle = useAnimatedStyle(() => ({
    opacity: hintOpacity.value,
  }));

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <StatusBar style="dark" />
      
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
        <Image 
          source={{ uri: 'https://www.dropbox.com/scl/fi/pub6lsd80izv9hg89mpj3/ChatGPT-Image-Feb-26-2026-02_46_37-PM.png?rlkey=nyp3nzm5qyj9l6p0jnzykyps4&st=zdegfqsw&raw=1' }}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
      
      <Animated.View style={[styles.hintContainer, animatedHintStyle]}>
        <Text style={styles.hintText}>Tap anywhere to start</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300, 
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  hintContainer: {
    position: 'absolute',
    bottom: 60,
  },
  hintText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.primaryBlack,
    opacity: 0.6,
  },
});
