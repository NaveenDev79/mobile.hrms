import React, {useState, useEffect} from 'react';
import {
    Text,
    ScrollView,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../constants';
import DateTimePicker from 'react-native-ui-datepicker'; // Ensure this library is properly installed and imported

const Leave = () => {
    const [leaveData,
        setLeaveData] = useState({
        type: "", cause: "", from: new Date(), // Initialize with current date or suitable default
        to: new Date(), // Initialize with current date or suitable default
        total: ""
    });

    useEffect(() => {
        calculateTotalDays();
    }, [leaveData.from, leaveData.to]);

    const calculateTotalDays = () => {
        const {from, to} = leaveData;
        if (from && to) {
            const start = new Date(from);
            const end = new Date(to);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include the end date
            setLeaveData(prevState => ({
                ...prevState,
                total: diffDays.toString()
            }));
        }
    };

    const changeHandler = (name, value) => {
        setLeaveData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.mainContainer}>
                    {/* Body */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>⬅️ New Leave</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <Compo
                            title='Type'
                            name="type"
                            onChangeHandler={changeHandler}
                            value={leaveData.type}/>
                        <Compo
                            title='Cause'
                            name="cause"
                            onChangeHandler={changeHandler}
                            value={leaveData.cause}/>
                        <CompoDate
                            title='From'
                            name="from"
                            onChangeHandler={changeHandler}
                            value={leaveData.from}/>
                        <CompoDate
                            title='To'
                            name="to"
                            onChangeHandler={changeHandler}
                            value={leaveData.to}/>
                        <TouchableOpacity style={styles.button} onPress={() => console.log(leaveData)}>
                            <Text style={styles.buttonText}>Apply for Leave ({leaveData.total}
                                days)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const Compo = ({value, onChangeHandler, title, name}) => {
    return (
        <View style={styles.inputContainer}>
            <Image source={images.leave} resizeMode='contain' style={styles.image}/>
            <View>
                <Text>{title}</Text>
                <TextInput
                    value={value}
                    onChangeText={(text) => onChangeHandler(name, text)}
                    style={styles.textInput}/>
            </View>
        </View>
    );
};

const CompoDate = ({value, onChangeHandler, title, name}) => {
    return (
        <View style={styles.inputContainer}>
            <Image source={images.leave} resizeMode='contain' style={styles.image}/>
            <View>
                <Text>{title}</Text>
                <DateTimePicker
                    mode="single"
                    date={value}
                    onChange={(params) => {
                    onChangeHandler(name, params.date);
                }}
                    minDate={new Date()}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    scrollViewContent: {
        flexGrow: 1
    },
    mainContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 2,
        borderColor: '#c0c0c0',
        borderRadius: 10,
        backgroundColor: '#e0e0e0'
    },
    header: {
        padding: 10,
        backgroundColor: '#d0d0d0',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    formContainer: {
        padding: 10
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#c0c0c0',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '80%'
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default Leave;
