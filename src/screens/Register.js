// // import React, { useState } from 'react';
// // import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
// // import { useDispatch } from 'react-redux';
// // import { registerShipper } from '../redux/actions/registerSlice';

// // const RegisterForm = () => {
// //     const [shipper, setShipper] = useState({
// //         Name: '',
// //         Email: '',
// //         Phone: '',
// //         Gender: '',
// //         Status: 'A',
// //         AreaId: '',
// //         CCCD: '',
// //         Password: '',
// //     });

// //     const dispatch = useDispatch();

// //     const getShipperData = (key, value) => {
// //         setShipper({ ...shipper, [key]: value });
// //     }

// //     const handleSubmit = () => {
// //         dispatch(registerShipper(shipper))
// //             // .unwrap()
// //             .then((response) => {
// //                 console.log('Shipper registered:', response);
// //             })
// //             .catch((error) => {
// //                 console.error('Error registering shipper:', error);
// //             });
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.title}>Đăng ký trở thành tài xế giao hàng</Text>
// //             <View style={styles.formContainer}>
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Name"
// //                     value={shipper.Name}
// //                     onChangeText={(text) => getShipperData('Name', text)}
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Email"
// //                     keyboardType="email-address"
// //                     value={shipper.Email}
// //                     onChangeText={(text) => getShipperData('Email', text)}
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Phone"
// //                     keyboardType="phone-pad"
// //                     value={shipper.Phone}
// //                     onChangeText={(text) => getShipperData('Phone', text)}
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Gender"
// //                     value={shipper.Gender}
// //                     onChangeText={(text) => getShipperData('Gender', text)}
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Area ID"
// //                     value={shipper.AreaId}
// //                     onChangeText={(text) => getShipperData('AreaId', text)}
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="CCCD"
// //                     value={shipper.CCCD}
// //                     onChangeText={(text) => getShipperData('CCCD', text)}
// //                 />
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Password"
// //                     secureTextEntry
// //                     value={shipper.Password}
// //                     onChangeText={(text) => getShipperData('Password', text)}
// //                 />
// //             </View>
// //             <TouchableOpacity
// //                 style={styles.button}
// //                 onPress={handleSubmit}
// //             >
// //                 <Text style={styles.buttonText}>Submit</Text>
// //             </TouchableOpacity>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         marginTop: 100,
// //         paddingHorizontal: 20,
// //     },
// //     title: {
// //         fontSize: 20,
// //         fontWeight: 'bold',
// //         marginBottom: 20,
// //     },
// //     formContainer: {
// //         borderWidth: 1,
// //         borderColor: 'lightgray',
// //         borderRadius: 10,
// //         padding: 10,
// //         marginBottom: 20,
// //     },
// //     input: {
// //         height: 40,
// //         borderColor: 'gray',
// //         borderWidth: 1,
// //         marginBottom: 10,
// //         paddingHorizontal: 10,
// //     },
// //     button: {
// //         backgroundColor: 'blue',
// //         paddingVertical: 10,
// //         alignItems: 'center',
// //         borderRadius: 5,
// //     },
// //     buttonText: {
// //         color: 'white',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //     },
// // });

// // export default RegisterForm;


// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import RNPickerSelect from 'react-native-picker-select';


// import { registerShipper } from '../redux/reducers/registerSlice';

// const RegisterForm = () => {
//     const [shipper, setShipper] = useState({
//         Name: '',
//         Email: '',
//         Phone: '',
//         Gender: '',
//         Status: 'A',
//         AreaId: '',
//         CCCD: '',
//         Password: '',
//     });
//     const { control, handleSubmit, formState: { errors } } = useForm();
//     const dispatch = useDispatch();
//     const getShipperData = (key, value) => {
//         setShipper({ ...shipper, [key]: value });
//     }
//     const onSubmit = (data) => {
//         dispatch(registerShipper(data))
//             .then((response) => {
//                 console.log('Shipper registered:', response);
//             })
//             .catch((error) => {
//                 console.error('Error registering shipper:', error);
//             });
//     };

//     // console.log("shipper data:", shipper );

//     return (
//         <View style={styles.container}>
//             <View style={styles.formContainer}>
//                <Image src='https://bambooship.cdn.vccloud.vn/wp-content/uploads/2021/11/shipper-1-1.png'></Image>
//                 <Text style={styles.title}>Đăng ký trở thành tài xế giao hàng</Text>
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Name"
//                             onBlur={onBlur}
//                             onChangeText={(value) => {
//                                 onChange(value);
//                                 getShipperData('Name', value);
//                             }}
//                             value={value}
//                         />
//                     )}
//                     name="Name"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />
//                 <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
//                 {errors.Name && <Text style={styles.errorText}>Name is required</Text>}


//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Phone"
//                             onBlur={onBlur}
//                             onChangeText={(value) => {
//                                 onChange(value);
//                                 getShipperData('Phone', value);
//                             }}
//                             value={value}
//                         />
//                     )}
//                     name="Phone"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />
//                 <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
//                 {errors.Phone && <Text style={styles.errorText}>Phone is required</Text>}

//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Email"
//                             onBlur={onBlur}
//                             onChangeText={(value) => {
//                                 onChange(value);
//                                 getShipperData('Email', value);
//                             }}
//                             value={value}
//                         />
//                     )}
//                     name="Email"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />
//                 <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
//                 {errors.Email && <Text style={styles.errorText}>Email is required</Text>}



//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Gender"
//                             onBlur={onBlur}
//                             onChangeText={(value) => {
//                                 onChange(value);
//                                 getShipperData('Gender', value);
//                             }}
//                             value={value}
//                         />
//                     )}
//                     name="Gender"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />
//                 <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
//                 {errors.Gender && <Text style={styles.errorText}>Gender is required</Text>}
//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Status"
//                             onBlur={onBlur}
//                             onChangeText={(value) => {
//                                 onChange(value);
//                                 getShipperData('Status', value);
//                             }}
//                             value={value}
//                         />
//                     )}
//                     name="Status"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />
//                 <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
//                 {errors.Status && <Text style={styles.errorText}>Status is required</Text>}


//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="CCCD"
//                             onBlur={onBlur}
//                             onChangeText={(value) => {
//                                 onChange(value);
//                                 getShipperData('CCCD', value);
//                             }}
//                             value={value}
//                         />
//                     )}
//                     name="CCCD"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />
//                 <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
//                 {errors.CCCD && <Text style={styles.errorText}>CCCD is required</Text>}

//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Password"
//                             onBlur={onBlur}
//                             onChangeText={(value) => {
//                                 onChange(value);
//                                 getShipperData('Password', value);
//                             }}
//                             value={value}
//                         />
//                     )}
//                     name="Password"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />
//                 <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
//                 {errors.Password && <Text style={styles.errorText}>Password is required</Text>}


//                 <Controller
//                     control={control}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <RNPickerSelect
//                             style={styles}
//                             onValueChange={(itemValue) => {
//                                 onChange(itemValue);
//                                 getShipperData('AreaId', itemValue);
//                             }}
//                             items={[
//                                 { label: 'Select Area', value: '' },
//                                 { label: 'AreaId1', value: '1' },
//                                 { label: 'AreaId2', value: '3' },
//                             ]}

//                             onBlur={onBlur}
//                             value={value}
//                         />
//                     )}
//                     name="AreaId"
//                     rules={{ required: true }}
//                     defaultValue=""
//                 />

//                 {errors.AreaId && <Text style={styles.errorText}>AreaId is required</Text>}

//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={handleSubmit(onSubmit)}
//                 >
//                     <Text style={styles.buttonText}>Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 100,
//         paddingHorizontal: 20,
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#DA5628',
//     },
//     formContainer: {
//         borderWidth: 1,
//         borderColor: 'lightgray',
//         borderRadius: 10,
//         padding: 10,
//         marginBottom: 20,
//     },
//     input: {
//         height: 40,

//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
//     button: {
//         backgroundColor: '#DA5628',
//         paddingVertical: 10,
//         alignItems: 'center',
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     errorText: {
//         color: 'red',
//         marginBottom: 10,
//     },
// });

// export default RegisterForm;

import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { registerShipper } from '../redux/reducers/registerSlice';
import { fetchArea } from '../redux/reducers/areaSlice';

const RegisterForm = () => {
    const areaData = useSelector((state) => state.area);
    // console.log('area: ', areaData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchArea());
    }, []);




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

    const getShipperData = (key, value) => {
        setShipper({ ...shipper, [key]: value });
    }

    const onSubmit = (data) => {
        dispatch(registerShipper(data))
            .then((response) => {
                console.log('Shipper registered:', response);
            })
            .catch((error) => {
                console.error('Error registering shipper:', error);
            });
    };

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
        >
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image
                        source={{ uri: 'https://bambooship.cdn.vccloud.vn/wp-content/uploads/2021/11/shipper-1-1.png' }}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Đăng ký trở thành tài xế giao hàng</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
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
                                placeholder="Phone"
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



                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Gender"
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                    onChange(value);
                                    getShipperData('Gender', value);
                                }}
                                value={value}
                            />
                        )}
                        name="Gender"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                    {errors.Gender && <Text style={styles.errorText}>Gender is required</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Status"
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                    onChange(value);
                                    getShipperData('Status', value);
                                }}
                                value={value}
                            />
                        )}
                        name="Status"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'black', width: '90%', marginLeft: 9 }} />
                    {errors.Status && <Text style={styles.errorText}>Status is required</Text>}


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
                                placeholder="Password"
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                    onChange(value);
                                    getShipperData('Password', value);
                                }}
                                value={value}
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
                                    { label: 'Select Area', value: '' },
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
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
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
    },
});

export default RegisterForm;


