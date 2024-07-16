import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants/index';

const LeaveComponent = ({ item }) => {
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

    return (
        <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold">{item.title}</Text>
                <View className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    <Text className="text-white font-bold text-xs uppercase">{item.status}</Text>
                </View>
            </View>
            <View>
                <Text className="text-sm text-gray-600">Applied on {item.appliedOn}</Text>
                <View className="flex flex-row justify-between items-center mt-2">
                    <Text className="text-base font-semibold">{item.type}</Text>
                    <TouchableOpacity className="p-2 border-2 border-gray-400 rounded-full">
                        <Image className="w-6 h-6" resizeMode='contain' source={icons.right} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LeaveComponent;