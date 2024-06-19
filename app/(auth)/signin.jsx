import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  logo  from '../../assets/images/logo-color.png'
import Formfield from '../../components/Formfield'
import MyButton from '../../components/MyButton'
import { Link } from 'expo-router'
import { useAuthContext } from '../../context/GlobalProvider'
// import { getCurrentUser, signIn } from '../../lib/appwrite'


const sigin = () => {
  const [form,setForm] = useState({email:"",password:""});
  
  const[isSubmitting,setIsSubmitting]=useState(false);
  const {login}=useAuthContext()
  const handlePress = async(email,password) =>{
    if(!email || !password){
      Alert.alert('Error','Please fill all fields')
    }
    setIsSubmitting(true);
    const response=await login(email,password)
    setIsSubmitting(false);
    
    if(!response.success){
      Alert.alert('Sign In',response.msg)
    }
    
  }

  return (
    <SafeAreaView className="bg-black min-h-full">
      <ScrollView>
        <View className="w-full justify-center items-center px-4 my-6">
          <Image source={logo} className="w-[250px] h-[90px]"  />
          <Text className="text-2xl text-white text-semibold mt-10 font-semibold">Log in to FinUnity</Text>
          <Formfield title="Email" value={form.email} handleChangetext={(e)=>setForm({...form,email:e})} otherStyle="mt-7" />
          <Formfield title="Password" value={form.password} handleChangetext={(e)=>setForm({...form,password:e})} otherStyle="mt-7" />
            <MyButton title="Sign In" handlePress={() => handlePress(email=form.email,password=form.password)} extrastyle="mt-7" isSubmitting={isSubmitting}/>
              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100">Don`t have an account? </Text>
                <Link href={"/signup"} className='text-lg font-semibold text-[#FFA001]'>Sign Up</Link>
              </View>
         </View>
      </ScrollView>
    </SafeAreaView>
  )
}  

export default sigin