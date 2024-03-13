import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterForm = () => {
    const [shipper, setShipper] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Gender: '',
        Status: 'A',
        AreaId: '',
        CCCD: '',
        Password: '',
    });

    const getShipperData = (key, value) => {
        setShipper({ ...shipper, [key]: value });
    }

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 10000
            };

            const response = await axios.post('https://onlinemarket-api.nguyenminhhai.us/api/v1/shipper?action=register', shipper, config);
            console.log('Shipper registered:', response.data);

            setShipper({
                Name: '',
                Email: '',
                Phone: '',
                Gender: '',
                Status: '',
                AreaId: '',
                CCCD: '',
                Password: '',
            });
        } catch (error) {
            console.error('Error registering shipper:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký trở thành tài xế giao hàng</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={shipper.Name}
                    onChangeText={(text) => getShipperData('Name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={shipper.Email}
                    onChangeText={(text) => getShipperData('Email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    value={shipper.Phone}
                    onChangeText={(text) => getShipperData('Phone', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    value={shipper.Gender}
                    onChangeText={(text) => getShipperData('Gender', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Area ID"
                    value={shipper.AreaId}
                    onChangeText={(text) => getShipperData('AreaId', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CCCD"
                    value={shipper.CCCD}
                    onChangeText={(text) => getShipperData('CCCD', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={shipper.Password}
                    onChangeText={(text) => getShipperData('Password', text)}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterForm;
