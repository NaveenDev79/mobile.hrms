import React, {useEffect} from 'react';
import TopLayout from '../../../components/employee/TopLayout';
import {useSelector, useDispatch} from 'react-redux';
import {AttendanceComponent2, EmployeeHomeTop, HomeInfo, LeaveReport} from '../../../components/employee/employee.home'; 

const HomeScreen = () => {

    const {user, token} = useSelector((state) => state.auth); 
    const attendence = useSelector((state) => state.attendence);
    console.log(user);
    console.log(token);
    
    
    return (
        <TopLayout title='Home tab'>
            <EmployeeHomeTop user={user}/>
            <HomeInfo
                title='welcome message'
                message='Welcome to HRMS.Your journey with us begins now. Welcome to the team! 🌟'/>
            <AttendanceComponent2/>
            <LeaveReport/>
        </TopLayout>
    )
}

export default HomeScreen
