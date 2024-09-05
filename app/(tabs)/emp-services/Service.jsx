import { View} from 'react-native';
import React from 'react'; 
import ServiceCard, { TempServiceCard } from '../../../components/employee/ServiceCard';
import {images} from '../../../constants/index';
import TopLayout from '../../../components/employee/TopLayout';

const Service = () => {
    return (
        <TopLayout bg='#3399' title='service tab'>
            <View className="flex-1">
                <ServiceCard title="Leave service" path="leave" image={images.leave}/>
                <ServiceCard
                    title="Reimburstment service"
                    path="reimburstment"
                    image={images.payment}/> 
                    <TempServiceCard
                    title="New services" 
                    image={images.payment}/>
            </View>
        </TopLayout>
    );
};

export default Service;
