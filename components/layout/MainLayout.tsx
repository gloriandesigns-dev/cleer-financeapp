import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Pressable, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Home, List, Plane, Sliders, Plus, Receipt, DollarSign, CreditCard as CreditCardIcon, X } from 'lucide-react-native';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'transactions' | 'travel' | 'control';
  hideNav?: boolean;
  fabDisabled?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab, hideNav, fabDisabled }) => {
  const router = useRouter();
  const [fabVisible, setFabVisible] = useState(false);

  const handleTabPress = (tab: string) => {
    if (tab === 'dashboard') router.replace('/dashboard');
    if (tab === 'transactions') router.replace('/transactions');
    if (tab === 'travel') router.replace('/travel');
    if (tab === 'control') router.replace('/control');
  };

  const TabIcon = ({ name, icon: Icon }: any) => {
    const isActive = activeTab === name;
    return (
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => handleTabPress(name)}
        activeOpacity={0.7}
      >
        <Icon 
          size={22} 
          color={isActive ? Colors.primaryBlack : Colors.textSecondary} 
          strokeWidth={isActive ? 2 : 1.5}
        />
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {children}

      {/* Floating Glass Nav Bar & FAB */}
      {!hideNav && (
        <View style={styles.navWrapper}>
          <BlurView intensity={80} tint="light" style={styles.glassBar}>
            <View style={styles.tabsContainer}>
              <TabIcon name="dashboard" icon={Home} />
              <TabIcon name="transactions" icon={List} />
              <TabIcon name="travel" icon={Plane} />
              <TabIcon name="control" icon={Sliders} />
            </View>
          </BlurView>

          <TouchableOpacity 
            style={[styles.fab, fabDisabled && styles.fabDisabled]} 
            activeOpacity={0.8}
            onPress={() => !fabDisabled && setFabVisible(true)}
            disabled={fabDisabled}
          >
            <Plus size={28} color={Colors.primaryBlack} />
          </TouchableOpacity>
        </View>
      )}

      {/* FAB Bottom Sheet Modal */}
      <Modal
        visible={fabVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFabVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setFabVisible(false)}>
          <Pressable style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Create New</Text>
              <TouchableOpacity onPress={() => setFabVisible(false)} style={styles.closeButton}>
                <X size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.sheetAction} 
              onPress={() => { setFabVisible(false); router.push('/upload-receipt'); }}
            >
              <View style={styles.sheetIconContainer}>
                <Receipt size={20} color={Colors.primaryBlack} />
              </View>
              <Text style={styles.sheetActionText}>Upload Receipt</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.sheetAction} 
              onPress={() => { setFabVisible(false); router.push('/request-funds'); }}
            >
              <View style={styles.sheetIconContainer}>
                <DollarSign size={20} color={Colors.primaryBlack} />
              </View>
              <Text style={styles.sheetActionText}>Request Funds</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sheetAction} onPress={() => setFabVisible(false)}>
              <View style={styles.sheetIconContainer}>
                <CreditCardIcon size={20} color={Colors.primaryBlack} />
              </View>
              <Text style={styles.sheetActionText}>Create Virtual Card</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  glassBar: {
    flex: 1,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(242, 242, 242, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 48,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 12,
    width: 16,
    height: 2,
    backgroundColor: Colors.accentLime,
    borderRadius: 1,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accentLime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
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
});
