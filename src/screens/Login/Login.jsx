
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainTitle from '../../components/Common/Titles/MainTitle/MainTitle';
import { useTranslation } from '../../hooks/useTranslations';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/services/authApi';
import { setUser } from '../../store/slices/userSlice';
import { saveSession } from '../../db';

export default function Login() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [triggerLogin, { data, isSuccess, isError, error, isLoading }] = useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isSuccess && data) {
            const sessionData = {
                email: data.email,
                token: data.idToken,
                localId: data.localId,
            };
            saveSession(sessionData)
                .then(() => {
                    dispatch(setUser(sessionData));
                    // No necesitamos navegar, el MainNavigator se encargará
                })
                .catch(dbError => {
                    console.error("Failed to save session:", dbError);
                    Alert.alert('Error', 'There was a problem saving your session.');
                });
        }
        if (isError) {
            const errorMessage = error?.data?.error?.message || 'Invalid credentials';
            Alert.alert('Login Error', errorMessage);
        }
    }, [data, isSuccess, isError, error, dispatch]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }
        try {
            await triggerLogin({ email, password, returnSecureToken: true }).unwrap();
        } catch (err) {
            // El error ya se maneja en el useEffect
            console.error('Failed to sign in:', err);
        }
    };

    return (
        <View style={styles.container}>
            <MainTitle classAdd="form-title" text="LOGIN." />

            <TextInput
                style={styles.input}
                placeholder={t('login_page_input1_placeholder')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
            />
            <TextInput
                style={styles.input}
                placeholder={t('login_page_input2_placeholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
            />

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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
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
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 8,
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
