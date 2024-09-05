import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container } from '../../../components/Layout';
import { NavigateToBack } from '../../../components/Utils';
import { useSelector } from 'react-redux';
import axios from 'axios';
 
const RefundId = () => { 
  const router = useRouter();
  const { refundId } = useLocalSearchParams();
  const token = useSelector((state) => state.auth.token);
  const [refund, setRefund] = useState({});

  const fetchRefund = async () => {
    try {
      const { data } = await axios.get(`/refund/${refundId}`, {
        headers: {
          token,
        },
      }); 
      

      if (data.success) {
        setRefund(data.data);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchRefund();
  }, [refundId]);

  return (
    <Container classes='flex-1 p-4 min-h-screen'>
      <NavigateToBack title='Reimbursement Status' />
      <View className="p-2 bg-sky-200 mt-2 rounded-sm">
        <Text className="text-base font-light">Title: {refund.title}</Text>
        <Text className="text-base font-light">For: {refund.desc}</Text>
        <Text className="text-base font-medium">Total Amount: {refund.amount}</Text>
      </View>
      <View className="p-2 bg-sky-200 mt-2 rounded-sm">
        <Text className="text-base font-light">Applied on: {refund.AppliedOn?.slice(0, 10)}</Text>
        <Text className="text-base font-light">Applied By: {refund.userId?.name}</Text>
      </View>
      <View className="p-2 bg-sky-200 mt-2 rounded-sm">
        <Text className="text-base font-light">Current Status: {refund.status}</Text>
      </View>
      <View className="p-2 bg-sky-200 mt-2 rounded-sm">
        <Text className="text-base font-medium">Employee Details</Text>
        <Text className="text-base font-light">Employee Name: {refund.userId?.name}</Text>
        <Text className="text-base font-light">Employee Email: {refund.userId?.email}</Text>
      </View>
      {refund.status === 'Pending' ? (
        <Text></Text>
      ) : (
        <>
        <View className="p-2 bg-sky-200 mt-2 rounded-sm">
          <Text className="text-base font-light">Approved on: {refund.ApprovedOn?.slice(0, 10)}</Text>
          <Text className="text-base font-light">Approved by Admin: {refund.ApprovedBy?.name}</Text>
          <Text className="text-base font-light">Admin email: {refund.ApprovedBy?.email}</Text>
        </View>
        <View className="p-2 bg-sky-200 mt-2 rounded-sm">
          <Text className="text-base font-medium">Remark</Text>
          <Text className="text-base font-light">{refund.remark}</Text>
         </View>
        </>
      )}
    </Container>
  );
}

export default RefundId;