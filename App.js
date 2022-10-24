/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import ForgetPassword from './screens/auth/ForgetPassword';
import Home from './screens/pages/Home';

const Stack = createNativeStackNavigator();
const App = () => {
  const [user, setUser] = useState('');
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Register} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
