import {View, Text, Alert} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView} from 'react-native'
import AuthBanner from '../../components/AuthBanner'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import {useState} from 'react'
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordCode = () => {

    const [OTP,
        setOTP] = useState('');
    const router = useRouter();

    async function handleNextPress() {

        let userData = await AsyncStorage.getItem('@token');
        const token = JSON.parse(userData);  

        if (!OTP || !token) {
            Alert.alert("Please Enter a Valid OTP & token");
            return;
        }
 

        try {
            const {data} = await axios.post('/auth/otp-validate', {
                otp: OTP
            }, {
                headers: {
                    token: token.token
                }
            }); 

            if (data.success) {
                Alert.alert(data.message);
                router.push('/Reset-Password');
            } else {
                Alert.alert(data.message)
            }

        } catch (error) {
            Alert.alert(error.message)
        }

    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{
                flexGrow: 1
            }}>
                <View className="flex-1">
                    <View className="h-2/5">
                        <AuthBanner/>
                    </View>
                    <View className="h-3/5 mt-12 p-4">
                        <Text>Forget Password</Text>
                        <Text>Please enter the 6 digit code that you recieved in your email.</Text>
                        <View>
                            <FormField value={OTP} onChange={(text) => (setOTP(text))} title={'Otp'}/>
                            <CustomButton
                                onPressHandle={handleNextPress}
                                title={'Enter'}
                                styleClass="bg-[#4ecdc4] p-4 mx-2 my-4 rounded-lg"/>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PasswordCode