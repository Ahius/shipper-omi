import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/authSlice';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({ Phone: '', Password: '' });
    const [error, setError] = useState(null);

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    const handleLogin = () => {
        dispatch(login(credentials))
            .then((response) => {
                if (response && response.payload) {
                    if (response.payload.msg === "Login succesfully") {
                        setError(null);
                        navigation.navigate('AppNavigation');
                        // console.log('logogog: ', response.payload);
                    } else {
                        setError('Đã xảy ra lỗi trong quá trình đăng nhập.');
                    }
                } else {
                    console.error('Error occurred while logging in:', response);
                    setError('Đã xảy ra lỗi trong quá trình đăng nhập.');
                }
            })
            .catch((error) => {
                setError('Đã xảy ra lỗi trong quá trình đăng nhập.');
                console.error('Error occurred while logging in:', error);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/login-head-b.jpg')} style={styles.topBackground}>
                <View style={styles.overlay}></View>
                <Image source={require('../../assets/images/login-out.png')} style={styles.logo} />
            </ImageBackground>
            <View style={styles.middleContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Đăng nhập</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập Số Điện Thoại"
                        keyboardType="phone-pad"
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
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <TouchableOpacity onPress={handleRegister}>
                        <Text>Bạn chưa có tài khoản? <Text style={{ marginTop: 10, color: '#DA5628', textAlign: 'center', marginLeft:6 }}>Đăng ký ngay</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ImageBackground source={require('../../assets/images/login-bottom.jpg')} style={styles.topBackground2}>
                {/* <View style={styles.overlay}></View> */}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBackground: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    topBackground2: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    middleContainer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxWidth: 300,
    },
    text: {
        marginBottom: 30,
        fontSize: 35,
        color: '#DA5628',
        textAlign: 'center'
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
    errorText: {
        color: 'red'
    }
});

export default Login;
