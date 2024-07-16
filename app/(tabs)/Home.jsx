import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeTop, {HomeBody, HomeBottom, HomeNav} from '../../components/HomeTop';
const HomeScreen = () => {

    return (
        <SafeAreaView className="min-h-screen bg-gray-400">
            <ScrollView >
                <View className="pb-16">
                    <Text className="text-3xl text-white bg-gray-800 p-4  font-bold">Home tab</Text>
                    <View className="flex-1 px-2 py-2">
                        <HomeNav/>
                        <HomeTop/>
                        <HomeBody/>
                        <HomeBottom/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
