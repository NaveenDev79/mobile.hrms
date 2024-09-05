import { Image, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'; 
import profileImg from '../../../assets/icons/profile.png';
import TopLayout from '../../../components/employee/TopLayout';
import { ActionButtons } from '../../../components/Buttons';
import { useRouter } from 'expo-router';
import { InputField } from '../../../components/Inputs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile = () => {
    const [employee, setEmployee] = useState({});

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user); 
    const userId = user?._id; 
    

    const fetchEmployee = async () => {
        try {
            const { data } = await axios.get(`/employee/${userId}`, {
                headers: { token }
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
        if (userId) {
            fetchEmployee();
        }
    }, [userId]);
 

    const router = useRouter();
    return (
        <TopLayout title='Profile'>
            <View className='mx-auto mb-4'>
                <Image
                    className="w-36 h-36 rounded-full"
                    source={employee?.image ? { uri: employee.image } : profileImg}
                    alt="user profile"
                />
            </View>
            <InputField title='Full Name' name='fullName' value={employee?.name} read />
            <InputField title='Email' name='email' value={employee?.email} read />
            <InputField title='Phone No.:' name='phone' value={employee?.phone} read />
            <InputField title='Joining date :' name='DOJ' value={employee?.DOJ?.slice(0,10)} read />
            <InputField title='Birth date :' name='DOB' value={employee?.DOB?.slice(0,10)} read />
            <InputField title='Department' name='department' value={employee?.department} read />
            <InputField title='Designation' name='designation' value={employee?.designation} read />
            <InputField title='Salary' name='salary' value={employee?.salary} read />
            <InputField title='Address' name='address' value={employee?.address} read />
            <ActionButtons
                changeHandler={() => {
                    router.push('emp-profile/update-profile');
                }}
                textClasses='p-2 text-base text-white text-center'
                classes='my-1 rounded-md'
                title='Update Profile'
            />
            <ActionButtons
                bg="#F6741B"
                textClasses='p-2 text-base text-white text-center'
                classes='my-1 rounded-md'
                title='Logout'
                changeHandler={async() => {
                    const savedUser = await AsyncStorage.clear();
                    router.replace('/');
                }}
            />
        </TopLayout>
    );
};

export default Profile;
