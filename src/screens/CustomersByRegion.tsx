import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCustomers } from '../features/components/Customer/hooks';
import { Customer } from '../features/components/Customer/types';

const CustomersByRegion = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { region } = route.params;

  const { customers, loading, fetchAll } = useCustomers();
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    if (customers.length === 0 && !loading) {
      fetchAll();
    }
  }, []);

  const regionCustomers = customers.filter((c: Customer) => c.region === region);

  const filteredCustomers = filterStatus === 'All'
    ? regionCustomers
    : regionCustomers.filter((c: Customer) => c.status === filterStatus);

  const StatusButton = ({ title }: { title: string }) => (
    <TouchableOpacity 
      style={[
        styles.statusButton, 
        filterStatus === title && styles.statusButtonActive
      ]}
      onPress={() => setFilterStatus(title)}
    >
      <Text style={[
        styles.statusButtonText,
        filterStatus === title && styles.statusButtonTextActive
      ]}>{title}</Text>
    </TouchableOpacity>
  );

  if (loading && customers.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading Customers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customers in {region}</Text>

      <View style={styles.filterContainer}>
        <StatusButton title="All" />
        <StatusButton title="Active" />
        <StatusButton title="Inactive" />
      </View>
      
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No customers found in this region.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.customerItem}
            onPress={() => navigation.navigate('CustomerDetails', { customerId: item.id })}
          >
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.customerCompany}>{item.company}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: item.status === 'Active' ? '#E8F5E9' : '#FFEBEE' }
            ]}>
              <Text style={[
                styles.statusBadgeText,
                { color: item.status === 'Active' ? '#2E7D32' : '#C62828' }
              ]}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  customerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  customerCompany: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomersByRegion;
