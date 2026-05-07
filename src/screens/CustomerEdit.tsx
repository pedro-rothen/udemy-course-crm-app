import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Modal, FlatList, SafeAreaView, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCustomers } from '../features/components/Customer/hooks';
import { Customer } from '../features/components/Customer/types';

const REGIONS = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];

const CustomerEdit = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const customerId = route.params?.customerId;

  const { customers, create, update, loading } = useCustomers();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState(REGIONS[0]);
  const [company, setCompany] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    if (customerId) {
      const customer = customers.find((c: Customer) => c.id === customerId);
      if (customer) {
        setName(customer.name);
        setEmail(customer.email);
        setRegion(customer.region);
        setCompany(customer.company);
        setIsActive(customer.status === 'Active');
      }
    }
  }, [customerId, customers]);

  const handleSave = async () => {
    if (!name || !email || !region) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const customerData = {
      name,
      email,
      region,
      company: company || 'N/A',
      status: (isActive ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
    };

    if (customerId) {
      update({ ...customerData, id: customerId });
    } else {
      create(customerData);
    }

    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>{customerId ? 'Edit Customer' : 'Create New Customer'}</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Region *</Text>
          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setIsPickerVisible(true)}
          >
            <Text style={styles.selectorText}>{region}</Text>
            <Text style={styles.selectorArrow}>▼</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter company name"
            value={company}
            onChangeText={setCompany}
            placeholderTextColor="#999"
          />

          <View style={styles.toggleContainer}>
            <View>
              <Text style={styles.toggleLabel}>Active Status</Text>
              <Text style={styles.toggleSubtitle}>
                {isActive ? 'Customer is currently Active' : 'Customer is currently Inactive'}
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={isActive ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsActive}
              value={isActive}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Customer</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPickerVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Region</Text>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={REGIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    item === region && styles.modalItemSelected
                  ]}
                  onPress={() => {
                    setRegion(item);
                    setIsPickerVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    item === region && styles.modalItemTextSelected
                  ]}>{item}</Text>
                  {item === region && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  form: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  selectorArrow: {
    fontSize: 12,
    color: '#999',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  toggleSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  modalItemSelected: {
    backgroundColor: '#f0f7ff',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalItemTextSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default CustomerEdit;
