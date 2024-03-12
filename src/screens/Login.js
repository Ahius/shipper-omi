
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authSlice';
import axios from 'axios';


const Login = ({ navigation }) => {
    // const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ Phone: '', Password: '' });
    // console.log("data", credentials.Phone, credentials.Password);


    async function loginUser(phone, password) {
        try {
            const response = await axios.post('https://onlinemarket-api.nguyenminhhai.us/api/v1/shipper?action=login', {
                Phone: phone,
                Password: password
            });

            console.log('Dữ liệu đăng nhập:', response.data);
            return response.data;
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            throw error;
        }
    }

    const handleLogin = () => {
        loginUser(credentials.Phone, credentials.Password)
            .then(data => {
                navigation.navigate('AppNavigation');
                console.log('Đăng nhập thành công:', data);
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi đăng nhập:', error);
            });
    }

    // const handleLogin = () => {
    //     dispatch(login(credentials))
    //         .then((response) => {
    //             // console.log('Login successful:', response);
    //             if (response.status === 200) {
    //                 console.log('Login successful:', response);
    //                 navigation.navigate('AppNavigation');
    //             } else {
    //                 console.error('Login error:', response);
    //                 // Handle other status codes if needed
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Login error:', error.response.statusText);
    //             // Handle other error scenarios if needed
    //         });
    // };





    // const handleLogin = () => {
    //     dispatch(login(credentials))
    //         .then((response) => {
    //             // console.log('Login successful:', response);
    //             if (response.status === 200) {
    //                 console.log('Login successful:', response);
    //                 navigation.navigate('AppNavigation');

    //             } else {
    //                 // console.error('Login error:', response);
    //                 // Handle other status codes if needed
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Login error:', error.response.statusText);
    //             // Handle other error scenarios if needed
    //         });
    // };






    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topBackground}>
                <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/bf/be/1c/bfbe1c895b7915a608344511fe13fdba.jpg' }} style={styles.backgroundImage}></ImageBackground>
            </View>

            <View style={styles.middleContainer}>
                <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/eb/aa/50/ebaa506bb2ca7ba89cacb10ec426e96a.jpg' }} style={styles.middleBackground}>
                    <View style={styles.container}>
                        <View style={styles.formContainer}>
                            <Text style={styles.text}>Đăng nhập</Text>
                            {/* <TextInput
                                style={styles.input}
                                placeholder="Nhập Số Điện Thoại"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={credentials.Phone}
                                onChangeText={(e) => setCredentials({ ...credentials, Phone: e.target.value })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu"
                                secureTextEntry
                                value={credentials.Password}
                                onChangeText={(e) => setCredentials({ ...credentials, Password: e.target.value })}
                            /> */}

                            <TextInput
                                style={styles.input}
                                placeholder="Nhập Số Điện Thoại"
                                keyboardType="phone-pad" // Change to 'phone-pad' for phone numbers
                                autoCapitalize="none"
                                value={credentials.Phone}
                                onChangeText={(text) => setCredentials({ ...credentials, Phone: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu"
                                secureTextEntry
                                value={credentials.Password}
                                onChangeText={(text) => setCredentials({ ...credentials, Password: text })}
                            />

                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <View style={styles.forgotPasswordContainer}>
                                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Your App</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBackground: {
        flex: 0.1,
        marginBottom: 10, // Add margin bottom to create space
    },
    middleContainer: {
        flex: 0.9, // Adjust the flex to take the desired space between the backgrounds
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    middleBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DA5628',
        width: '80%',
        maxWidth: 300,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    text: {
        marginBottom: 30,
        fontSize: 35,
        color: '#DA5628',
        textAlign: 'center'
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#DA5628',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    forgotPasswordContainer: {
        position: 'absolute',
        bottom: 2,
        right: 20,

    },
    forgotPasswordText: {
        color: '#4B9AD1',
    },

    footer: {
        backgroundColor: '#DA5628',
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        color: 'white',
        fontSize: 14,
    },
});

export default Login;
