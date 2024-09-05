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


const ResetPassword = () => {

    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('');
    const router = useRouter();

    async function handleNextPress() {

        let userData = await AsyncStorage.getItem('@token');
        const token = JSON.parse(userData);  

        if (!token || !password) {
            Alert.alert("values are missing");
            return;
        }

        if (password !=confirmPassword) {
            Alert.alert("password did not matched.");
            return;
        }
 

        try {
            const {data} = await axios.post('/auth/reset-password', {
                password,confirmPassword
            }, {
                headers: {
                    token: token.token
                }
            }); 

            if (data.success) {
                Alert.alert(data.message);
                await AsyncStorage.clear();
                router.push('/login');
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
                        <Text>Please enter the new password.</Text>
                        <View>
                            <FormField value={password} onChange={(text) => (setpassword(text))} title={'password'}/>
                            <FormField value={confirmPassword} onChange={(text) => (setconfirmPassword(text))} title={'confirm password'}/>
                            <CustomButton
                                onPressHandle={handleNextPress}
                                title={'Reset password'}
                                styleClass="bg-[#4ecdc4] p-4 mx-2 my-4 rounded-lg"/>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ResetPassword