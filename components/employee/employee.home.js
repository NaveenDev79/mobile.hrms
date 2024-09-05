import {
    Alert,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {icons, images} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {setCheckIn, setCheckOut} from "../../redux-store/attendenceSlice";
import {useEffect, useState} from "react";
import {router, useRouter} from "expo-router";
import axios from "axios";

export const EmployeeHomeTop = ({user}) => {
    return (
        <View className="flex items-center bg-white p-2 rounded-sm flex-row">
            <Image
                source={user
                ?.image
                    ? {
                        uri: user.image
                    }
                    : images.profilePicture}
                className="w-16 h-16 rounded-full border-4 shadow-3xl object-contain border-slate-700"/>
            <Text className="text-2xl font-medium text-[#284467] ml-2">
                Hello! {user
                    ?.name || "Guest"}
            </Text>
        </View>
    );
};

export const HomeInfo = ({title, message}) => {
    return (
        <View
            className="flex mt-1 items-center bg-white p-2 rounded-sm shadow-2xl flex-row">
            <View className="w-3/4">
                <Text className="font-medium capitalize text-[#324467] text-xl">{title}</Text>
                <Text className="text-base my-0">{message}</Text>
            </View>
            <Image className="absolute w-26 h-26 -top-3  -right-3" source={images.homeTop}/>
        </View>
    )
}

export const LeaveReport = () => {

    const router = useRouter();
    return (
        <View className="flex my-1 bg-white p-2 rounded-lg ">
            {[
                {
                    title: "Current leave Report",
                    path: "monthly-emp"
                }, {
                    title: "Annual Report",
                    path: "yearly-emp"
                }
            ].map((item) => {
                return (
                    <View key={item.title}>
                        <TouchableOpacity
                            onPress={()=>router.push(`(tabs)/emp-home/${item.path}`)}
                            
                            className="flex my-2 rounded-lg p-2 flex-row items-center ">
                            <Image
                                source={icons.lo}
                                resizeMode='contain'
                                className="w-12 p-4 bg-slate-400 rounded-full mr-4 h-12"/>
                            <Text className="text-lg font-normal">{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })
}

        </View>
    )
}

export const AttendanceComponent2 = () => {
    const {isChecked, checkinTime, checkInForToday, checkoutTime} = useSelector((state) => state.attendence); 
    const {user} = useSelector((state) => state.auth); 
    const dispatch = useDispatch();
    const [elapsedTime, setElapsedTime] = useState({hours: 0, minutes: 0, seconds: 0});

    useEffect(() => {
        let timer;
        if (isChecked && checkinTime) {
            timer = setInterval(() => {
                const now = new Date();
                const checkinDate = new Date();
                const [checkInHours, checkInMinutes, checkInSeconds] = checkinTime.split(':').map(Number);

                checkinDate.setHours(checkInHours);
                checkinDate.setMinutes(checkInMinutes);
                checkinDate.setSeconds(checkInSeconds);

                const diff = Math.abs(now - checkinDate) / 1000;
                const hours = Math.floor(diff / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = Math.floor(diff % 60);

                setElapsedTime({hours, minutes, seconds});
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isChecked, checkinTime]);

    const handleCheckIn = async () => {
        if (checkInForToday) {
            Alert.alert('Already Checked In', 'You have already checked in for today.');
            return;
        }

        const currentHours = new Date().getHours();
        if (currentHours < 9) {
            Alert.alert('Check-In Not Available', 'Check-in has not started yet. Please try later.');
            return;
        }

        try {
            const {data} = await axios.post('/attendence/check-in', {userId: user._id});
            if (data.success) {
                Alert.alert('Success', data.message);
                dispatch(setCheckIn(new Date().toLocaleTimeString('en-US', {hour12: false})));
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleCheckOut = async () => {
        try {
            const {data} = await axios.put('/attendence/check-out', {userId: user._id});
            if (data.success) {
                Alert.alert('Success', data.message);
                dispatch(setCheckOut(new Date().toLocaleTimeString('en-US', {hour12: false}))); 
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View className='flex-1 p-4 bg-white mt-1 rounded-md'>
            <ImageBackground
                source={images.tbanner}
                resizeMode="contain"
                className='h-full w-full'>
                <View className='pt-40'>
                    <View className="flex flex-row items-end justify-center gap-4">
                        <Text className='text-base w-12 h-12 p-3 text-white rounded-lg bg-orange-400'>
                            {isChecked
                                ? elapsedTime.hours.toString().padStart(2, '0')
                                : (Number(checkoutTime?.slice(0, 2)) - Number(checkinTime?.slice(0, 2)) || '00')}
                        </Text>

                        <Text className='text-base w-12 h-12 p-3 text-white rounded-lg bg-orange-400'>
                            {isChecked
                                ? elapsedTime.minutes.toString().padStart(2, '0')
                                : (Number(checkoutTime?.slice(3, 5)) - Number(checkinTime?.slice(3, 5)) || '00')}
                        </Text>

                        <Text className='text-base w-12 h-12 p-3 text-white rounded-lg bg-orange-400'>
                            {isChecked
                                ? elapsedTime.seconds.toString().padStart(2, '0')
                                : (Number(checkoutTime?.slice(6, 8)) - Number(checkinTime?.slice(6, 8)) || '00')}
                        </Text>

                        <Text className='text-base'>HRS</Text>
                    </View>
                </View>
                <View className='border-b border-gray-300 my-4'/>
                <Text className='text-center text-base'>GENERAL 09:00 AM TO 06:00 PM</Text>

                <View className='mt-4 items-center'>
                    {isChecked ? (
                        <TouchableOpacity
                            onPress={handleCheckOut}
                            className='bg-blue-500 w-2/4 p-2 rounded-[122px]'>
                            <Text className='text-white text-center text-base'>CHECK OUT</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleCheckIn}
                            className='bg-blue-500 w-2/4 p-2 rounded-[122px]'>
                            <Text className='text-white text-center text-base'>CHECK IN</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};