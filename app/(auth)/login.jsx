import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar,Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios'; // Make sure to import axios 
import FormField from '../../components/FormField';
import AuthBanner from '../../components/AuthBanner';
import CustomButton from '../../components/CustomButton';
import { setLoggedIn } from '../../redux-store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { setAttendenceInitial } from '../../redux-store/attendenceSlice';

const LoginScreen = () => { 
    const [form, setForm] = useState({ email: "", password: "", role: "Employee" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
 
    const handleFormChange = (field, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    };

    async function fetchAttendance(token) {
        try {
            const { data } = await axios.get('/attendence/today', {
                headers: {
                    token:token
                }
            });

            if (data.success) {
                dispatch(setAttendenceInitial(data.data));
            } 
        } catch (error) {
            // Alert.alert('Error', error.message);
        }
    }

    const handleFormSubmit = async () => {
        setLoading(true);
        setError(null);

        try { 
            const response = await axios.post('/auth/signin', form);
            if (response.data.success) { 
                const user = response.data.user;
                const token = response.data.token;
                setForm({ email: "", password: "" });

                // Dispatch action to update Redux store
                dispatch(setLoggedIn({ user, token }));
                await AsyncStorage.setItem('@auth', JSON.stringify({ user, token }));
                
                // Navigate based on the user's role
                if (user.role === 'Employee') {
                    router.push('emp-home/home-emp');
                } else {
                    router.push('/admin-home'); 
                } 
            } else {
                setError(response.data.message || "Failed to sign in. Please try again.");
            }
        } catch (error) {
            setError("Failed to sign in. Please try again.");
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1">
                    <View className="h-2/5">
                        <AuthBanner />
                    </View>
                    <View className="flex-1 bg-white py-8 px-2">
                        <FormField
                            title="Email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={(text) => handleFormChange('email', text)}
                            keyboardType="email-address"
                        />
                        <FormField
                            title="Password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(text) => handleFormChange('password', text)}
                            secureTextEntry
                        /> 
                        <CustomButton
                            title={loading ? "Loading..." : "Login"}
                            onPressHandle={handleFormSubmit}
                            styleClass="bg-[#4ecdc4] p-4 m-2 rounded-lg"
                            disabled={loading}
                        />
                        {error && <Text className="text-red-500 text-center">{error}</Text>}
                        <View className="flex-row justify-between p-2 mt-6">
                            <Link href="/forget-password">
                                <Text className="text-blue-500">Forget Password</Text>
                            </Link>
                            <Link href="/Register">
                                <Text className="text-black-500">Sign Up</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;
