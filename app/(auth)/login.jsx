import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios'; // Make sure to import axios 
import FormField from '../../components/FormField';
import AuthBanner from '../../components/AuthBanner';
import CustomButton from '../../components/CustomButton';
import { setLoggedIn } from '../../redux-store/authSlice';
import { useDispatch } from "react-redux";

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

    const handleFormSubmit = async () => {
        setLoading(true);
        setError(null);

        try { 
            const response = await axios.post('http://192.168.111.110:8080/api/v1/auth/signin', form);
            if (response.data.success) {
                console.log(response.data.message);
                const user = response.data.user;
                setForm({ email: "", password: ""});

                // Dispatch action to update Redux store
                dispatch(setLoggedIn(user));

                // Navigate based on the user's role
                if (user.role === 'HR Admin') {
                    router.push('/hr'); 
                } else if (user.role === 'General Admin') {
                    router.push('/admin'); 
                } else {
                    router.push('/Home');
                }
            } else {
                console.log(response.data.message);
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
                            onChange={(text) => { 
                                handleFormChange('email', text)
                            }}
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
