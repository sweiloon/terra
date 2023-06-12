import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  GetStarted,
  HomeScreen,
  LoginScreen,
  OtpScreen,
  OnboardingScreen,
  RegisterScreen,
  ResetPassword,
  SuccessVerification,
  ProfileScreen,
} from './screens'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StackNavigator from './navigation/StackNavigator'
import Settings from './components/AccountSetting/Settings'
import RecipeScreen from './screens/Recipe/RecipeScreen';
import { auth } from "./firebase";
import firebase from 'firebase/compat/app'
import { firebaseConfig } from './firebase'
import 'expo-dev-client'
import Harvest from './components/FarmMng/Harvest'
import Seeding from './components/FarmMng/Seeding'
import Fertilize from './components/FarmMng/Fertilize'
import Consumption from './components/FarmMng/Consumption'
import Farmdetail from './components/FarmMng/Farmdetail'
import Newfarm from './components/FarmMng/Newfarm'
import Newzone from './components/FarmMng/Newzone'
import Recorded from './components/FarmMng/Recorded'
import SearchBar from './components/Home/SearchBar'
import MyProfile from './components/Home/MyProfile'


SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()

export default function App() {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, []);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };


  {/*useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])  */}


  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Poppins-Black.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName="OnboardingScreen"
        screenOptions={{ animation: 'flip' }}
      /*{  Check Blood Project
        isFirstLaunch ? 'OnboadringScreen' : 'GetStarted'
      } */
      >
        {/*<Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />*/}

        {!user ? (
          <>
            <Stack.Screen name="StackNavigator" component={StackNavigator} options={{ headerShown: false }} />

            <Stack.Screen name='Farmdetail' component={Farmdetail} options={{ headerShown: false }} />
            <Stack.Screen name='Recorded' component={Recorded} options={{ headerShown: false }} />
            <Stack.Screen name='Newfarm' component={Newfarm} options={{ headerShown: false }} />
            <Stack.Screen name='Newzone' component={Newzone} options={{ headerShown: false }} />
            <Stack.Screen name='Harvest' component={Harvest} options={{ headerShown: false }} />
            <Stack.Screen name='Seeding' component={Seeding} options={{ headerShown: false }} />
            <Stack.Screen name='Fertilize' component={Fertilize} options={{ headerShown: false }} />
            <Stack.Screen name='Consumption' component={Consumption} options={{ headerShown: false }} />
            <Stack.Screen name='Recipe' component={RecipeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="SearchBar" component={SearchBar} options={{ headerShown: false }} />
            <Stack.Screen name='MyProfile' component={MyProfile} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />

            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />

            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />

            <Stack.Screen name="OTPVerification" component={OtpScreen} options={{ headerShown: false }} />

            <Stack.Screen name="SuccessVerification" component={SuccessVerification} options={{ headerShown: false }} />


          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}