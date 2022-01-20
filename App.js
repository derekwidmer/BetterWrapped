import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import SignIn from './components/signIn';
import HomePage from './components/homePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './redux/store'

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  store.subscribe(() => {
    const tokens = (store.getState('token'))
    if (tokens.token.access_token != null) {
      setIsSignedIn(true)
    }
  })

  const Stack = createNativeStackNavigator()
  const authFlow =
    <>
      <Stack.Screen name="Sign In" component={SignIn} />
    </>

  const appFlow =
    <>
      <Stack.Screen name="Home" component={HomePage} />
    </>

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {isSignedIn ? appFlow : authFlow}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111'
  }
});
