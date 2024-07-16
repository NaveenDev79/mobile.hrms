import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {Link, router} from 'expo-router';
import {images} from '../../constants';
import FormField from '../../components/FormField';
import AuthBanner from '../../components/AuthBanner';
import {SelectList} from 'react-native-dropdown-select-list'
import CustomButton from '../../components/CustomButton';
const LoginScreen = () => {
    const [selected,
        setSelected] = useState("");

    const data = [
        {
            key: "Employee",
            value: "Employee"
        }, {
            key: "HR Admin",
            value: "HR Admin"
        }, {
            key: "General Admin",
            value: "General Admin"
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="auto"/>
            <ScrollView contentContainerStyle={{
                flexGrow: 1
            }}>
                <View className="flex-1">
                    <View className="h-2/5">
                        <AuthBanner/>
                    </View>
                    <View className="flex-1 bg-white py-8 px-2">
                        <FormField
                            title="Email"
                            placeholder="Enter your email"
                            keyboardType="email-address"/>
                        <FormField title="Password" placeholder="Enter your password" secureTextEntry/>
                        <View className="p-2">
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
                            title="Login"
                            onPressHandle={() => console.log('register')}
                            styleClass="bg-[#4ecdc4] p-4 m-2 rounded-lg"/>

                        <View className="flex-row justify-between p-2 mt-6"> 
                            <Link href="/forget-password"> 
                                <Text className="text-blue-500">forget-password</Text>
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