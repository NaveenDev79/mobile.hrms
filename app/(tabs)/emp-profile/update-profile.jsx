import {View, Text, Image, Alert} from 'react-native' ;
import {Container} from '../../../components/Layout';
import {NavigateToBack} from '../../../components/Utils';
import { useState } from 'react';
import profileImg from '../../../assets/icons/profile.png';
import { InputField, showSuccess } from '../../../components/Inputs';
import { ActionButtons } from '../../../components/Buttons';
import { router, useRouter } from 'expo-router';


const UpdateProfile = () => {

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
    setEmployee({
        ...employee,
        [name]: value
    });
};

const router = useRouter();
    return (
        <Container classes='flex-1 min-h-screen py-4 pb-16 px-2'>
            <NavigateToBack title='update profile'/>
            <View className='mx-auto mb-4'>
                <Image
                    className="w-36 h-36 rounded-full"
                    source={employee.image || profileImg}
                    alt="user profile"/>
            </View>
            <InputField title='Full Name' name='fullName' value={employee.fullName} onInputChange={handleInputChange}/>
            <InputField title='Email' name='email' value={employee.email} onInputChange={handleInputChange}/>
            <InputField title='Phone No.:' name='phone' value={employee.phone} onInputChange={handleInputChange}/>
           <InputField title='Birth date :' name='DOB' value={employee.DOB} onInputChange={handleInputChange}/>
            <InputField
                title='Department'
                name='department'
                value={employee.department}
                onInputChange={handleInputChange}/>
            <InputField
                title='Designation'
                name='designation'
                value={employee.designation}
                onInputChange={handleInputChange}/>
            <InputField title='Address' name='address' value={employee.address} onInputChange={handleInputChange}/>
            <ActionButtons
                changeHandler={() => {
                  showSuccess(()=>{
                    console.log(employee)
                    router.push('emp-profile/Profile')
                  })
            }}
                textClasses='p-2 text-base text-white text-center'
                classes='my-1 rounded-md'
                title='Update'/> 

        </Container>
    )
}

export default UpdateProfile