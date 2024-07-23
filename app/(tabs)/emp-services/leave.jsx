import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React, {useState} from 'react'
import TopLayout from '../../../components/employee/TopLayout'
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const Leave = () => {
    const router = useRouter();
    const [leaveData,
        setLeaveData] = useState({
        type: "",
        cause: "",
        to: dayjs(),
        from: dayjs(), 
    });
    const todaysddate = new Date(dayjs());
    const handleInputChange = (name, value) => {
        setLeaveData({
            ...leaveData,
            [name]: value
        });
    };

    function onSubmitHandler() {
        console.log(leaveData)
    }
    function calculateDateDifference(fromDate, toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const differenceInMs = to - from;
        const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

        return differenceInDays;
    }

    return (
        <TopLayout bg='#3399' title='' isTop={false}>
            <View className='flex flex-row gap-4 my-2 items-center'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={34} color="#3399"/>
                </TouchableOpacity>
                <Text className='text-xl  font-black'>New Leave</Text>
            </View>
            {/* BODY */}
            <View className='p-2 border-2 border-slate-400 rounded-lg my-2'>
                <InputField
                    title={'Type'}
                    value={leaveData.type}
                    name='type'
                    onInputChange={handleInputChange}
                    Icon={< AntDesign name = "slack-square" size = {
                    44
                }
                color = "white" />}/>
                <View className="h-1 my-2 bg-slate-300"/>
                <InputField
                    title={'Cause'}
                    value={leaveData.cause}
                    name='cause'
                    onInputChange={handleInputChange}
                    Icon={< AntDesign name = "edit" size = {
                    44
                }
                color = "white" />}/>
                <View className="h-1 my-2 bg-slate-300"/>
                <InputField
                    title={'From'}
                    value={leaveData.from}
                    name='from'
                    onInputChange={handleInputChange}
                    Icon={< MaterialIcons name = "date-range" size = {
                    44
                }
                color = "white" />}/>
                <View className="h-1 my-2 bg-slate-300"/>
                <DateTimePicker
                    mode="single"
                    timePicker={true}
                    minDate={todaysddate}
                    date={leaveData.from}
                    onChange={(params) => handleInputChange('from', params.date)}/>
                <View className="h-1 my-2 bg-slate-300"/>
                <InputField
                    title={'To'}
                    value={leaveData.to}
                    name='to'
                    onInputChange={handleInputChange}
                    Icon={< MaterialIcons name = "date-range" size = {
                    44
                }
                color = "white" />}/>
                <View className="h-1 my-2 bg-slate-300"/>
                <DateTimePicker
                    mode="single"
                    timePicker={true}
                    minDate={leaveData
                    ?.from}
                    date={leaveData.to}
                    onChange={(params) => handleInputChange('to', params.date)}/>
            </View>
            {/* Button */}
            <View>
                <ApplyButton
                    onChangeHandler={onSubmitHandler}
                    title={`Apply for ${calculateDateDifference(leaveData.from, leaveData.to)} days`}/>
            </View>
        </TopLayout>
    )
}

export const InputField = ({title, Icon, name, value, onInputChange}) => {
    return (
        <View className="flex flex-row my-1 overflow-hidden gap-2">
            <View className='bg-[#5C63D6] p-1 rounded-md'>
                {Icon}
            </View>
            <View className="">
                <Text className='text-base font-black'>{title}</Text>
                <TextInput
                    name={name}
                    placeholder={title}
                    className="border-b-2 min-w-full border-slate-300	"
                    onChangeText={(text) => onInputChange(name, text)}
                    value={value}/>
            </View>
        </View>
    )
}

export const DateInputField = ({title, Icon, name, value, onInputChange}) => {
    return (
        <View className="flex flex-row my-1 overflow-hidden gap-2">
            <View className='bg-[#5C63D6] p-1 rounded-md'>
                {Icon}
            </View>
            <View className="">
                <Text className='text-base font-black'>{title}</Text>
                <TextInput
                    name={name}
                    className="border-b-2 min-w-full border-slate-300	"
                    onChangeText={(text) => onInputChange(name, text)}
                    value={value}/>
            </View>
        </View>
    )
}

export const ApplyButton = ({title, onChangeHandler}) => {
    return (
        <View className="rounded-md  p-4 my-2 bg-[#5C63D6]">
            <TouchableOpacity onPress={onChangeHandler}>
                <Text className="text-base font-bold text-center text-white">{title}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Leave