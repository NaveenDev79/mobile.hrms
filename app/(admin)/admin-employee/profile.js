import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeadAdminLayout from '../../../components/layout/Layout';
import {NavigateBack} from '../../../components/admin/Utils';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useSelector} from 'react-redux';
import {ActionButtons} from '../../../components/Buttons';
import {InputField} from '../../../components/Inputs';
import axios from 'axios';

const Profile = () => {
    const {id} = useLocalSearchParams();
    const [employee,
        setEmployee] = useState({
        fullName: "",
        email: "",
        phone: "",
        DOB: "",
        DOJ: "",
        department: "",
        designation: "",
        salary: "",
        address: ""
    });
    const router = useRouter()

    const token = useSelector((state) => state.auth.token);

    const fetchEmployee = async() => {
        try {
            const {data} = await axios.get(`/employee/${id}`, {headers: {
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
        if (id) {
            fetchEmployee();
        }
    }, [id]);

    const handleInputChange = (name, value) => {
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleUpdateProfile = async() => {
        try {
            const {data} = await axios.put(`/employee/${id}`, {
                department: employee.department,
                designation: employee.designation,
                salary: employee.salary
            }, {headers: {
                    token
                }});

            if (data.success) {
                Alert.alert('Success', 'Profile updated successfully.', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/admin-employee/employee')
                    }
                ]);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <HeadAdminLayout>
            <NavigateBack title='Employee Profile'/> 
            <View>
                <InputField
                    title='Designation'
                    name='designation'
                    onInputChange={handleInputChange}
                    value={employee
                    ?.designation}/>
                <InputField
                    title='Department'
                    name='department'
                    onInputChange={handleInputChange}
                    value={employee
                    ?.department}/>
                <InputField
                    title='Salary'
                    name='salary'
                    onInputChange={handleInputChange}
                    value={employee
                    ?.salary}/>
                <ActionButtons
                    changeHandler={handleUpdateProfile}
                    textClasses='p-2 text-base text-white text-center'
                    classes='my-1 rounded-md bg-blue-500'
                    title='Update'/>
            </View>
        </HeadAdminLayout>
    );
};

export default Profile;
