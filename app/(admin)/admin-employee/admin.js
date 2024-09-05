import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeadAdminLayout from '../../../components/layout/Layout';
import { NavigateBack } from '../../../components/admin/Utils';
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import { useRouter } from 'expo-router';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const token = useSelector((state) => state.auth.token);

  async function fetchAdmins() {
    try {
      const { data } = await axios.get('/auth/all-admin', {
        headers: { token },
      });
      setAdmins(data.data);
    } catch (error) {
      console.error('Error fetching admins:', error.message);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <HeadAdminLayout>
      <NavigateBack title='Verify Admin Section' /> 
      {admins.map((admin) => (
        <Compo item={admin} key={admin._id} />
      ))}
    </HeadAdminLayout>
  );
};

const Compo = ({ item }) => {

  const token = useSelector((state) => state.auth.token);
  const router = useRouter()

  const handleVerify=async(id,type)=>{  

    try {
      const {data} = await axios.post(`/auth/admin/${type}`,{id},{
        headers:{
          token:token
        }
      });
  
      if(data.success){
        Alert.alert(data.message);
        router.push('/admin-employee/employee')
      }else{
        Alert.alert('Error! Try later')
      }
      
    } catch (error) {
      console.log(error.message);
      
    }
    
    

  }
  return (
    <View className='my-1 mx-2 '>
      <View className="bg-neutral-300 rounded-md p-2">
        <Text className="font-medium text-base">Name: <Text className="text-base font-light">{item?.name}</Text></Text>
        <Text className="font-medium text-base">Email: <Text className="text-base font-light">{item?.email}</Text></Text>
        <Text className="font-medium text-base">Joined: <Text className="text-base font-light">{item?.createdAt.slice(0,10)}</Text></Text>
        {
          item?.isVerified ? (<>
          <Text className="font-medium  bg-green-700 p-2 my-1 text-white text-center  w-1/2  text-base">Status: Verified</Text>
          </>) : (<>
          <Text className="font-medium  bg-orange-500 p-2 my-1 text-white text-center  w-1/2  text-base">Status: Blocked</Text>
          </>)
        }
        <Text className="font-medium text-base">Action Button</Text>
        

        <View>
        {
          item?.isVerified ? (<View>
            <TouchableOpacity className="bg-orange-600 p-2 mt-1 rounded-md" onPress={()=>handleVerify(item._id,'block')}>
          <Text className="text-center text-white p-2 font-medium text-base">Block</Text>
          </TouchableOpacity>
          </View>) : (<View>
          <TouchableOpacity className="bg-green-600 p-2 mt-1 rounded-md" onPress={()=>handleVerify(item._id,'verify')}>
          <Text className=" text-center text-white p-2 font-medium text-base">Verify</Text>
          </TouchableOpacity>
          </View>)
        }
        </View>

      </View>
    </View>
  );
};

export default Admin;
