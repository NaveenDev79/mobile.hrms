import { View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from '../../../components/Layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { NavigateToBack } from '../../../components/Utils';
import { ReimburstmentPlans } from '../../../constants/data';
import { FormInput, showSuccess } from '../../../components/Inputs';
import { ActionButtons } from '../../../components/Buttons';

const ReimburstmentId = () => {
  const { id } = useLocalSearchParams();
  const [fund, setFund] = useState({
    title: "",
    desc: "",
    amount: ""
  });
  const router = useRouter();

  useEffect(() => {
    setFund(ReimburstmentPlans[id] || {
      title: "",
      desc: "",
      amount: ""
    });
  }, [id]);

  
  async function handleSubmit() {
    try {
      console.log('fund data added');
      showSuccess(() => {
        router.push('/emp-services/Service');
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <Container classes="flex-1 h-screen px-2 py-4">
      <NavigateToBack title='Add Reimburstment' />
      <View>
        <FormInput
          placeholder="Enter the title"
          value={fund.title}
          // onChange={(value) => changeHandler('title', value)}
          type="text"
          label="Title"
        />
        <FormInput
          placeholder="Desc.."
          value={fund.desc}
          // onChange={(value) => changeHandler('desc', value)}
          type="text"
          label="Desc"
        />
        <FormInput
          placeholder="Enter the Amount"
          value={fund.amount}
          // onChange={(value) => changeHandler('amount', value)}
          type="Number"
          label="Amount"
        />
      </View>
      <ActionButtons
        title='Apply'
        textClasses='text-base text-white text-center font-medium'
        classes='p-4 mx-2 rounded-lg'
        changeHandler={handleSubmit}
      />
    </Container>
  );
}

export default ReimburstmentId;
