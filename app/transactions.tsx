import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { Colors } from '../constants/Colors';
import { TransactionRow } from '../components/dashboard/TransactionRow';
import { Search } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { MainLayout } from '../components/layout/MainLayout';

const FILTERS = ['All', 'Needs Attention', 'Pending Review', 'Cleared'];

const INITIAL_TRANSACTIONS = [
  { id: '1', merchant: "Uber", metadata: "Virtual Card • Travel", amount: "$24.50", status: "needs_attention", date: "Today" },
  { id: '2', merchant: "Figma", metadata: "Physical Card • Software", amount: "$15.00", status: "cleared", date: "Today" },
  { id: '3', merchant: "AWS", metadata: "Virtual Card • Infrastructure", amount: "$142.00", status: "pending_review", date: "Yesterday" },
  { id: '4', merchant: "Slack", metadata: "Virtual Card • Software", amount: "$8.90", status: "cleared", date: "Yesterday" },
  { id: '5', merchant: "Sweetgreen", metadata: "Physical Card • Meals", amount: "$32.40", status: "cleared", date: "Yesterday" },
  { id: '6', merchant: "WeWork", metadata: "Physical Card • Office", amount: "$450.00", status: "pending_review", date: "Oct 22" },
  { id: '7', merchant: "Delta Airlines", metadata: "Virtual Card • Travel", amount: "$840.00", status: "needs_attention", date: "Oct 22" },
];

export default function TransactionsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter(t => {
      const matchesFilter = activeFilter === 'All' ||
        (activeFilter === 'Needs Attention' && t.status === 'needs_attention') ||
        (activeFilter === 'Pending Review' && t.status === 'pending_review') ||
        (activeFilter === 'Cleared' && t.status === 'cleared');
      
      const matchesSearch = t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.amount.includes(searchQuery);
                            
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Group by date
  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce((acc, curr) => {
      if (!acc[curr.date]) acc[curr.date] = [];
      acc[curr.date].push(curr);
      return acc;
    }, {} as Record<string, typeof INITIAL_TRANSACTIONS>);
  }, [filteredTransactions]);

  return (
    <MainLayout activeTab="transactions">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Transactions</Text>
          </View>

          {/* Filters */}
          <View style={styles.filtersWrapper}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContainer}
            >
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <TouchableOpacity 
                    key={filter}
                    style={[styles.filterPill, isActive && styles.activeFilterPill]}
                    onPress={() => setActiveFilter(filter)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search merchant or amount"
                placeholderTextColor={Colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
                tintColor={Colors.accentLime}
                colors={[Colors.accentLime]}
              />
            }
          >
            {Object.keys(groupedTransactions).length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No transactions found</Text>
              </View>
            ) : (
              Object.entries(groupedTransactions).map(([date, transactions]) => (
                <View key={date} style={styles.dateGroup}>
                  <Text style={styles.dateHeader}>{date}</Text>
                  {transactions.map(t => (
                    <TransactionRow 
                      key={t.id}
                      merchant={t.merchant} 
                      metadata={t.metadata} 
                      amount={t.amount} 
                      status={t.status as any} 
                    />
                  ))}
                </View>
              ))
            )}

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
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 28,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
  },
  filtersWrapper: {
    marginBottom: 16,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  activeFilterPill: {
    backgroundColor: Colors.primaryBlack,
    borderColor: Colors.primaryBlack,
  },
  filterText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  activeFilterText: {
    color: Colors.white,
    fontFamily: 'Urbanist_600SemiBold',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Urbanist_400Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
    marginBottom: 8,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 15,
    color: Colors.textSecondary,
  }
});
