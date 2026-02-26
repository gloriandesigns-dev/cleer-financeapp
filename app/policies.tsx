import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { PolicyCard } from '../components/control/PolicyCard';
import { ArrowLeft } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function PoliciesScreen() {
  const router = useRouter();

  return (
    <MainLayout activeTab="control">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <ArrowLeft size={24} color={Colors.primaryBlack} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Policies</Text>
            <View style={styles.placeholderIcon} />
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <PolicyCard 
              title="Travel Policy"
              description="Rules for flights, hotels, and per diem allowances during business trips."
              isActive={true}
              onPress={() => {}}
            />
            
            <PolicyCard 
              title="Expense Limits"
              description="Maximum transaction amounts and category restrictions for all cards."
              isActive={true}
              onPress={() => {}}
            />
            
            <PolicyCard 
              title="Alcohol Restriction"
              description="Blocks transactions at liquor stores and bars automatically."
              isActive={false}
              onPress={() => {}}
            />

            <PolicyCard 
              title="Approval Thresholds"
              description="Requires manager approval for any out-of-pocket expense over $50."
              isActive={true}
              onPress={() => {}}
            />

            {/* Padding for floating nav bar */}
            <View style={{ height: 120 }} /> 
          </ScrollView>
        </View>
      </SafeAreaView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  iconButton: {
    padding: 8,
  },
  placeholderIcon: {
    width: 40,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 22,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
});
