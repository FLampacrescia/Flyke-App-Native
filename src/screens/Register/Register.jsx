import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from '../../hooks/useTranslations';
import MainTitle from '../../components/Common/Titles/MainTitle/MainTitle';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../../store/services/authApi';
import { useCreateUserProfileMutation } from '../../store/services/profileApi';
import { setUser } from '../../store/slices/userSlice';
import { saveSession } from '../../db';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [triggerSignUp, { data: authData, isSuccess, isError, error, isLoading }] = useSignupMutation();
    const [createUserProfile] = useCreateUserProfileMutation();

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    useEffect(() => {
        if (isSuccess && authData) {
            const sessionData = {
                email: authData.email,
                token: authData.idToken,
                localId: authData.localId,
            };
            
            const userProfile = {
                name: formData.name,
                lastname: formData.lastname,
                email: authData.email,
                role: 'user',
                createdAt: new Date().toISOString(),
            };

            Promise.all([
                saveSession(sessionData),
                createUserProfile({ localId: authData.localId, profileData: userProfile }).unwrap()
            ])
            .then(() => {
                dispatch(setUser(sessionData));
            })
            .catch(err => {
                console.error("Failed to register:", err);
                Alert.alert('Error', 'An error occurred during the final step of registration.');
            });
        }
        if (isError) {
            const errorMessage = error?.data?.error?.message || 'An error occurred during registration.';
            Alert.alert('Registration Error', errorMessage);
        }
    }, [isSuccess, authData, isError, error, dispatch, formData, createUserProfile]);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        if (!formData.name || !formData.lastname || !formData.email || !formData.password || !formData.confirmPassword) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            await triggerSignUp({ email: formData.email, password: formData.password, returnSecureToken: true }).unwrap();
        } catch (err) {
            console.error('Failed to sign up:', err);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <MainTitle classAdd="form-title" text={t('register_page_main_title')} />
                
                <Text style={styles.label}>{t('name')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t('name_placeholder')}
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    autoCapitalize="words"
                    editable={!isLoading}
                />
                <Text style={styles.label}>{t('lastname')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t('lastname_placeholder')}
                    value={formData.lastname}
                    onChangeText={(text) => handleInputChange('lastname', text)}
                    autoCapitalize="words"
                    editable={!isLoading}
                />
                <Text style={styles.label}>{t('email')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t('email_placeholder')}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
                <Text style={styles.label}>{t('password')}</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder={t('password_placeholder')}
                        value={formData.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        secureTextEntry={!isPasswordVisible}
                        editable={!isLoading}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                        <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="grey" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>{t('confirm_password')}</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder={t('confirm_password_placeholder')}
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleInputChange('confirmPassword', text)}
                        secureTextEntry={!isConfirmPasswordVisible}
                        editable={!isLoading}
                    />
                    <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon}>
                        <Ionicons name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={24} color="grey" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('register')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={isLoading}>
                    <Text style={styles.linkText}>{t('already_have_account')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        padding: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
        height: 50,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        backgroundColor: '#333',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        minHeight: 50,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkText: {
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        fontWeight: 'bold',
    },
});
