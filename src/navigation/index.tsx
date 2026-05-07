import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Regions from '../screens/Regions';
import CustomersByRegion from '../screens/CustomersByRegion';
import CustomerDetails from '../screens/CustomerDetails';
import CustomerEdit from '../screens/CustomerEdit';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Regions"
        component={Regions}
        options={{ title: 'Regions' }}
      />
      <Stack.Screen
        name="CustomersByRegion"
        component={CustomersByRegion}
        options={{ title: 'Customers' }}
      />
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{ title: 'Customer Details' }}
      />
      <Stack.Screen
        name="CustomerEdit"
        component={CustomerEdit}
        options={({ route }: any) => ({ 
          title: route.params?.customerId ? 'Edit Customer' : 'Create Customer' 
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
