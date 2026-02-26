import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { ControlRow } from '../components/control/ControlRow';
import { StatusBar } from 'expo-status-bar';

export default function ControlScreen() {
  const router = useRouter();

  return (
    <MainLayout activeTab="control">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Control</Text>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Centered Profile Section */}
            <View style={styles.profileSection}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                style={styles.profileImage} 
              />
              <Text style={styles.profileName}>Arian Z.</Text>
              <Text style={styles.profileId}>EMP-8492</Text>
              <TouchableOpacity style={styles.profileButton} activeOpacity={0.7}>
                <Text style={styles.profileButtonText}>My Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Group 1: Spend Management */}
            <View style={styles.cardGroup}>
              <ControlRow 
                title="Budgets" 
                subtitle="Manage company spend limits" 
                onPress={() => router.push('/budgets')} 
              />
              <ControlRow 
                title="Policies" 
                subtitle="Set rules and approvals" 
                onPress={() => router.push('/policies')} 
              />
              <ControlRow 
                title="Approval Workflow" 
                subtitle="Configure routing" 
                onPress={() => {}} 
                isLast 
              />
            </View>

            {/* Group 2: Organization */}
            <View style={styles.cardGroup}>
              <ControlRow 
                title="Team Members" 
                subtitle="Roles and permissions" 
                onPress={() => router.push('/team')} 
                isLast 
              />
            </View>

            {/* Group 3: System */}
            <View style={styles.cardGroup}>
              <ControlRow 
                title="Accounting Integration" 
                subtitle="QuickBooks, NetSuite" 
                onPress={() => {}} 
              />
              <ControlRow 
                title="Company Settings" 
                subtitle="Billing and preferences" 
                onPress={() => {}} 
                isLast 
              />
            </View>

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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 22,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: '#E8E8E6',
  },
  profileName: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 20,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  profileId: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  profileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  profileButtonText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: Colors.primaryBlack,
  },
  cardGroup: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
});
