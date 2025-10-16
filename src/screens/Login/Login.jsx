import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../../hooks/useTranslations';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/services/authApi';
import { setUser } from '../../store/slices/userSlice';
import { saveSession, getSession } from '../../db';
import Icon from 'react-native-vector-icons/FontAwesome';

const Logo = require('../../assets/images/Logo-FLYKE-Isotipo.webp');

export default function Login() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [triggerLogin, { isLoading }] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, ingrese email y contraseña.');
            return;
        }

        try {
            const data = await triggerLogin({ email, password, returnSecureToken: true }).unwrap();

            const existingSession = await getSession();
            
            let existingUserName = null;
            let existingLastname = null;
            
            // ✅ 3. Verificamos si la sesión guardada pertenece al mismo usuario que acaba de iniciar sesión
            if (existingSession && existingSession.localId === data.localId) {
                // Si es así, rescatamos sus datos de perfil
                existingUserName = existingSession.userName;
                existingLastname = existingSession.lastname;
            }
            
            const sessionData = {
                email: data.email,
                token: data.idToken,
                localId: data.localId,
                userName: existingUserName,
                lastname: existingLastname,
                profileImage: null,
            };

            console.log("Datos de login:", sessionData);

            if (rememberMe) {
                await saveSession(sessionData);
                console.log("Sesión guardada en la base de datos.");
            }

            dispatch(setUser(sessionData));
            navigation.goBack();

        } catch (error) {
            console.error("Error en el proceso de login:", error);
            const errorMessage = error?.data?.error?.message || 'Credenciales incorrectas o error de red.';
            Alert.alert('Error de Login', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <Image source={Logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.formTitle}>LOGIN.</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={t('login_page_input1_placeholder')}
                    placeholderTextColor="#999" 
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder={t('login_page_input2_placeholder')}
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword} 
                        editable={!isLoading}
                    />
                    <TouchableOpacity 
                        style={styles.passwordToggle} 
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#000000ff" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.rememberMeContainer} onPress={() => setRememberMe(!rememberMe)} disabled={isLoading}>
                    <Icon 
                        name={rememberMe ? 'check-square' : 'square-o'} 
                        size={20} 
                        color="#000" 
                        style={styles.checkboxIcon}
                    />
                    <Text style={styles.rememberMeText}>{t('login_page_remember_me')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('login_page_btn')}</Text>}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>{t('login_page_register_message')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={isLoading}>
                        <Text style={[styles.registerText, styles.registerLink]}>{t('login_page_register_link')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    headerContent: {
    alignItems: 'center',
    position: 'absolute', 
    top: 150,
    left: 0,
    right: 0,
    zIndex: 10,
},
    logo: {
        width: 100,
        height: 100,
    },
    formTitle: {
        fontSize: 36,
        fontWeight: '900',
        fontStyle: 'italic',
        letterSpacing: -1,
    },
    formContainer: {
        paddingTop: 120,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingRight: 10,
    },
    passwordToggle: {
        padding: 5,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxIcon: {
        marginRight: 10,
    },
    rememberMeText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        minHeight: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 16,
    },
    registerLink: {
        fontWeight: 'bold',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    }
});