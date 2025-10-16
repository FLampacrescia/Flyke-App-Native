import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from '../../hooks/useTranslations';
import { clearUser, setProfileImage } from '../../store/slices/userSlice';
import { clearSession, updateProfileImage } from '../../db';
import MyAccountMobileMenuItem from '../../components/MyAccount/MyAccountMobile/MyAccountMobileMenuItem/MyAccountMobileMenuItem';

export default function MyAccount() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);

    if (!user || !user.email) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    const { localId, email, profileImage, userName, lastname } = user;

    const menuItems = [
        {
            title: t('myaccount_navbar_profile_section_subtitle'),
            subtitle: t('myaccount_profile_section_subtitle'),
            path: "MyProfile"
        },
        {
            title: t('myaccount_navbar_wishlist_section_subtitle'),
            subtitle: t('myaccount_wishlist_section_subtitle'),
            path: "Wishlist"
        },
    ];

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos insuficientes', 'Necesitas dar permisos a la cámara para usar esta función.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            await saveImageAndUpdate(result.assets[0].uri);
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos insuficientes', 'Necesitas dar permisos a la galería para usar esta función.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            await saveImageAndUpdate(result.assets[0].uri);
        }
    };

    const saveImageAndUpdate = async (imageUri) => {
        try {
            dispatch(setProfileImage(imageUri));
            await updateProfileImage(localId, imageUri);
            Alert.alert("¡Éxito!", "Tu foto de perfil ha sido actualizada.");
        } catch (error) {
            console.error("Error al guardar la imagen:", error);
            Alert.alert("Error", "No se pudo actualizar tu foto de perfil.");
        }
    };

    const handleChangeProfilePicture = () => {
        Alert.alert(
            "Cambiar foto de perfil",
            "Elige una opción",
            [
                { text: "Sacar una foto", onPress: takePhoto },
                { text: "Elegir de la galería", onPress: pickImage },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    const handleLogout = async () => {
        try {
            await clearSession();
            dispatch(clearUser());
            navigation.goBack();
            console.log("Sesión cerrada con éxito.");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            Alert.alert("Error", "No se pudo cerrar la sesión.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.myAccountMainContent}>
                <View style={styles.profileSection}>
                    <TouchableOpacity onPress={handleChangeProfilePicture}>
                        <Image
                            key={profileImage}
                            source={{uri: profileImage}}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    <Text style={styles.userName}>{`${userName} ${lastname}`}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.path}
                    renderItem={({ item }) => (
                        <MyAccountMobileMenuItem
                            title={item.title}
                            subtitle={item.subtitle}
                            path={item.path}
                        />
                    )}
                    style={styles.menuSection}
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>{t('menu_logout')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'space-between',
    },
    myAccountMainContent: {
        marginTop: 10,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#fff'
    },
    userName: { fontSize: 20, fontWeight: 'bold' },
    userEmail: { fontSize: 16, color: 'gray' },
    menuSection: {
        flexGrow: 0,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#ee2a2aff',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});