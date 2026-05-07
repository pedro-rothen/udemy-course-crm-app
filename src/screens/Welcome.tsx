import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scheduleLocalNotification } from '../utilities/notifications';
import { removeItem } from '../utilities/async_storage';

const Welcome = () => {
  const navigation = useNavigation<any>();

  const handleScheduleNotification = async () => {
    await scheduleLocalNotification(5);
    Alert.alert('Scheduled!', 'You will receive a notification in 5 seconds. Lock your phone or leave the app to see it!');
  };

  const handleClearData = async () => {
    await removeItem('CUSTOMERS_STORAGE_KEY');
    Alert.alert('Success', 'Local storage cleared. Restart the app to see a clean slate!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CRM App</Text>
      <Text style={styles.subtitle}>Let's get started</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Regions')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#34C759', marginTop: 10 }]}
        onPress={handleScheduleNotification}
      >
        <Text style={styles.buttonText}>Test Notification (5s)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#FF3B30', marginTop: 10 }]}
        onPress={handleClearData}
      >
        <Text style={styles.buttonText}>Reset App Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Welcome;
