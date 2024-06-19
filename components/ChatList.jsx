import { View, Text, FlatList } from 'react-native'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

const ChatList = ({users,currentUser}) => {
    const router=useRouter();
  return (
    <View className="flex-1">
        <FlatList data={users} contentContainerStyle={{flex:1,paddingVertical:25}} keyExtractor={i=>Math.random()} renderItem={({item,index})=><ChatItem router={router} currentUser={currentUser} index={index} item={item} />} />
    </View>
  )
}

export default ChatList