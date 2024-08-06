import {Image, View} from 'react-native';
import React, {useState} from 'react'; 
import profileImg from '../../../assets/icons/profile.png';
import TopLayout from '../../../components/employee/TopLayout';
import {ActionButtons} from '../../../components/Buttons';
import {useRouter} from 'expo-router';
import {InputField} from '../../../components/Inputs';

const Profile = () => {
    const [employee,
        setEmployee] = useState({
        image:"",
        fullName: "Muhammad",
        email: "",
        phone: "",
        DOB: "",
        DOJ: "",
        department: "",
        designation: "",
        salary: "",
        address: ""

    });

    const handleInputChange = (name, value) => {
        setLeaveData({
            ...leaveData,
            [name]: value
        });
    };
    const router = useRouter();
    return (
        <TopLayout title='Profile'>
            <View className='mx-auto mb-4'>
                <Image
                    className="w-36 h-36 rounded-full"
                    source={employee.image || profileImg}
                    alt="user profile"/>
            </View>
            <InputField title='Full Name' name='fullName' value={employee.fullName} read/>
            <InputField title='Email' name='email' value={employee.email} read/>
            <InputField title='Phone No.:' name='phone' value={employee.phone} read/>
            <InputField title='Joining date :' name='DOJ' value={employee.DOJ} read/>
            <InputField title='Birth date :' name='DOB' value={employee.DOB} read/>
            <InputField
                title='Department'
                name='department'
                value={employee.department}
                read/>
            <InputField
                title='Designation'
                name='designation'
                value={employee.designation}
                read/>
            <InputField title='Salary' name='salary' value={employee.salary} read/>
            <InputField title='Address' name='address' value={employee.address} read/>
            <ActionButtons
                changeHandler={() => {
                router.push('emp-profile/update-profile')
            }}
                textClasses='p-2 text-base text-white text-center'
                classes='my-1 rounded-md'
                title='Update Profile'/>
            <ActionButtons
            bg="#F6741B"
                textClasses='p-2 text-base text-white text-center'
                classes=' my-1 rounded-md'
                title='Logout'/>
        </TopLayout>
    );
};

export default Profile;

// <Image className="w-36 h-36 rounded-full" source={profileImg} alt="user
// profile" />