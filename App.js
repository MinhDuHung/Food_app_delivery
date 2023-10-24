import { View, Alert, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding1 from './src/screens/Onboarding1';
import Onboarding2 from './src/screens/Onboarding2';
import Onboarding3 from './src/screens/Onboarding3';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import Bottomtab from './src/components/Bottomtab';
import SideBar from './src/navigation/SideBar';
import FoodDetail from './src/screens/FoodDetail';
import Orders from './src/screens/Orders';
import Setting from './src/screens/Setting';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Account from './src/screens/Account';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Notifications from './src/screens/Notifications';
import PurchasingStat from './src/screens/PurchasingStat';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
  const getToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const token = await messaging().getToken()
    console.log({ token });
  }

  useEffect(() => {
    getToken()
  }, [])

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='onboarding1' component={Onboarding1} />
          <Stack.Screen name='onboarding2' component={Onboarding2} />
          <Stack.Screen name='onboarding3' component={Onboarding3} />
          <Stack.Screen name='sidebar' component={SideBar} />
          <Stack.Screen name='signin' component={Signin} />
          <Stack.Screen name='signup' component={Signup} />
          <Stack.Screen name='bottomtab' component={Bottomtab} />
          <Stack.Screen name='foodDetail' component={FoodDetail} />
          <Stack.Screen name='orders' component={Orders} />
          <Stack.Screen name='settings' component={Setting} />
          <Stack.Screen name='account' component={Account} />
          <Stack.Screen name='notification' component={Notifications} />
          <Stack.Screen name='purchasingStat' component={PurchasingStat} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}

export default App