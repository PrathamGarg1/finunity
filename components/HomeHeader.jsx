import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, Image } from 'react-native'
import React from 'react'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  import { useAuthContext } from '../context/GlobalProvider';
  import { MenuItem } from './CustomMenuItems';
  




const HomeHeader = () => {
    const {logout} = useAuthContext();
    const handleProfile=()=>{

    }
    const handleLogout=async()=>{
        await logout();
    }
    const { user } = useAuthContext();
    return (
        <View className="flex-row justify-between px-5 pt-10 bg-yellow-400 pb-6 rounded-3xl shadow">
            <View>
                <Text className="font-bold text-black">Chats</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger>
                                <Image 
                                    style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                                    source={{ uri: user?.profile }}
                                />
                    </MenuTrigger>
                    <MenuOptions customStyles={{optionsContainer:{borderRadius:10}}}>
                        <MenuItem text="Profile" value={null} action={handleProfile} />
                        <MenuItem text="Sign Out" value={null} action={handleLogout} />


                    </MenuOptions>
                </Menu> 
               
            </View>
        </View>
    );
}

export default HomeHeader;
