import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useRouter} from 'expo-router';

const Header = ({title}) => {
    return (
        <View className="p-2 mx-2 bg-sky-400 rounded-lg">
            <Text className='text-xl text-white font-medium text-center'>{title}</Text>
        </View>
    )
}

export const NavigateBack = ({title}) => {
    const router = useRouter();
    return (
        <View className="p-2 mx-1 bg-sky-400 rounded-lg flex flex-row justify-between">
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle-outline" size={30} color="white"/>
            </TouchableOpacity>
            <Text className=' text-xl text-white font-medium text-center'>{title}</Text>
            <Text></Text>
        </View>
    )
}

export default Header