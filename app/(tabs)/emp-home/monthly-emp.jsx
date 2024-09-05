import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container} from '../../../components/Layout';
import {NavigateToBack} from '../../../components/Utils';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';

const MonthlyEmp = () => {
    const [attendance,
        setAttendance] = useState([]);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        async function fetchAttendance() {
            try {
                const {data} = await axios.get('/attendence/month', {
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
        <Container classes="flex-1 min-h-screen py-4 pb-16 px-2">
            <NavigateToBack title="Current Monthly Report"/>
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
        </Container>
    );
};

export default MonthlyEmp;
