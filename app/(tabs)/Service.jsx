import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceCard from '../../components/ServiceCard';
import { images } from '../../constants/index';

const Service = () => {
    return (
        <SafeAreaView className="min-h-screen bg-gray-100">
            <ScrollView  >
                <View className="pb-16">
                    <Text className="text-3xl text-white bg-gray-800 p-4  font-bold">Services tab</Text>
                    <View className="flex-1">
                        <ServiceCard title="Leave" path="leave" image={images.leave} />
                        <ServiceCard title="Reimbursement" path="reimburstment" image={images.payment} />
                        <ServiceCard title="New service will be lauched soon." path="Home" image={images.payment} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Service;
