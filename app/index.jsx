import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React  from 'react'
import {images} from '../constants'
import  logo  from '../assets/images/logo-color.png'
import { StatusBar } from 'expo-status-bar'
import { Link, Redirect, router } from 'expo-router'

const App = () => {


  return (
    
    <SafeAreaView className="bg-black min-h-[65vh]">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="w-full justify-center items-center min-h-[95vh] px-4">
          <Image source={logo} className="w-[250px] h-[90px]"  />
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMethod='contain' />
            <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities with {''} <Text className="text-[#FFA001]">FinUnity</Text></Text>
            <Text className="text-2xl m-4 font-bold text-center text-[#dca649]">Your Fin<Text className="text-[#b08c4e]">ance Comm</Text>unity</Text>
          <TouchableOpacity onPress={()=>{router.push("/signin")} }  className={`bg-[#FFA001] rounded-xl min-h-[60px] w-full mx-10 justify-center items-center  mt-7 `} >
           <Text className={`text-bold text-black text-lg `}  >Continue with Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})
