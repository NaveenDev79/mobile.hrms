import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from 'react-native-ui-datepicker';
import { InputField, showSuccess } from '../../../components/Inputs';
import { ActionButtons } from '../../../components/Buttons';
import { Container } from '../../../components/Layout';
import dayjs from 'dayjs';
import { HRLINE } from '../../../components/Utils';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Leave = () => {
  const router = useRouter();
  const [leaveData, setLeaveData] = useState({
    type: '',
    cause: '',
    to: dayjs().startOf('').toDate('YYYY-MM-DD') ,
    from: dayjs().startOf('').toDate('YYYY-MM-DD'),
  });
  const todaysDate = dayjs().toDate('YYYY-MM-DD');
  const token = useSelector((state)=>state.auth.token); 
  

  const handleInputChange = (name, value) => {
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  const onSubmitHandler = async() => {
    const formData = { 
        ...leaveData,
        from: dayjs(leaveData.from).format('YYYY-MM-DD'),
        to: dayjs(leaveData.to).format('YYYY-MM-DD'),
        days:calculateDateDifference(leaveData.from, leaveData.to),
      }; 
      try { 
        const {data} = await axios.post('/leave',formData,{
          headers:{
            token:token
          }
        }); 
        if(data.success){
          showSuccess( message=data.message,()=>{
            router.push('emp-services/Service')
          });
          setLeaveData({
            type: '',
            cause: '',
            to: dayjs().startOf('').toDate('YYYY-MM-DD') ,
            from: dayjs().startOf('').toDate('YYYY-MM-DD'),
          });
        }
        Alert.alert('Error', data.message);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
  };

  const calculateDateDifference = (fromDate, toDate) => {
    const from = dayjs(fromDate);
    const to = dayjs(toDate);
    const differenceInDays = to.diff(from, 'day') + 1;
    return differenceInDays;
  };

  return (
    <Container classes="flex-1 min-h-screen px-2 mb-12 py-2">
      <View className="flex flex-row gap-4 my-2 items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={34} color="#5F66E1" />
        </TouchableOpacity>
        <Text className="text-xl font-medium">New Leave</Text>
      </View>
      {/* BODY */}
      <View className="p-2 border-2 border-slate-400 rounded-md my-2">
        <InputField
          title={'Type'}
          value={leaveData.type}
          name="type"
          onInputChange={handleInputChange}
          Icon={<AntDesign name="slack-square" size={44} color="white" />}
        />
        <HRLINE classes="h-[2px] my-2 bg-slate-300" />

        <InputField
          title={'Cause'}
          value={leaveData.cause}
          name="cause"
          onInputChange={handleInputChange}
          Icon={<AntDesign name="edit" size={44} color="white" />}
        />
        <HRLINE classes="h-[2px] my-2 bg-slate-300" />

        <InputField
          title={'From'}
          value={dayjs(leaveData.from).format('YYYY-MM-DD')}
          name="from"
          read
          onInputChange={handleInputChange}
          Icon={<MaterialIcons name="date-range" size={44} color="white" />}
        />
        <HRLINE classes="h-[2px] my-2 bg-slate-300" />
        <DateTimePicker
          mode="single"
          minDate={todaysDate}
          date={leaveData.from}
          onChange={(params) => handleInputChange('from', params.date)}
        />
        <HRLINE classes="h-[2px] my-2 bg-slate-300" />

        {/* {leaveData.from && ( */}
          <>
            <InputField
              title={'To'}
              value={dayjs(leaveData.to).format('YYYY-MM-DD')}
              name="to"
              read
              onInputChange={handleInputChange}
              Icon={<MaterialIcons name="date-range" size={44} color="white" />}
            />
            <HRLINE classes="h-[2px] my-2 bg-slate-300" />
            <DateTimePicker
              mode="single"
              minDate={leaveData.from}
              date={leaveData.to}
              onChange={(params) => handleInputChange('to', params.date)}
            />
          </>
        {/* )} */}
      </View>
      <ActionButtons
        changeHandler={onSubmitHandler}
        classes="rounded-md p-4 my-2"
        textClasses="text-base font-bold text-center text-white"
        title={`Apply for ${calculateDateDifference(leaveData.from, leaveData.to)} days`}
      />
    </Container>
  );
};

export default Leave;


