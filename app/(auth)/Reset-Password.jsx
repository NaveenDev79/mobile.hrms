import {View, Text, Alert} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView} from 'react-native'
import AuthBanner from '../../components/AuthBanner'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {router} from 'expo-router'

const ResetPassword = () => {
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
                            <FormField title={'password'}/>
                            <FormField title={'confirm password'}/>
                            <CustomButton
                                onPressHandle={() => {
                                Alert.alert('okay');
                                router.push('login')
                            }}
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