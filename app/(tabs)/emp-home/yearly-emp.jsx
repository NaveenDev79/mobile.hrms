import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container} from '../../../components/Layout';
import {NavigateToBack} from '../../../components/Utils';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';

const YearlyEmp = () => {
    const [attendance,
        setAttendance] = useState([]);
    const {token,user} = useSelector((state) => state.auth);
    const dateOfJoining = user?.DOJ?.slice(0,10);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0'); 
    const formattedDate = `${year}-${month}-${day}`; 

    

    useEffect(() => {
        async function fetchAttendance() {
            try {
                const {data} = await axios.get('/attendence/all', {
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
    }, [token]);

    const markedDates = attendance.reduce((acc, item) => {
        const [month, day, year] = item.date.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; 
        acc[formattedDate] = {
            selected: true, 
            selectedColor: 'blue',
        };
        return acc;
    }, {}); 

    
 
   

    return (
        <Container classes="flex-1 min-h-screen py-4 pb-16 px-2">
            <NavigateToBack title="Annual Report"/>
            <View>
                {attendance.length === 0
                    ? (
                        <Text>No data to show</Text>
                    )
                    : (<Calendar
                        monthFormat={'MM/dd/yyyy'} 
                        markedDates={markedDates}
                        minDate={dateOfJoining} 
                        maxDate={formattedDate}
                       />)}
            </View>
        </Container>
    );
};

export default YearlyEmp;
