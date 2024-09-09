import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Link, Redirect, router, useRouter} from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import AuthBanner from '../../components/AuthBanner';
import {SelectList} from 'react-native-dropdown-select-list'; 
import axios from 'axios';

const RegisterScreen = () => {
    const [form,
        setForm] = useState({email: "", name: "", password: "", role: ""});
        const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFormChange = (field, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    };

    const router = useRouter();

    const handleFormSubmit = async() => {
        form.role = selected;        
        setLoading(true);
        setError(null);

        try {
            form.role = selected;
            const {data} = await axios.post('/auth/signup',form) ;
            if(data.success){ 
                setForm({email: "", name: "", password: "", role: "Employee"});
                router.push('/login')
                
            }

             
        } catch (error) {
            setError("Failed to sign up. Please try again.");  
            
        } finally {
            setLoading(false);
        }
    };

    const [selected,
        setSelected] = useState("");

    const data = [
        {
            key: "Employee",
            value: "Employee"
        }, {
            key: "HR",
            value: "HR"
        }, {
            key: "Admin",
            value: "Admin"
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{
                flexGrow: 1
            }}
                className="flex-1">
                <View className="flex-1 min-h-screen">
                    <View className="h-2/5">
                        <AuthBanner/>
                    </View>
                    <View className="flex-1 bg-white py-8 px-2">
                        <View className="my-2">
                            <FormField
                                title="Name"
                                value={form.name}
                                onChange={(value) => handleFormChange('name', value)}/>
                            <FormField
                                title="Email"
                                value={form.email}
                                onChange={(value) => handleFormChange('email', value)}
                                keyboardType="email-address"/>
                            <FormField
                                title="Password"
                                value={form.password}
                                onChange={(value) => handleFormChange('password', value)}
                                secureTextEntry/>
                            <View className="px-2 py-1">
                                <Text className="my-1 font-semibold">Role</Text>
                                <SelectList
                                    setSelected={setSelected}
                                    data={data}
                                    search={false}
                                    boxStyles={{
                                    borderRadius: 8,
                                    borderColor: "rgb(2 6 23)",
                                    borderWidth: 2
                                }}
                                    defaultOption={{
                                    key: 'Employee',
                                    value: 'Employee'
                                }}/>
                            </View>
                            <CustomButton
                                title="Register"
                                onPressHandle={handleFormSubmit}
                                styleClass="bg-[#4ecdc4] p-4 mx-2 my-4 rounded-lg"/>
                                {loading && <ActivityIndicator size="large" color="#4ecdc4" />} 
                        </View>
                    </View>
                </View>

                <View className="p-2 flex items-end mr-2">
                    <Link href="/login">
                        <Text className="text-right text-blue-500">Sign In</Text>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
