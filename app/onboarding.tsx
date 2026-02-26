import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Layout } from '../constants/Colors';
import { Button } from '../components/ui/Button';
import { OnboardingIllustration } from '../components/OnboardingIllustrations';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: 'See every dollar clearly',
    subtitle: 'Real-time visibility across your company’s spending.',
  },
  {
    title: 'Automate expense reporting',
    subtitle: 'Receipts are captured, matched, and categorized instantly.',
  },
  {
    title: 'Stay in control',
    subtitle: 'Set policies, approve requests, and sync instantly with accounting.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);
  const blurOpacity = useSharedValue(0);

  const handleNext = () => {
    if (currentStep < 2) {
      // Blur in
      blurOpacity.value = withTiming(1, { duration: 250 }, () => {
        runOnJS(setCurrentStep)((currentStep + 1) as 0 | 1 | 2);
        // Blur out
        blurOpacity.value = withTiming(0, { duration: 350 });
      });
    } else {
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    router.replace('/login');
  };

  const blurAnimatedStyle = useAnimatedStyle(() => ({
    opacity: blurOpacity.value,
    zIndex: blurOpacity.value > 0 ? 10 : -1,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content Area with Blur Transition */}
        <View style={styles.contentWrapper}>
          <View style={styles.illustrationContainer}>
            <OnboardingIllustration step={currentStep} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{ONBOARDING_DATA[currentStep].title}</Text>
            <Text style={styles.subtitle}>{ONBOARDING_DATA[currentStep].subtitle}</Text>
          </View>

          {/* Animated Blur Overlay */}
          <Animated.View style={[StyleSheet.absoluteFill, blurAnimatedStyle]} pointerEvents="none">
            <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          </Animated.View>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomContainer}>
          <View style={styles.progressContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: index === currentStep ? Colors.accentLime : Colors.divider,
                    width: index === currentStep ? 24 : 8,
                  }
                ]}
              />
            ))}
          </View>

          <Button
            title={currentStep === 2 ? "Get Started" : "Next"}
            onPress={handleNext}
            style={styles.button}
            variant="primary"
            textStyle={{ color: Colors.white }}
            style={{ backgroundColor: Colors.primaryBlack }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Layout.paddingHorizontal,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    width: '100%',
  },
});
