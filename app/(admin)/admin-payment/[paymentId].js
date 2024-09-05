import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeadAdminLayout from '../../../components/layout/Layout';
import { NavigateBack } from '../../../components/admin/Utils';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PaymentId = () => {
  const [refund, setRefund] = useState({});
  const router = useRouter();
  const { paymentId } = useLocalSearchParams();
  const token = useSelector((state) => state.auth.token);

  const fetchRefund = async () => {
    try {
      const { data } = await axios.get(`/refund/${paymentId}`, {
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
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchRefund();
  }, [paymentId]);

  return (
    <HeadAdminLayout>
      <NavigateBack title="Refund Application" />
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
        <ApprovedRefund itemId={refund._id} />
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
    </HeadAdminLayout>
  );
};

export default PaymentId;

const ApprovedRefund = ({ itemId }) => {
  const [Refund, setRefund] = useState({
    status: 'Approved',
    remark: '',
  });
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  async function StatusHandler() {
    const resData = {
      ...Refund,
      ApprovedOn: new Date().toISOString(),  
      ApprovedBy: user?._id,
    };
 

    if (Refund.status !== 'Approved' && Refund.status !== 'Rejected') {
      Alert.alert('Status can only be Approved or Rejected');
      return;
    }

    try {
      const { data } = await axios.put(`/refund/${itemId}`, resData, {
        headers: {
          token,
        },
      });
      if (data.success) {
        Alert.alert(data.message);
        router.push('admin-payment/payment');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View className="p-2 bg-sky-200 mt-2 rounded-sm">
      <Text className="text-base font-light">Refund Approval</Text>
      <View className="my-1">
        <Text className="text-base font-light">Status</Text>
        <Text className="text-[10px] italic">Status can only be Approved or Rejected</Text>
        <TextInput
          className="my-1 p-2 bg-slate-200 rounded-md"
          value={Refund.status}
          onChangeText={(text) => {
            setRefund({
              ...Refund,
              status: text,
            });
          }}
          placeholder="Enter the status"
        />
        <TextInput
          className="my-1 p-2 bg-slate-200 rounded-md"
          placeholder="Any Remark"
          onChangeText={(text) => {
            setRefund({
              ...Refund,
              remark: text,
            });
          }}
        />
        <TouchableOpacity onPress={StatusHandler} className="bg-sky-400 rounded-lg p-2">
          <Text className="text-base text-white text-center">{Refund.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
