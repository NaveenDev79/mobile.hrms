import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Link} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

const ServiceCard = ({title, image, path}) => {
    const getIcon = (servicePath) => {
        switch (servicePath) {
            case 'leave':
                return 'calendar-outline';
            case 'reimbursement':
                return 'cash-outline';
            case 'training':
                return 'school-outline';
            default:
                return 'briefcase-outline';
        }
    };

    return (
        <View className="my-2 rounded-md p-2 bg-white shadow-md ">
            <View className="flex flex-row gap-4 items-center">
                <Ionicons name={getIcon(path)} size={24} color="#324467"/>
                <Text className="text-xl font-semibold text-gray-800">{title}</Text>
            </View>
            <Image source={image} className="h-32 w-full" resizeMode="cover"/>
            <View className="p-4">
                <Link href={`emp-services/${path}`} asChild>
                    <TouchableOpacity className="bg-[#324467] py-2 px-4 rounded-full">
                        <Text className="text-white font-semibold text-center">
                            Apply for {path}
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

const TempServiceCard = ({title, image}) => {

    return (
        <View className="my-2 rounded-md p-2 bg-white shadow-md ">
            <View className="flex flex-row gap-4 items-center">
                <Ionicons name={'school-outline'} size={24} color="#324467"/>
                <Text className="text-xl font-semibold text-gray-800">{title}</Text>
            </View>
            <Image source={image} className="h-32 w-full" resizeMode="cover"/> 
                <Text className="text-base mt-1 font-semibold ">
                    New services will be launched soon, stay tuned.
                </Text> 
        </View>
    );
};

export default ServiceCard;
export {TempServiceCard}