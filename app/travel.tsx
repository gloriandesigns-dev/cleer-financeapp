import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { Plus, X } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { TripCard, PastTripRow } from '../components/travel/TripComponents';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function TravelScreen() {
  const [createVisible, setCreateVisible] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [newDates, setNewDates] = useState('');
  const [newBudget, setNewBudget] = useState('');

  const [upcomingTrips, setUpcomingTrips] = useState([
    { id: '1', city: 'Dallas', dates: 'Nov 12 - Nov 15', amount: '$1,240.00', status: 'Confirmed', isActive: true },
    { id: '2', city: 'New York', dates: 'Dec 04 - Dec 08', amount: '$2,100.00', status: 'Pending', isActive: false }
  ]);

  const handleCreateTrip = () => {
    if (!newCity || !newDates || !newBudget) return;
    
    const newTrip = {
      id: Date.now().toString(),
      city: newCity,
      dates: newDates,
      amount: `$${parseFloat(newBudget).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      status: 'Pending',
      isActive: false
    };

    setUpcomingTrips([newTrip, ...upcomingTrips]);
    setNewCity('');
    setNewDates('');
    setNewBudget('');
    setCreateVisible(false);
  };

  return (
    <MainLayout activeTab="travel">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Travel</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              activeOpacity={0.7}
              onPress={() => setCreateVisible(true)}
            >
              <Plus size={24} color={Colors.primaryBlack} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Policy Banner */}
            <View style={styles.policyCard}>
              <View style={styles.policyDot} />
              <Text style={styles.policyText}>Travel policy applies to bookings</Text>
            </View>

            {/* Upcoming Trips Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Trips</Text>
              {upcomingTrips.map(trip => (
                <TripCard 
                  key={trip.id}
                  city={trip.city} 
                  dates={trip.dates} 
                  amount={trip.amount} 
                  status={trip.status} 
                  isActive={trip.isActive} 
                />
              ))}
            </View>

            {/* Past Trips Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Past Trips</Text>
              <View style={styles.pastTripsContainer}>
                <PastTripRow city="Chicago" dates="Oct 10 - Oct 12" amount="$850.00" />
                <PastTripRow city="Seattle" dates="Sep 22 - Sep 25" amount="$1,420.00" />
                <PastTripRow city="Austin" dates="Aug 05 - Aug 07" amount="$930.00" />
              </View>
            </View>

            {/* Padding for floating nav bar */}
            <View style={{ height: 120 }} /> 
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Create Trip Bottom Sheet */}
      <Modal
        visible={createVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCreateVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setCreateVisible(false)}>
          <Pressable style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Create New Trip</Text>
              <TouchableOpacity onPress={() => setCreateVisible(false)} style={styles.closeButton}>
                <X size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formContainer}>
              <Input 
                placeholder="Destination city" 
                value={newCity}
                onChangeText={setNewCity}
              />
              <Input 
                placeholder="Dates (e.g. Nov 12 - Nov 15)" 
                value={newDates}
                onChangeText={setNewDates}
              />
              <Input 
                placeholder="Estimated Budget" 
                keyboardType="numeric" 
                value={newBudget}
                onChangeText={setNewBudget}
              />
              
              <Button 
                title="Create Trip" 
                onPress={handleCreateTrip} 
                style={styles.createButton}
                textStyle={{ color: Colors.white }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 22,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
  },
  addButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryBlack,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    gap: 12,
  },
  policyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentLime,
  },
  policyText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.primaryBlack,
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
    marginBottom: 16,
  },
  pastTripsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 48,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  closeButton: {
    padding: 4,
    marginRight: -4,
  },
  formContainer: {
    gap: 8,
  },
  createButton: {
    backgroundColor: Colors.primaryBlack,
    marginTop: 16,
  },
});
