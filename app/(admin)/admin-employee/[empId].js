import HeadAdminLayout from '../../../components/layout/Layout';
import {NavigateBack} from '../../../components/admin/Utils';
import {router, useLocalSearchParams} from 'expo-router';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Image, Text, View, Alert} from 'react-native';
import profileImage from '../../../assets/icons/profile.png';
import { ActionButton } from '../../../components/admin/admin.Button';

const EmployeeId = () => {
    const {empId} = useLocalSearchParams();
    const [employee, setEmployee] = useState([]);
    const {token,user} = useSelector((state) => state.auth);

    const fetchEmployee = async () => {
        try {
            const {data} = await axios.get(`/employee/${empId}`, {
                headers: {
                    token
                }
            });

            if (data.success) {
                setEmployee(data.data); 
                
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [empId]);

    return (
        <HeadAdminLayout>
            <NavigateBack title='Employee Detail'/>
           
            <View className=''>
                <View className="bg-white shadow rounded-lg p-4 my-1">
                    <Text className="text-lg font-semibold">Employee Id: {employee?._id}</Text>
                </View>

                <View className="bg-white shadow rounded-lg p-4 my-1 flex-row items-center">
                    <View className='w-28 h-28 rounded-full overflow-hidden bg-gray-100'>
                        <Image className="w-full h-full" source={employee?.img ? {uri:employee?.img} : profileImage} resizeMode='cover'/>
                    </View>
                    <View className='ml-4'>
                        <Text className="text-xl font-bold">{employee?.name}</Text>
                        <Text className="text-gray-500">{employee?.email}</Text>
                    </View>
                </View>

                {/* Professional Details */}
                <View className="bg-white shadow rounded-lg p-4 my-1">
                    <Text className="text-lg font-semibold my-1">Professional Details</Text>
                    <Text><Text className="font-semibold">Date of Joining:</Text> {employee?.DOJ?.slice(0,10) }</Text>
                    <Text><Text className="font-semibold">Salary:</Text> {employee?.salary}</Text>
                    <Text><Text className="font-semibold">Department:</Text> {employee?.department}</Text>
                    <Text><Text className="font-semibold">Designation:</Text> {employee?.designation}</Text>
                </View>

                {/* Personal Details */}
                <View className="bg-white shadow rounded-lg my-1 p-4">
                    <Text className="text-lg font-semibold my-1">Personal Details</Text>
                    <Text><Text className="font-semibold">Phone:</Text> {employee?.phone}</Text>
                    <Text><Text className="font-semibold">Email:</Text> {employee?.email}</Text>
                    <Text><Text className="font-semibold">Address:</Text> {employee?.address}</Text>
                </View>
                {/* Actoin tab */}
                <View className="bg-white shadow rounded-lg my-1 p-4">
                    <Text className="text-lg font-semibold my-1">Action Section</Text>
                    <ActionButton bg='#65A30D' onHandle={()=>{router.push({pathname:'/admin-employee/profile',
                    params:{
                        id:employee?.userId
                    }})}} title='Update Profile'/>
                    <ActionButton bg='#65A30D' onHandle={()=>{router.push({pathname:'/admin-employee/attendence',
                    params:{
                        id:employee?.userId
                    }})}} title='Monthly Attendance Report'/>
                    <ActionButton bg='#65A30D' onHandle={()=>{router.push({pathname:'/admin-employee/leave',
                    params:{
                        id:employee?.userId
                    }})}} title='Leave'/>
                    <ActionButton bg='#65A30D' onHandle={()=>{router.push({pathname:'/admin-employee/refund',
                    params:{
                        id:employee?.userId
                    }})}} title='Reimburstment'/>
                    <ActionButton bg='#65A30D' onHandle={()=>{router.push({pathname:'/admin-employee/overallAttendence',
                    params:{
                        id:employee?.userId
                    }})}} title='Overall Attendance Report'/>
                </View>
            </View>
        </HeadAdminLayout>
    )
}

export default EmployeeId;
