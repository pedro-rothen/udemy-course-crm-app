import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCustomers } from '../features/components/Customer/hooks';
import { Customer } from '../features/components/Customer/types';

const CustomerDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { customerId } = route.params;

  const { customers } = useCustomers();
  const customer = customers.find((c: Customer) => c.id === customerId);

  if (!customer) {
    return (
      <View style={styles.container}>
        <Text>Customer not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID: {customer.id}</Text>
        <Text style={styles.info}>Name: {customer.name}</Text>
        <Text style={styles.info}>Email: {customer.email}</Text>
        <Text style={styles.info}>Region: {customer.region}</Text>
        <Text style={styles.info}>Company: {customer.company}</Text>
        <Text style={styles.info}>Status: {customer.status}</Text>
      </View>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('CustomerEdit', { customerId: customer.id })}
      >
        <Text style={styles.editButtonText}>Edit Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomerDetails;
