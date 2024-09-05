import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '../../../../components/Layout';
import { NavigateToBack } from '../../../../components/Utils';
import { useSelector } from 'react-redux';
import axios from 'axios';  

const LeaveId = () => {
  const { leaveId } = useLocalSearchParams();
  const [leaveItem, setLeaveItem] = useState({});
  const token = useSelector((state) => state.auth.token);

  const fetchLeave = async () => {
    try {
      const { data } = await axios.get(`/leave/${leaveId}`, {
        headers: { token }
      });

      if (data.success) {
        setLeaveItem(data.data);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [leaveId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#25b8cb';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'orange';
      default:
        return 'black';
    }
  };

  return (
    <Container classes='flex-1 p-2 min-h-screen'>
      <NavigateToBack title='Leave Status' />
      <View className='p-2 bg-white my-1 rounded-md'>
        <Text className='text-base font-medium'>Type : {leaveItem?.type}</Text>
        <Text className='text-base font-normal'>Reason : {leaveItem?.cause}</Text>
      </View>
      <View className='p-2 bg-white my-1 rounded-md'>
        <Text className='text-base font-medium'>Total Days : {leaveItem?.days}</Text>
        <Text className='text-base font-light'>From : {leaveItem?.from?.slice(0, 10)}</Text>
        <Text className='text-base font-light'>To : {leaveItem?.to?.slice(0, 10)}</Text>
      </View>
      <View className='p-2 bg-white my-1 rounded-md'>
        <Text className='text-base font-medium'>Employee Detail</Text>
        <Text className='text-base font-light'>Employee Id : {leaveItem?.userId?._id}</Text>
        <Text className='text-base font-light'>Employee Name : {leaveItem?.userId?.name}</Text>
        <Text className='text-base font-light'>Employee Email : {leaveItem?.userId?.email}</Text>
      </View>
      <View className='p-2 bg-white my-1 rounded-md'>
        <Text className='text-base font-medium'>Application Status</Text>
        <Text
          style={{
            backgroundColor: getStatusColor(leaveItem?.status)
          }}
          className='text-base text-center my-1 rounded-lg p-1 text-white font-light'
        >
          {leaveItem?.status}
        </Text>
      </View>
      <View className=''>
        {leaveItem?.status === "Pending" ? (
          <ApproveLeave itemId={leaveItem?._id} />
        ) : (
          <>
            <View className='p-2 bg-white my-1 rounded-md'>
              <Text className='text-base font-medium'>{leaveItem.status} on {leaveItem.ApprovedOn} by</Text>
              <Text className='text-base font-light'>Admin Name : {leaveItem?.approvedBy?.name}</Text>
              <Text className='text-base font-light'>Admin Email : {leaveItem?.approvedBy?.email}</Text>
            </View>
            <View className='p-2 bg-white my-1 rounded-md'>
              <Text className='text-base font-medium'>Remark</Text>
              <Text className='text-base font-light'>{leaveItem?.remark}</Text> 
            </View>
          </>
        )}
      </View>
    </Container>
  );
}

export default LeaveId;