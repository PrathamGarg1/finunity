import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { icons } from "../../constants";
import HomeHeader from '../../components/HomeHeader';


const TabIcon = ({icon,color,name,focused}) =>{
  return (
    <View className="items-center justify-start gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className={`${focused? 'font-bold' : 'font-thin'	} text-xs`} style={{color:color}}>{name}</Text>
    </View>
  )
}


const _layout = () => {
  return (
    <>
    <Stack>
      <Stack.Screen name="home" options={{header:()=><HomeHeader/>}}/>
      <Stack.Screen name="chatRoom" />
    </Stack>
   </>
  )
}

export default _layout