import {View, Text, Image, Button,Alert} from 'react-native';
import {Container} from '../../../components/Layout';
import {NavigateToBack} from '../../../components/Utils';
import {useCallback, useEffect, useState} from 'react';
// import profileImg from '../../../assets/icons/profile.png';
import {InputField, showSuccess} from '../../../components/Inputs';
import {ActionButtons} from '../../../components/Buttons'; 
import axios from 'axios';
import { useSelector } from 'react-redux';  
// import ImageUpload from '../../../components/common/UploadImage';

const UpdateProfile = () => {  
    const [employee,
        setEmployee] = useState({
        image: Image,
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

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const userId = user?._id; 

    const fetchEmployee = async() => {
        try {
            const {data} = await axios.get(`/employee/${userId}`, {
                headers: {
                    token: token
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
        if (userId) {
            fetchEmployee();
        }
    }, [userId]);

    const handleInputChange = (name, value) => {
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleUpdateProfile = async() => { 
        
        try {
            const {data} = await axios.put(`/employee/${userId}`, employee, {
                headers: {
                    token
                }
            });

            if (data.success) {
                showSuccess(() => {
                    router.push('emp-profile/Profile');
                });
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    // Use useCallback to memoize the callback function
    const handleImageSelected = useCallback((newImageUrl) => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            image: newImageUrl,
        }));
    }, []);

    return (
        <Container classes='flex-1 min-h-screen py-4 pb-16 px-2'>
            <NavigateToBack title='Update Profile'/>
            {/* <View className='mx-auto mb-4'>
                <Image
                    className="w-36 h-36 rounded-full"
                    source={employee.image
                    ? {
                        uri: employee.image
                    }
                    : profileImg}
                    alt="user profile"/>
            </View> */}
            {/* <ImageUpload onImageSelected={handleImageSelected}/> */}
           
            <InputField
                title='Full Name'
                name='name'
                value={employee.name}
                onInputChange={handleInputChange}/>
            <InputField
                title='Email'
                name='email'
                value={employee.email}
                onInputChange={handleInputChange}/>
            <InputField
                title='Phone No.:'
                name='phone'
                value={employee.phone}
                onInputChange={handleInputChange}/>
            <InputField
                title='Birth date :'
                name='DOB'
                value={employee.DOB}
                onInputChange={handleInputChange}/> 
            <InputField
                title='Address'
                name='address'
                value={employee.address}
                onInputChange={handleInputChange}/>
            <ActionButtons
                changeHandler={handleUpdateProfile}
                textClasses='p-2 text-base text-white text-center'
                classes='my-1 rounded-md'
                title='Update'/>
        </Container>
    );
};

export default UpdateProfile;


 