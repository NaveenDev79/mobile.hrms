import {View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {icons, images} from '../constants/index';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { setCheckIn, setCheckOut } from '../redux-store/attendenceSlice';


const HomeMessage = () => {
    return (
        <View className="flex my-2 items-center bg-white p-2 rounded-sm shadow-2xl flex-row">
            <View className="w-3/4">
                <Text className="font-medium capitalize text-[#324467] text-xl">update</Text>
                <Text className="text-base my-2">is simply dummy text of the printing &  industry.</Text>
            </View>
            <Image
                className="absolute w-32 h-32 -top-8  right-0"
                source={images.homeTop}/>
        </View>
    )
}

export const HomeHeading = () => {

    const user = useSelector((state)=>state.auth.user);
    return (
        <View className="flex items-center bg-white p-2 rounded-sm flex-row">
            <Image
                source={images.profilePicture}
                className="w-16 h-16 rounded-full border-4 shadow-3xl border-slate-700"/>
            <Text className="text-2xl font-semibold text-[#324467] ml-4">Hello! {user?.name}</Text>
        </View>
    )
}

export const Attendence = () => {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    const { isChecked, checkinTime, checkInForToday, checkoutTime } = useSelector((state) => state.attendence);
    const dispatch = useDispatch();

    // useEffect(() => {x

    function handleCheckIn() {
        const todaysDate = new Date();
        setStartTime(todaysDate); // Set start time for the timer
        dispatch(setCheckIn(todaysDate));
    }

    function handleCheckOut() {
        const todaysDate = new Date();
        setStartTime(null); // Stop the timer
        dispatch(setCheckOut(todaysDate));
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <View className='flex-1 rounded-sm'>
            <ImageBackground
                source={images.tbanner}
                resizeMode="contain"
                className='h-96 w-full'>
                <View className='flex flex-row items-center justify-center gap-4 pt-40'>
                    <Text className='text-base p-2 text-white rounded-lg bg-orange-400'>{formatTime(elapsedTime)}</Text>
                    <Text className='text-base p-2 text-white rounded-lg bg-orange-400'>{formatTime(elapsedTime)}</Text>
                    <Text className='text-base p-2 text-white rounded-lg bg-orange-400'>{formatTime(elapsedTime)}</Text>
                    <Text className='text-base'>HRS</Text>
                </View>
                <View className='border-b border-gray-300 my-4' />
                <Text className='text-center text-base'>GENERAL 09:00 AM TO 06:00 PM</Text>

                <View className='mt-4 items-center'>
                    {!isChecked
                        ? (<TouchableOpacity disabled={checkInForToday} onPress={handleCheckIn} className='bg-blue-500 w-2/4 p-2 rounded-[122px]'>
                            <Text className='text-white text-center text-base'>CHECK IN</Text>
                        </TouchableOpacity>)
                        : (<TouchableOpacity onPress={handleCheckOut} className='bg-blue-500 w-2/4 p-2 rounded-[122px]'>
                            <Text className='text-white text-center text-base'>CHECK OUT</Text>
                        </TouchableOpacity>)
                    }
                </View>
            </ImageBackground>
        </View>
    );
};

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
export default HomeMessage