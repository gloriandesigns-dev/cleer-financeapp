import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { useRouter } from 'router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, Camera, Image as ImageIcon, X, CheckCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

type FlowState = 'options' | 'camera' | 'form' | 'success';

export default function UploadReceiptScreen() {
  const router = useRouter();
  const [flowState, setFlowState] = useState<FlowState>('options');
  
  // Form State
  const [merchant, setMerchant] = useState('Uber'); // Mock OCR auto-fill
  const [amount, setAmount] = useState('24.50'); // Mock OCR auto-fill
  const [date, setDate] = useState('Today');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  const handleCapture = () => {
    setFlowState('form');
  };

  const handleSubmit = () => {
    setFlowState('success');
  };

  const renderOptions = () => (
    <Modal visible={flowState === 'options'} transparent animationType="fade" onRequestClose={() => router.back()}>
      <Pressable style={styles.modalOverlay} onPress={() => router.back()}>
        <Pressable style={styles.bottomSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Upload Receipt</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
              <X size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.sheetAction} onPress={() => setFlowState('camera')}>
            <View style={styles.sheetIconContainer}>
              <Camera size={20} color={Colors.primaryBlack} />
            </View>
            <Text style={styles.sheetActionText}>Capture Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sheetAction} onPress={() => setFlowState('form')}>
            <View style={styles.sheetIconContainer}>
              <ImageIcon size={20} color={Colors.primaryBlack} />
            </View>
            <Text style={styles.sheetActionText}>Upload from Gallery</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cameraIconButton}>
          <X size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.cameraTitle}>Capture Receipt</Text>
        <View style={styles.cameraIconButton} />
      </View>
      
      {/* Mock Viewfinder Frame */}
      <View style={styles.viewfinder}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      <View style={styles.cameraFooter}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture} activeOpacity={0.8}>
          <View style={styles.captureInner} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderForm = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setFlowState('options')} style={styles.iconButton}>
          <ArrowLeft size={24} color={Colors.primaryBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipt Details</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.thumbnailContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200&h=200' }} 
            style={styles.thumbnail} 
          />
          <View style={styles.ocrBadge}>
            <Text style={styles.ocrText}>Data auto-filled</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Input 
            variant="box"
            placeholder="Merchant"
            value={merchant}
            onChangeText={setMerchant}
          />
          <Input 
            variant="box"
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          
          <View style={styles.selectWrapper}>
            <Select 
              placeholder="Date"
              value={date}
              options={['Today', 'Yesterday', 'Other']}
              onSelect={setDate}
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

          <View style={styles.selectWrapper}>
            <Select 
              placeholder="Select Budget"
              value={budget}
              options={['Software Subscriptions', 'Travel & Events', 'Office Supplies', 'Marketing & Ads']}
              onSelect={setBudget}
            />
          </View>

          <Input 
            variant="box"
            placeholder="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        <Button 
          title="Submit Expense" 
          onPress={handleSubmit} 
          style={styles.submitButton}
          textStyle={{ color: Colors.white }}
        />
        <View style={{ height: 120 }} /> 
      </ScrollView>
    </>
  );

  const renderSuccess = () => (
    <View style={styles.centerContainer}>
      <CheckCircle size={64} color={Colors.accentLime} strokeWidth={1.5} />
      <Text style={styles.successTitle}>Expense Submitted</Text>
      <Text style={styles.successSubtitle}>Your receipt has been recorded.</Text>
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Merchant</Text>
          <Text style={styles.summaryValueBold}>{merchant}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount</Text>
          <Text style={styles.summaryValueBold}>${amount}</Text>
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
        title="Done" 
        onPress={() => router.push('/transactions')} 
        style={styles.homeButton}
        textStyle={{ color: Colors.white }}
      />
    </View>
  );

  return (
    <MainLayout 
      activeTab="dashboard" 
      hideNav={flowState === 'camera' || flowState === 'options'} 
      fabDisabled={flowState !== 'form'}
    >
      <SafeAreaView style={[styles.safeArea, flowState === 'camera' && styles.cameraSafeArea]}>
        <StatusBar style={flowState === 'camera' ? 'light' : 'dark'} />
        <View style={styles.container}>
          {flowState === 'options' && renderOptions()}
          {flowState === 'camera' && renderCamera()}
          {flowState === 'form' && renderForm()}
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
  cameraSafeArea: {
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
  },
  // Options Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
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
    flex: 1,
    textAlign: 'center',
    marginLeft: 24, // Offset for close button
  },
  closeButton: {
    padding: 4,
  },
  sheetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  sheetIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  sheetActionText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  // Camera Styles
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  cameraIconButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  cameraTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  viewfinder: {
    flex: 1,
    margin: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.accentLime,
  },
  topLeft: { top: -1, left: -1, borderTopWidth: 3, borderLeftWidth: 3 },
  topRight: { top: -1, right: -1, borderTopWidth: 3, borderRightWidth: 3 },
  bottomLeft: { bottom: -1, left: -1, borderBottomWidth: 3, borderLeftWidth: 3 },
  bottomRight: { bottom: -1, right: -1, borderBottomWidth: 3, borderRightWidth: 3 },
  cameraFooter: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
  },
  // Form Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    padding: 8,
    width: 60,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  cancelButton: {
    padding: 8,
    width: 60,
    alignItems: 'flex-end',
  },
  cancelText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  thumbnail: {
    width: 100,
    height: 140,
    borderRadius: 12,
    backgroundColor: Colors.divider,
    marginBottom: 12,
  },
  ocrBadge: {
    backgroundColor: Colors.accentLime,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  ocrText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 12,
    color: Colors.primaryBlack,
  },
  formGroup: {
    gap: 16,
    marginBottom: 32,
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
  submitButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
  // Success Styles
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80,
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
