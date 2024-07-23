import {ScrollView, Image, TouchableOpacity, Text, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {Link, Redirect, router} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import {images} from '../constants'

export const baseURL = 'http://localhost:8080/api/v1';

const App = () => {

    return (
        <SafeAreaView className="">
            <ScrollView
                contentContainerStyle={{
                height: "100%"
            }}>
                <View className="flex pt-4  bg-[#f2984aa0] ">
                    <View className="basis-3/5 flex">
                        <Text
                            className=" basis-1/12 text-slate-950 text-3xl font-extrabold text-center m-4">HRMS Online</Text>
                        <View className="w-full basis-11/12">
                            <Image
                                className=" h-full  py-4 w-full rounded-lg"
                                resizeMode='contain'
                                source={images.authInitial}/>
                        </View>
                    </View>
                    <View
                        className="bg-[#f2984a] flex justify-evenly rounded-t-3xl py-2 px-1 basis-2/5">
                        <View className="px-2">
                            <Text className="text-2xl text-white font-bold">Welcome !</Text>
                            <Text className="text-md mt-2 text-white font-normal leading-5	">It is a long
                                established fact that a reader will be distracted by the readable content of a
                                page when looking at its layout.</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => router.push('/login')}
                                className="bg-slate-50 p-2 rounded-lg">
                                <Text className="text-center text-2xl   font-bold">sign in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('(admin)/admin-home')}
                                className="bg-slate-50 mt-2 p-2 rounded-lg">
                                <Text className="text-center text-2xl   font-bold">Admin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/Home')}
                                className="bg-slate-50 mt-2 p-2 rounded-lg">
                                <Text className="text-center text-2xl   font-bold">Employee</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>  
                {/* <Redirect href={`/(admin)/admin-home`} />
                {/* <Redirect href={`/(tabs)/Home`} /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default App
