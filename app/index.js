import { Image, TouchableOpacity, Text, View} from 'react-native'
import {images} from '../constants'
import PageLayout from '../components/common/layout' 
import {useRouter } from 'expo-router'

const Index = () => {
    const router = useRouter(); 
    setTimeout(() => {
        // router.push('/emp-services/apply-reimburstment')
        // router.push('/Home')
    }, 100);

    return (
        <PageLayout bgColor='#fcebdb' classname="flex-1 min-h-screen p-0">
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
                {/*  */}
                <View className="bg-[#f2984a] p-6 h-full rounded-t-3xl  ">
                    <View className="px-2">
                        <Text className="text-2xl text-white font-bold">Welcome !</Text>
                        <Text className="text-base my-4 text-white font-normal leading-5">
                            Human Resource Management System is designed to streamline your HR processes. Navigate
                            effortlessly through employee management, track attendance with ease, and many more. Experience the future of HR management today!
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
    )

}

export default Index;
