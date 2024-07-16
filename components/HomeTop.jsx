import {View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {icons, images} from '../constants/index';

const HomeTop = () => {
    return (
        <View className="flex my-2 items-center bg-white p-2 rounded-lg flex-row">
            <View className="">
                <Text className="font-bold capitalize text-xl">update</Text>
                <Text className="text-lg my-2">is simply dummy text of the printing & typesetting industry.</Text>
            </View>
            <Image
                className="absolute w-32 h-32 bottom-20  right-0"
                source={images.homeTop}/>
        </View>
    )
}

export const HomeNav = () => {
    return (
        <View className="flex my-2 items-center bg-white p-2 rounded-lg flex-row">
            <Image
                source={images.profilePicture}
                className="w-16 h-16 rounded-full border-4 shadow-3xl border-slate-700"/>
            <Text className="text-2xl font-black ml-4">Hello! Employee</Text>
        </View>
    )
}

export const HomeBody = () => {
    return (
        <View className='flex-1 my-2'>
            <ImageBackground
                source={images.tbanner}
                resizeMode="contain"
                className='h-96 w-full'>
                <View className='flex flex-row items-center justify-evenly pt-40'>
                    <Text className='text-xl p-2 rounded-lg bg-red-300'>00</Text>
                    <Text className='text-xl p-2 rounded-lg bg-red-300'>00</Text>
                    <Text className='text-xl p-2 rounded-lg bg-red-300'>00</Text>
                    <Text className='text-xl'>HRS</Text>
                </View>

                <View className='border-b border-gray-300 my-4'/>

                <Text className='text-center text-lg'>GENERAL 09:00 AM TO 06:00 PM</Text>

                <View className='mt-4 items-center'>
                    <TouchableOpacity className='bg-blue-500 w-2/4  p-4 rounded-[122px]'>
                        <Text className='text-white text-center text-lg'>CHECK IN</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>

    )
}

export const HomeBottom = () => {
    return (
        <View className="flex my-2 bg-white p-2 rounded-lg ">
            {["leave Report", "Annual Report"].map((item) => {
                return (
                    <View key={item} className="flex my-2 rounded-lg p-2 flex-row items-center ">
                        <Image
                            source={icons.lo}
                            resizeMode='contain'
                            className="w-12 p-4 bg-slate-400 rounded-full mr-4 h-12"/>
                        <Text className="text-lg font-normal">{item}</Text>
                    </View>
                )
            })
}

        </View>
    )
}
export default HomeTop