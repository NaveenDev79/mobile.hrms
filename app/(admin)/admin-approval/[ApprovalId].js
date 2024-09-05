import {View, Text, Alert, TextInput, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams, useRouter} from 'expo-router'
import HeadAdminLayout from '../../../components/layout/Layout';
import {NavigateBack} from '../../../components/admin/Utils';
import axios from 'axios';
import {useSelector} from 'react-redux';

const ApprovalId = () => {
    const [leaveItem,
        setleaveItem] = useState({}) 
    const {ApprovalId} = useLocalSearchParams();
    const token = useSelector((state) => state.auth.token);

    const fetchLeave = async() => {
        try {
            const {data} = await axios.get(`/leave/${ApprovalId}`, {headers: {
                    token
                }});

            if (data.success) {
                setleaveItem(data.data);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        fetchLeave();
    }, [ApprovalId]);

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
        <HeadAdminLayout>
            <NavigateBack title='Leave Application'/>
            <View className='p-2 bg-white my-1 rounded-md'>
                <Text className='text-base font-medium'>Type : {leaveItem
                        ?.type}</Text>
                <Text className='text-base font-normal'>Reason : {leaveItem
                        ?.cause}</Text>
            </View>
            <View className='p-2 bg-white my-1 rounded-md'>
                <Text className='text-base font-medium'>Total Days : {leaveItem
                        ?.days}</Text>
                <Text className='text-base font-light'>From : {leaveItem
                        ?.from
                            ?.slice(0, 10)}</Text>
                <Text className='text-base font-light'>TO : {leaveItem
                        ?.to
                            ?.slice(0, 10)}</Text>
            </View>
            <View className='p-2 bg-white my-1 rounded-md'>
                <Text className='text-base font-medium'>Employee Detail</Text>
                <Text className='text-base font-light'>Employee Id : {leaveItem
                        ?.userId
                            ?._id}</Text>
                <Text className='text-base font-light'>Employee Name : {leaveItem
                        ?.userId
                            ?.name}</Text>
                <Text className='text-base font-light'>Employee Email : {leaveItem
                        ?.userId
                            ?.email}</Text>
            </View>
            <View className='p-2 bg-white my-1 rounded-md'>
                <Text className='text-base font-medium'>Application Status</Text>
                <Text
                    style={{
                    backgroundColor: getStatusColor(leaveItem
                        ?.status)
                }}
                    className='text-base text-center my-1 rounded-lg p-1 text-white font-light'>
                    {leaveItem
                        ?.status}
                </Text>
            </View>
            <View className=''>
                {leaveItem
                    ?.status == "Pending"
                        ?(<ApproveLeave itemId={leaveItem?._id}/>) 
                        : (<>
                          <View className='p-2 bg-white my-1 rounded-md'>
                <Text className='text-base font-medium'>{leaveItem.status} on {leaveItem.ApprovedOn} by</Text>
                <Text className='text-base font-light'>Admin Name : {leaveItem
                        ?.approvedBy
                            ?.name}</Text>
                <Text className='text-base font-light'>Admin Email : {leaveItem
                        ?.approvedBy
                            ?.email}</Text>
            </View>
            <View className='p-2 bg-white my-1 rounded-md'>
                <Text className='text-base font-medium'>Remark</Text>
                <Text className='text-base font-light'>{leaveItem
                        ?.remark}</Text> 
            </View>
                        </>)
}
            </View>

        </HeadAdminLayout>
    )
}

export default ApprovalId


const ApproveLeave=({itemId})=>{
  const [Approve, setApprove] = useState({
    status:"Approved",
    remark:""
  });
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();


  async function StatusHandler() {  
    

    if(Approve.status != "Approved" && Approve.status != "Rejected"){
      Alert.alert('Status can only be Approved or Rejected');
      return;
    }

    const resData = {...Approve,ApprovedOn:new Date().now, approvedBy:user?._id};
    try {
      const {data} = await axios.put(`/leave/${itemId}`, resData,{headers: {
              token
          }});
      if (data.success) { 
        
          Alert.alert(data.message);
          router.push('admin-approval/approval')
      } else {
          Alert.alert('Error', data.message);
      }
  } catch (error) {
      Alert.alert('Error', error.message);
  }
    
    
  }
  return(
    <View className='p-2 my-2 rounded-md bg-white'>
      <Text className='text-base font-medium '>Approve Leave</Text>
      <View className='my-1'>
        <Text className='text-base font-light'>Status</Text>
        <Text className='text-[10px] italic'>status can only be Approved or Rejected</Text>
        <TextInput  className="my-1 p-2 bg-slate-200 rounded-md" value={Approve.status} onChangeText={(text)=>{
          setApprove({
            ...Approve,
            status:text
          })
        }} placeholder='Enter the status' />
        <TextInput  className="my-1 p-2 bg-slate-200 rounded-md" placeholder='Any Remark' onChangeText={(text)=>{
          setApprove({
            ...Approve,
            remark:text
          })
        }} />
        <TouchableOpacity onPress={StatusHandler} className="bg-sky-400 rounded-lg p-2">
          <Text className='text-base text-white text-center'>{Approve.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
} 
