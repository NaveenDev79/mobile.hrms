import {Alert, ScrollView, Text, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import AuthBanner from '../../components/AuthBanner'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import { useState } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';




const ForgetPassword = () => {
    // const handleNextPress = () => Alert.alert('Alert Title', 'My Alert Msg', [
    //     {
    //         text: 'Cancel',
    //         onPress: () => Alert.alert('Cancel Pressed'),
    //         style: 'cancel'
    //     },
    //     {
    //         text: 'Next',
    //         onPress: () =>{
    //             Alert.alert('next Pressed');
    //             router.push('password-code')
    //         },
    //         style: 'ok'
    //     }
    // ] );
    const [email, setemail] = useState('');
    const router = useRouter()


    async function handleNextPress() { 
        if(!email){
            Alert.alert("Please Enter a Valid email");
            return;

        }

        try {
            const {data} = await axios.post('/auth/forget-password',{email});
          
          
            
            if(data.success){
                Alert.alert(data.message);  
                
                await AsyncStorage.setItem('@token', JSON.stringify({token:data.data}));
              
              router.push('/password-code')
            }else{
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
                        <Text>In case of yo have forgetten your passowrd kindlr enter you remai In case
                            of yo have forgetten your passowrd kindlr enter you remail In case of yo have
                            forgetten your passowrd kindlr enter you remaill</Text>
                        <View>
                            <FormField value={email} onChange={(text)=>(setemail(text))} title={'Email'}/>
                            <CustomButton
                                onPressHandle={handleNextPress}
                                title={'Next'}
                                styleClass="bg-[#4ecdc4] p-4 mx-2 my-4 rounded-lg"/>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgetPassword
