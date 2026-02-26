import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, CheckCircle, Paperclip } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { MotiView } from 'moti';

type FlowState = 'form' | 'loading' | 'success';

export default function RequestFundsScreen() {
  const router = useRouter();
  const [flowState, setFlowState] = useState<FlowState>('form');
  
  // Form State
  const [amount, setAmount] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    setFlowState('loading');
    setTimeout(() => {
      setFlowState('success');
    }, 2000);
  };

  const renderForm = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.formGroup}>
        <Input 
          variant="box"
          placeholder="$0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.amountInput}
        />
        
        <View style={styles.selectWrapper}>
          <Select 
            placeholder="Select Budget"
            value={budget}
            options={['Software Subscriptions', 'Travel & Events', 'Office Supplies', 'Marketing & Ads']}
            onSelect={setBudget}
          />
        </View>

        <View style={styles.selectWrapper}>
          <Select 
            placeholder="Select Category"
            value={category}
            options={['Software', 'Travel', 'Meals', 'Equipment', 'Other']}
            onSelect={setCategory}
          />
        </View>

        <Input 
          variant="box"
          placeholder="Purpose of request"
          value={purpose}
          onChangeText={setPurpose}
          multiline
        />

        <View style={styles.selectWrapper}>
          <Select 
            placeholder="Needed by (Date)"
            value={date}
            options={['Today', 'Tomorrow', 'Next Week', 'End of Month']}
            onSelect={setDate}
          />
        </View>

        <TouchableOpacity style={styles.attachButton} activeOpacity={0.7}>
          <Paperclip size={20} color={Colors.textSecondary} />
          <Text style={styles.attachText}>Attach supporting document (optional)</Text>
        </TouchableOpacity>
      </View>

      <Button 
        title="Submit Request" 
        onPress={handleSubmit} 
        style={styles.submitButton}
        textStyle={{ color: Colors.white }}
      />
      <View style={{ height: 120 }} /> 
    </ScrollView>
  );

  const renderLoading = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.loadingText}>Submitting Request...</Text>
      <View style={styles.progressBarBg}>
        <MotiView 
          from={{ width: '0%' }} 
          animate={{ width: '100%' }} 
          transition={{ type: 'timing', duration: 2000 }} 
          style={styles.progressBarFill} 
        />
      </View>
    </View>
  );

  const renderSuccess = () => (
    <View style={styles.centerContainer}>
      <CheckCircle size={64} color={Colors.accentLime} strokeWidth={1.5} />
      <Text style={styles.successTitle}>Request Submitted</Text>
      <Text style={styles.successSubtitle}>Your manager will review this request.</Text>
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount</Text>
          <Text style={styles.summaryValueBold}>{amount || '$0.00'}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Budget</Text>
          <Text style={styles.summaryValue}>{budget || 'N/A'}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Category</Text>
          <Text style={styles.summaryValue}>{category || 'N/A'}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Status</Text>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Pending Review</Text>
          </View>
        </View>
      </View>

      <Button 
        title="Back to Home" 
        onPress={() => router.push('/dashboard')} 
        style={styles.homeButton}
        textStyle={{ color: Colors.white }}
      />
    </View>
  );

  return (
    <MainLayout activeTab="dashboard" fabDisabled={flowState !== 'form'}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            {flowState === 'form' ? (
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <ArrowLeft size={24} color={Colors.primaryBlack} />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconButton} /> // Placeholder for alignment
            )}
            <Text style={styles.headerTitle}>
              {flowState === 'form' ? 'Request Funds' : ''}
            </Text>
            <View style={styles.iconButton} />
          </View>

          {flowState === 'form' && renderForm()}
          {flowState === 'loading' && renderLoading()}
          {flowState === 'success' && renderSuccess()}

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
  },
  iconButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  formGroup: {
    gap: 16,
    marginBottom: 32,
  },
  amountInput: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  selectWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.divider,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 8,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderStyle: 'dashed',
    padding: 16,
    gap: 12,
  },
  attachText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  submitButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  loadingText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.divider,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.accentLime,
    borderRadius: 2,
  },
  successTitle: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 24,
    color: Colors.primaryBlack,
    marginTop: 24,
    marginBottom: 8,
  },
  successSubtitle: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  summaryLabel: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.primaryBlack,
  },
  summaryValueBold: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  pendingBadge: {
    backgroundColor: '#E8E8E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  pendingText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  homeButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
});
