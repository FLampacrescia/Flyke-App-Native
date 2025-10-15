import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../../components/Buttons/MenuButton/Button';
import ConfirmationModal from '../../components/Common/ConfirmationModal/ConfirmationModal';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import { useTranslation } from '../../hooks/useTranslations';

export default function DropdownMenu({ isOpen, setIsOpen, user, logout, isLogoutModalOpen, setIsLogoutModalOpen }) {
    const navigation = useNavigation();
    const { isAdmin } = useUser();
    const { language, toggleLanguage } = useLanguage();
    const { t } = useTranslation();

    if (!isOpen) {
        return null;
    }

    const handleNavigate = (screen) => {
        navigation.navigate(screen);
        setIsOpen(false);
    };

    const handleLanguageToggle = () => {
        toggleLanguage();
        // No cerramos el menú para que el usuario vea el cambio
    };

    const handleLogout = () => {
        logout();
        setIsLogoutModalOpen(false);
        setIsOpen(false);
    }

    return (
        <View style={styles.dropdownMenu}>
            {user && (
                <>
                    <TouchableOpacity style={styles.menuLinkContainer} onPress={() => handleNavigate('MyAccount')}>
                        <Text style={styles.menuLink}>{t('menu_account')}</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                </>
            )}

            <TouchableOpacity style={styles.menuLinkContainer} onPress={() => handleNavigate('Wishlist')}>
                <Text style={styles.menuLink}>{t('menu_wishlist')}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuLinkContainer} onPress={handleLanguageToggle}>
                <Text style={styles.menuLink}>{t('menu_language')}</Text>
                {language === 'es' ? (
                    <View style={styles.languageContainer}>
                        <Text style={styles.languageText}>ES</Text>
                        <Image source={{ uri: "https://us.puma.com/_next/static/assets/icons/flag-ar.svg#icon" }} style={styles.flagIcon} />
                    </View>
                ) : (
                    <View style={styles.languageContainer}>
                        <Text style={styles.languageText}>EN</Text>
                        <Image source={{ uri: "https://us.puma.com/_next/static/assets/icons/flag-us.svg#icon" }} style={styles.flagIcon} />
                    </View>
                )}
            </TouchableOpacity>
            <View style={styles.separator} />

            {isAdmin && (
                <>
                    <TouchableOpacity style={styles.menuLinkContainer} onPress={() => handleNavigate('Management')}>
                        <Text style={[styles.menuLink, styles.adminLink]}>{t('menu_admin')}</Text>
                        <Icon name="desktop" style={styles.menuIcon} />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                </>
            )}

            {user ? (
                <>
                    <Button
                        text={t('menu_logout')}
                        variant="btn-secondary menu-btn"
                        onClick={() => setIsLogoutModalOpen(true)}
                    />
                    {isLogoutModalOpen && (
                        <ConfirmationModal
                            title={t('menu_logout_confirmation')}
                            confirmText={t('menu_logout_confirmation_btn')}
                            onClose={() => setIsLogoutModalOpen(false)}
                            onConfirm={handleLogout}
                        />
                    )}
                </>
            ) : (
                <>
                    <Button text={t('menu_login')} variant="btn-primary menu-btn" onClick={() => handleNavigate('Login')} />
                    <Button text={t('menu_register')} variant="btn-secondary menu-btn" onClick={() => handleNavigate('Register')} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownMenu: {
        position: 'absolute',
        top: 60, // Adjust as needed
        right: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    menuLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    menuLink: {
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 5,
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageText: {
        fontSize: 16,
        marginRight: 8,
    },
    flagIcon: {
        width: 24,
        height: 16,
    },
    adminLink: {
        color: '#d9534f', // Example admin color
        fontWeight: 'bold',
    },
    menuIcon: {
        fontSize: 16,
        color: '#d9534f',
    },
});


