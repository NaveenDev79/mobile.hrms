import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeMessage, {Attendence, HomeBottom, HomeHeading} from '../../components/HomeTop';
import PageLayout from '../../components/common/layout';
import TopLayout from '../../components/employee/TopLayout';
const HomeScreen = () => {

    return (
        <TopLayout bg='#3399' title='Home tab'> 
                <HomeHeading/>
                <HomeMessage/>
                <Attendence/>
                <HomeBottom/> 
        </TopLayout>
    )
}

export default HomeScreen
