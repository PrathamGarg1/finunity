import {  Slot, Stack, useRouter, useSegments} from 'expo-router'
import {  AuthContextProvider, useAuthContext } from '../context/GlobalProvider'
import { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout=()=>{
  const {isAuthenticated}=useAuthContext();
  const segments=useSegments();
  const router=useRouter();
  useEffect(()=>{
    if(!isAuthenticated)router.replace('/');
    else{
      router.replace('/(tabs)/home');
    }
  },[isAuthenticated])

  return <Slot/>
}

const RootL = () => {
  return (
    <>
    <AuthContextProvider >
    <MenuProvider>

      <MainLayout/>
      </MenuProvider>

      </AuthContextProvider>

  </> 
)
}

export default RootL

{/* <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
  <Stack.Screen name="index" options={{ headerShown: false }} />
</Stack> */}
