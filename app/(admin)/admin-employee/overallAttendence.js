import {View, Text, Alert, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import HeadAdminLayout from '../../../components/layout/Layout'
import { NavigateBack } from '../../../components/admin/Utils';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';
import { useLocalSearchParams } from 'expo-router';
import {Picker} from '@react-native-picker/picker';


const overallAttendence = () => {
  const { id } = useLocalSearchParams();

  const [attendance,
    setAttendance] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState('');
const {token} = useSelector((state) => state.auth);

useEffect(() => {
    async function fetchAttendance() {
        try {
            const {data} = await axios.get(`/attendence/all/${id}`, {
                headers: {
                    token: token
                }
            });

            if (data.success) {
                setAttendance(data.data);
                if (data.data.length > 0) {
                  // Set the initial selected month to the first available month in data
                  const firstMonthYear = getMonthYear(data.data[0].date);
                  setSelectedMonth(firstMonthYear);
                }
            } else {
                Alert.alert('No Data', 'No attendance data found for the current month.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    fetchAttendance();
}, [token,id]);

const getMonthYear = (dateString) => {
  const [month, , year] = dateString.split('/');
  return `${month}-${year}`;
};


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
 


// Function to group attendance data by month-year
const groupAttendanceByMonthYear = (data) => {
  return data.reduce((result, item) => {
    const [month, day, year] = item.date.split('/');
    const monthYear = `${month}-${year}`;

    if (!result[monthYear]) {
      result[monthYear] = [];
    }

    result[monthYear].push(item);
    return result;
  }, {});
};

const groupedAttendance = groupAttendanceByMonthYear(attendance);
 


  return (
    <HeadAdminLayout>
    <NavigateBack title="Employee Overall" />
    <View>
      {attendance.length === 0 ? (
        <Text>No data to show</Text>
      ) : (
        <Calendar
          monthFormat={'MM/dd/yyyy'}  
          markedDates={markedDates}
        />
      )}
    </View>

    <View className="mt-4">
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
      >
        {Object.keys(groupedAttendance).map((monthYear) => (
          <Picker.Item key={monthYear} label={monthYear} value={monthYear} />
        ))}
      </Picker>

      <ScrollView className="mt-4">
        {groupedAttendance[selectedMonth] && groupedAttendance[selectedMonth].map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center p-2 border-b border-gray-300"
          >
            <Text className="text-sm text-gray-800">{item.date}</Text>
            <Text className="text-[10px] text-gray-800">
              Check-In: {item?.checkinTime || 'N/A'}
            </Text>
            <Text className="text-[10px] text-gray-800">
              Check-Out: {item?.checkoutTime || 'N/A'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  </HeadAdminLayout>
  )
}

export default overallAttendence