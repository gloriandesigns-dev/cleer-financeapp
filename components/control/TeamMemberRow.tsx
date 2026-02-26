import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronRight } from 'lucide-react-native';

interface TeamMemberRowProps {
  name: string;
  role: string;
  initials: string;
  isAdmin?: boolean;
  onPress: () => void;
  isLast?: boolean;
}

export const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ 
  name, 
  role, 
  initials, 
  isAdmin, 
  onPress, 
  isLast 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isLast && styles.noBorder]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.roleRow}>
            <Text style={styles.role}>{role}</Text>
            {isAdmin && (
              <View style={styles.adminBadge}>
                <Text style={styles.adminText}>Admin</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <ChevronRight size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  name: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
    marginBottom: 2,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  role: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  adminBadge: {
    backgroundColor: Colors.accentLime,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  adminText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 10,
    color: Colors.primaryBlack,
  },
});
