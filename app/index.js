import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../constants';
import PageLayout from '../components/common/layout';
import {Redirect, useRouter} from 'expo-router';
import axios from 'axios';
import { useSelector } from 'react-redux';

axios.defaults.baseURL = 'http://127.0.0.1:8080/api/v1';


const Index = () => {
    const router = useRouter(); 
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let storedData = await AsyncStorage.getItem('@auth');
                if (storedData) {
                    const parsedData = JSON.parse(storedData); 

                    axios.defaults.headers.common['token'] = parsedData.token || '';
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching auth data:', error);
                router.push('/login');
            }
        };

        fetchData();
    }, []);

    // Handle redirects based on user role
    if (user) {
        if (user.role === 'Employee') {
            return <Redirect href="/emp-home" />;
        } else {
            return <Redirect href="/admin-home" />;
        }
    }


    

    return (
        <PageLayout bgColor='#fcebdb' className="flex-1 min-h-screen p-0">
            <View className="flex min-h-screen">
                {/* TOP */}
                <View className="pt-12 px-6 flex gap-2">
                    <Text className="text-gray-700 text-3xl font-extrabold text-center">HRMS Online</Text>
                    <View className="h-[380px]">
                        <Image
                            className="rounded-lg h-full w-full"
                            resizeMode='contain'
                            source={images.authInitial}/>
                    </View>
                </View>
                {/* BOTTOM */}
                <View className="bg-[#f2984a] p-6 h-full rounded-t-3xl">
                    <View className="px-2">
                        <Text className="text-2xl text-white font-bold">Welcome !</Text>
                        <Text className="text-base my-4 text-white font-normal leading-5">
                            Human Resource Management System is designed to streamline your HR processes.
                            Navigate effortlessly through employee management, track attendance with ease,
                            and many more. Experience the future of HR management today!
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/login')}
                        className="bg-slate-50 p-2 mt-6 rounded-lg">
                        <Text className="text-center text-2xl text-green-700 font-bold">Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </PageLayout>
    );
}

export default Index;
