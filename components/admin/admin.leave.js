import {Text, TouchableOpacity, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useRouter } from "expo-router";

export const LeaveItem = ({item}) => { 
    const router = useRouter();

    function goToLeave(){
        router.push(`admin-approval/${item._id}`)
    }

    // Customize this component to display leave data
    return (
        <View className="p-2 bg-white mb-2 rounded-sm shadow">
            <Text className='text-base font-medium'>Type: {item.type}</Text>
            <View className='my-2'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-base font-light'>From : {item
                            .from
                            .slice(0, 10)}</Text>
                    <Text className='text-base font-light'>To : {item
                            .to
                            .slice(0, 10)}</Text>
                </View> 
            </View>
            <Text className="text-md font-light">Reason : {item.cause}</Text>
            <Text className='text-base font-light my-2'>Applied By: {item.userId.name}</Text>
            <View className="flex justify-between flex-row items-center">
                <Text className='text-base font-medium'>Status: {item.status}</Text>
                <TouchableOpacity onPress={goToLeave}>
                    <AntDesign name="rightcircleo" size={30} color="#25b8cb"/>
                </TouchableOpacity>
            </View>
        </View>
    );
};