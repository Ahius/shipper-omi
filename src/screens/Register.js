import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { registerShipper } from '../redux/reducers/registerSlice';
import { fetchArea } from '../redux/reducers/areaSlice';
import { useNavigation } from '@react-navigation/native';

const RegisterForm = () => {
    const areaData = useSelector((state) => state.area);
    const navigation = useNavigation();
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // console.log('area: ', areaData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchArea());
    }, []);


    const handleGoBack = () => {
        navigation.goBack();
    };

    const pickerItems = areaData.data ? areaData.data.map(area => ({
        label: area.AreaName,
        value: area.AreaId.toString()
    })) : [];



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
    const { control, handleSubmit, formState: { errors } } = useForm();
    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        getShipperData('Gender', selectedGender);
    };
    const getShipperData = (key, value) => {

        setShipper({ ...shipper, [key]: value });
    }




    const onSubmit = (data) => {
        if (isNaN(data.CCCD) || isNaN(data.Phone) || data.CCCD === '' || data.Phone === '') {
            setErrorMessage('CCCD và Số điện thoại nên là chữ số!');
            return;
        }


        if (!/^\d{12}$/.test(data.CCCD)) {
            setErrorMessage('CCCD cần phải có 12 số!');
            return;
        }

        if (!/^\d{10,12}$/.test(data.Phone)) {
            setErrorMessage('Điện thoại phải là số có 10-12 chữ số!');
            return;
        }

        const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialChars.test(data.Password)) {
            setErrorMessage('Mật khẩu cần phải chứa kí tự đặc biệt!');
            return;
        }

        if (!data.Email.endsWith('@gmail.com')) {
            setErrorMessage('Email phải là địa chỉ Gmail');
            return;
        }

        const shipperData = {
            ...data,
            Gender: shipper.Gender,
            Status: shipper.Status
        };


        dispatch(registerShipper(shipperData))
            .then((response) => {
                console.log('Shipper registered:', response);
                setSuccessMessage('Đăng kí shipper thành công!');
                setErrorMessage('');
            })
            .catch((error) => {
                console.error('Error registering shipper:', error);
                setErrorMessage('Lỗi đăng kí shipper');

            });
    };


    // console.log('data cr: ', shipper);
    return (

        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
        >

            <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                <Icon name="arrow-back" size={18} color="grey" style={{ marginTop: 60, marginLeft:20}} />
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.formContainer}>
                        <Image
                            source={require('../../assets/images/login-out.png')}
                            style={styles.image}
                        />
                        <Text style={styles.title}>Đăng ký trở thành tài xế giao hàng</Text>
                        {errorMessage !== '' && (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        )}
                        {successMessage !== '' && (
                            <Text style={styles.successText}>{successMessage}</Text>
                        )}
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Họ tên"
                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        onChange(value);
                                        getShipperData('Name', value);
                                    }}
                                    value={value}
                                />
                            )}
                            name="Name"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                        {errors.Name && <Text style={styles.errorText}>Name is required</Text>}

                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Số điện thoại"
                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        onChange(value);
                                        getShipperData('Phone', value);
                                    }}
                                    value={value}
                                />
                            )}
                            name="Phone"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                        {errors.Phone && <Text style={styles.errorText}>Phone is required</Text>}

                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        onChange(value);
                                        getShipperData('Email', value);
                                    }}
                                    value={value}
                                />
                            )}
                            name="Email"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                        {errors.Email && <Text style={styles.errorText}>Email is required</Text>}



                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10, marginLeft: 10 }}>
                            <Text>Giới tính:</Text>
                            <TouchableOpacity onPress={() => handleGenderSelect('Female')}>
                                <Text style={{ color: gender === 'Female' ? '#DA5628' : 'black', marginLeft: 5 }}>Nam</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleGenderSelect('Male')}>
                                <Text style={{ color: gender === 'Male' ? '#DA5628' : 'black', marginLeft: 10, marginRight: 10 }}>Nữ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                        {errors.Gender && <Text style={styles.errorText}>Gender is required</Text>}


                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="CCCD"
                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        onChange(value);
                                        getShipperData('CCCD', value);
                                    }}
                                    value={value}
                                />
                            )}
                            name="CCCD"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                        {errors.CCCD && <Text style={styles.errorText}>CCCD is required</Text>}

                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mật khẩu"
                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        onChange(value);
                                        getShipperData('Password', value);
                                    }}
                                    value={value}
                                    secureTextEntry={true}
                                />
                            )}
                            name="Password"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                        {errors.Password && <Text style={styles.errorText}>Password is required</Text>}


                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <RNPickerSelect
                                    style={styles}
                                    onValueChange={(itemValue) => {
                                        onChange(itemValue);
                                        getShipperData('AreaId', itemValue);
                                    }}
                                    items={[
                                        { label: 'Chọn khu vực', value: '' },
                                        ...pickerItems
                                    ]}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            name="AreaId"
                            rules={{ required: true }}
                            defaultValue=""
                        />

                        {errors.AreaId && <Text style={styles.errorText}>AreaId is required</Text>}

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#DA5628',
    },
    formContainer: {
        flex: 0.95,
        borderWidth: 1.5,
        borderColor: '#DA5628',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginBottom: 11,
    },
    input: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#DA5628',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 8,
        marginTop: 6
    },
    successText: {
        color: 'green',
        marginBottom: 10,
        marginLeft: 8,
        marginTop: 6
    }
});

export default RegisterForm;


