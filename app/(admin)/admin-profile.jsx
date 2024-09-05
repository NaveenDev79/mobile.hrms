import HeadAdminLayout from '../../components/layout/Layout';
import {View, Alert, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'expo-router';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActionButtons} from '../../components/Buttons';
import {InputField} from '../../components/Inputs';
import Header from '../../components/admin/Utils'; 


const AdminProfile = () => {

    const [employee,
        setEmployee] = useState({});

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const userId = user
        ?._id;

    const fetchEmployee = async() => {
        try {
            const {data} = await axios.get(`/employee/${userId}`, {headers: {
                    token
                }});

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
        <HeadAdminLayout bg='#F4F6F9'>
                        <Header title='Home' />

            <View className="p-2">
            <InputField
                title='Full Name'
                name='fullName'
                value={employee
                ?.name}
                read/>
            <InputField
                title='Email'
                name='email'
                value={employee
                ?.email}
                read/>
            <InputField
                title='Joining date :'
                name='DOJ'
                value={employee
                ?.DOJ
                    ?.slice(0, 10)}
                read/>
            <ActionButtons
                bg="#F6741B"
                textClasses='p-2 text-base text-white text-center'
                classes='my-1 rounded-md'
                title='Logout'
                changeHandler={async() => {
                const savedUser = await AsyncStorage.clear();
                router.replace('/');
            }}/>
            </View>
        </HeadAdminLayout>
    )
}

export default AdminProfile