import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { TeamMemberRow } from '../components/control/TeamMemberRow';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function TeamScreen() {
  const router = useRouter();

  return (
    <MainLayout activeTab="control">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <ArrowLeft size={24} color={Colors.primaryBlack} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Team Members</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Plus size={24} color={Colors.primaryBlack} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.cardGroup}>
              <TeamMemberRow 
                name="Arian Z."
                role="Founder / CEO"
                initials="AZ"
                isAdmin={true}
                onPress={() => {}}
              />
              <TeamMemberRow 
                name="Sarah Jenkins"
                role="Finance Manager"
                initials="SJ"
                isAdmin={true}
                onPress={() => {}}
              />
              <TeamMemberRow 
                name="Michael Chen"
                role="Engineering Lead"
                initials="MC"
                onPress={() => {}}
              />
              <TeamMemberRow 
                name="Emma Watson"
                role="Product Designer"
                initials="EW"
                onPress={() => {}}
              />
              <TeamMemberRow 
                name="David Miller"
                role="Marketing Director"
                initials="DM"
                onPress={() => {}}
                isLast={true}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
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
  cardGroup: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
});
