import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  logo  from '../../assets/images/logo-color.png'
import Formfield from '../../components/Formfield'
import MyButton from '../../components/MyButton'
import { Link, router } from 'expo-router'
// import { createUser } from '../../lib/appwrite'
import {useAuthContext} from "../../context/GlobalProvider"


const signup = () => {
  const {register}= useAuthContext();
  const[isSubmitting,setIsSubmitting]=useState(false);
  const handlePress = async(email,password,username,profile) =>{
    if(!email || !password|| !username || !profile){
      Alert.alert('Error','Please fill all fields')
    }
    setIsSubmitting(true);
      let response=await register(email,password,username,profile);
      setIsSubmitting(false);
      if(!response.success){
        Alert.alert('Sign Up',response.msg)
      }
    }

    
  const [form,setForm] = useState({username:"",email:"",password:"",profile:""});

  return (
    <SafeAreaView className="bg-black min-h-full">
      <ScrollView>
        <View className="w-full justify-center items-center px-4 my-6">
          <Image source={logo} className="w-[250px] h-[90px]"  />
          <Text className="text-2xl text-white text-semibold mt-10 font-semibold">Log in to FinUnity</Text>
          <Formfield title="Username" value={form.username} handleChangetext={(e)=>setForm({...form,username:e})} otherStyle="mt-7" />
          <Formfield title="Email" value={form.email} handleChangetext={(e)=>setForm({...form,email:e})} otherStyle="mt-5" />
          <Formfield title="Password" value={form.password} handleChangetext={(e)=>setForm({...form,password:e})} otherStyle="mt-5" />
          <Formfield title="Profile" value={form.profile} handleChangetext={(e)=>setForm({...form,profile:e})} otherStyle="mt-5" />
          
            <MyButton title="Sign Up" handlePress={() => handlePress(email=form.email,password=form.password,username=form.username,profile=form.profile)} extrastyle="mt-7" isSubmitting={isSubmitting}/>
              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100">Have an account? </Text>
                <Link href={"/signin"} className='text-lg font-semibold text-[#FFA001]'>Sign In</Link>
              </View>
         </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signup