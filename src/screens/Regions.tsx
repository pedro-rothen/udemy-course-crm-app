import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Regions = () => {
  const navigation = useNavigation<any>();

  const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Region</Text>
      
      <ScrollView contentContainerStyle={styles.list}>
        {regions.map((region) => (
          <TouchableOpacity 
            key={region} 
            style={styles.regionButton}
            onPress={() => navigation.navigate('CustomersByRegion', { region })}
          >
            <Text style={styles.regionText}>{region}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CustomerEdit')}
      >
        <Text style={styles.createButtonText}>Create New Customer</Text>
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
    marginVertical: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  regionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  regionText: {
    fontSize: 18,
    color: '#333',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Regions;
