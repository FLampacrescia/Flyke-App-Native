import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from '../../hooks/useTranslations';
import { useSignupMutation } from '../../store/services/authApi';
// import { useCreateUserProfileMutation } from '../../store/services/profileApi'; // Lo comentamos si no se usa de inmediato
import { setUser } from '../../store/slices/userSlice';
import { saveSession } from '../../db';

export default function Register() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    // Hooks de la API
    const [triggerSignUp, { isLoading }] = useSignupMutation();
    // const [createUserProfile] = useCreateUserProfileMutation(); // Descomentar cuando la API de perfil esté lista

    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        const { name, lastname, email, password, confirmPassword } = formData;
        if (!name || !lastname || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            // 2. Crear la cuenta de autenticación
            const authData = await triggerSignUp({ email, password, returnSecureToken: true }).unwrap();
            
            // 3. Crear el objeto de sesión con los datos correctos
            const sessionData = {
                email: authData.email,
                token: authData.idToken,
                localId: authData.localId,
                userName: name, 
                lastname: lastname,
                profileImage: null,
            };

            console.log("Datos que se van a guardar:", sessionData);

            // 4. Guardar la sesión en la base de datos local
            await saveSession(sessionData);

            /*
            // 5. (Opcional) Guardar perfil en la base de datos remota (Firebase Realtime DB, etc.)
            const userProfile = { name, lastname, email, createdAt: new Date().toISOString() };
            await createUserProfile({ localId: authData.localId, profileData: userProfile }).unwrap();
            */

            // 6. Actualizar el estado de Redux para iniciar sesión automáticamente
            dispatch(setUser(sessionData));

            // 7. Navegar fuera del flujo de autenticación
            navigation.reset({
                index: 0,
                routes: [{ name: 'AppTabs' }], // Asegúrate que 'AppTabs' es el nombre correcto en tu MainNavigator
            });

        } catch (error) {
            console.error("Error en el proceso de registro:", error);
            const errorMessage = error?.data?.error?.message || 'Ocurrió un error durante el registro.';
            Alert.alert('Error de Registro', errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContent}>
                    <Text style={styles.formTitle}>REGISTRO.</Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Nombre */}
                    <TextInput
                        style={styles.input}
                        placeholder={t('register_page_input1_placeholder')}
                        placeholderTextColor="#999"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        autoCapitalize="words"
                        editable={!isLoading}
                    />
                    {/* Apellido */}
                    <TextInput
                        style={styles.input}
                        placeholder={t('register_page_input2_placeholder')}
                        placeholderTextColor="#999"
                        value={formData.lastname}
                        onChangeText={(text) => handleInputChange('lastname', text)}
                        autoCapitalize="words"
                        editable={!isLoading}
                    />
                    {/* Email */}
                    <TextInput
                        style={styles.input}
                        placeholder={t('register_page_input9_placeholder')}
                        placeholderTextColor="#999"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isLoading}
                    />
                    {/* Contraseña */}
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder={t('register_page_input11_placeholder')}
                            placeholderTextColor="#999"
                            value={formData.password}
                            onChangeText={(text) => handleInputChange('password', text)}
                            secureTextEntry={!showPassword}
                            editable={!isLoading}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#333" />
                        </TouchableOpacity>
                    </View>
                    {/* Confirmar Contraseña */}
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder={t('register_page_input12_placeholder')}
                            placeholderTextColor="#999"
                            value={formData.confirmPassword}
                            onChangeText={(text) => handleInputChange('confirmPassword', text)}
                            secureTextEntry={!showConfirmPassword}
                            editable={!isLoading}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} size={20} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {/* Botón de Registro */}
                    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
                        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('register_page_btn')}</Text>}
                    </TouchableOpacity>

                    {/* Link para ir a Login */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>{t('register_already_have_account')}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={isLoading}>
                            <Text style={[styles.loginText, styles.loginLink]}>{t('login_page_btn')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContent: {
        alignItems: 'center',
        paddingTop: 170,
        paddingBottom: 20,
        marginBottom: 30,
    },
    formTitle: {
        fontSize: 36,
        fontWeight: '900',
        fontStyle: 'italic',
        letterSpacing: -1,
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
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
        height: 50,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        paddingRight: 10,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        minHeight: 50,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
    },
    loginLink: {
        fontWeight: 'bold',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
});