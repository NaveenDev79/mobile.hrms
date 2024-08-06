import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants/index';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LeaveComponent = ({ item }) => {

    const router = useRouter();
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-500';
            case 'In-review':
                return 'bg-yellow-500';
            case 'Rejected':
                return 'bg-red-300';
            default:
                return 'bg-gray-300';
        }
    };

    function handleTouch(){
        router.push(`emp-approvals/leave/${item.id}`)
    }

    return (
        <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-base font-medium">{item.title}</Text>
                <View className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    <Text className="text-white font-light text-xs uppercase">{item.status}</Text>
                </View>
            </View>
            <View>
                <Text className="text-base text-gray-600">Applied on {item.appliedOn}</Text>
                <View className="flex flex-row justify-between items-center mt-2">
                    <Text className="text-base font-light">{item.type}</Text>
                    <TouchableOpacity className="" onPress={handleTouch}>
                    <AntDesign name="rightcircleo" size={28} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LeaveComponent;