import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeadAdminLayout from '../../../components/layout/Layout'
import { NavigateBack } from '../../../components/admin/Utils';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';
import { useLocalSearchParams } from 'expo-router';

const Attendence = () => {

  const { id } = useLocalSearchParams();

  const [attendance,
    setAttendance] = useState([]);
const {token} = useSelector((state) => state.auth);

useEffect(() => {
    async function fetchAttendance() {
        try {
            const {data} = await axios.get(`/attendence/month/${id}`, {
                headers: {
                    token: token
                }
            });

            if (data.success) {
                setAttendance(data.data);
            } else {
                Alert.alert('No Data', 'No attendance data found for the current month.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    fetchAttendance();
}, [token,id]);

const markedDates = attendance.reduce((acc, item) => {
  // Convert date format from "MM/DD/YYYY" to "YYYY-MM-DD"
  const [month, day, year] = item.date.split('/');
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; 
  acc[formattedDate] = {
      selected: true, 
      selectedColor: 'blue',
  };
  return acc;
}, {});
  return (
    <HeadAdminLayout>
            <NavigateBack title='Employee Attendence'/>
            {/* Monthly attendence */}
            <View>
                {attendance.length === 0
                    ? (
                        <Text>No data to show</Text>
                    )
                    : (<Calendar
                        monthFormat={'MM/dd/yyyy'} 
                        disableArrowLeft={true}
                        disableArrowRight={true}
                        markedDates={markedDates}

                       />)}
            </View>

        </HeadAdminLayout>
  )
}

export default Attendence