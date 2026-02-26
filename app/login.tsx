import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Layout } from '../constants/Colors';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/Logo';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>

        <View style={styles.content}>
          <Text style={styles.headline}>Welcome back</Text>
          <Text style={styles.subheadline}>
            Log in to manage your company spend
          </Text>

          <View style={styles.form}>
            <Input 
              placeholder="Enter your email" 
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input 
              placeholder="Enter your password" 
              isPassword
            />

            <Button 
              title="Log in" 
              onPress={() => router.push('/setup')} 
              style={styles.loginButton}
              variant="primary"
            />
            
            <TouchableOpacity 
              onPress={() => router.push('/claim')}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountText}>Create account</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 24,
    alignItems: 'center',
  },
  content: {
    marginTop: 40,
  },
  headline: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subheadline: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    gap: 8,
  },
  loginButton: {
    marginTop: 16,
    backgroundColor: Colors.primaryBlack,
  },
  createAccountButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 12,
  },
  createAccountText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: '#8CBF15', 
  }
});
