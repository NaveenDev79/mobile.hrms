import {View, Text, Alert, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import HeadAdminLayout from '../../../components/layout/Layout'
import Header from '../../../components/admin/Utils'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import { useRouter } from 'expo-router'

const AdminEmployee = () => {
    const [employees,
        setEmployees] = useState([]);
    const {token,user} = useSelector((state) => state.auth);
    const router  = useRouter()
    const fetchEmployees = async() => {
        try {
            const {data} = await axios.get(`/employee/get/all`, {headers: {
                    token
                }});

            if (data.success) {
                setEmployees(data.data);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
    useEffect(() => {
        fetchEmployees();
    }, []);
    return (
        <HeadAdminLayout bg='#F4F6F9'>
            <Header title='All Employees'/>
            {/* Admin */}
           {user.role == "Admin" && <View className="p-2">
                <TouchableOpacity onPress={()=>router.push('/admin-employee/admin')} className="bg-sky-500 rounded-md p-2 h-12">
                    <Text className="text-xl text-white text-center font-medium">Head to Admin section</Text>
                </TouchableOpacity>
            </View>}

            {/* Employee */}
            <AllEmployees data={employees}/>

        </HeadAdminLayout>
    )
}

export default AdminEmployee

const AllEmployees = ({data}) => {
    return (
        <View className='p-2'>
            {data.map((item, index) =>< Employee index = {
                index
            }
            key = {
                item._id
            }
            employee = {
                item
            } />)}
        </View>
    )

}

const Employee = ({employee, index}) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={()=>{router.push(`admin-employee/${employee._id}`)}}>
            <View className='p-2 mt-2 rounded-md bg-white'>
            <View className='flex flex-row items-center justify-between'>
                <Text className="text-sm font-medium">
                    id: {employee._id}
                </Text>
                <Text className="p-1 w-7 h-7 text-center bg-slate-800 text-white rounded-full inline-block">
                {index + 1}
            </Text>

            </View>
            <View className=''>
            <Text className="text-base font-medium">
                    Employee Name: {employee.name}
                </Text>
                <Text className="text-base font-light">
                    Email: {employee.email}
                </Text>
                

            </View>
        </View>
        </TouchableOpacity>
    );
};
