import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from "../../../../hooks/useTranslations";

export default function MyAccountMobileHeader() {
    const navigation = useNavigation();
    const route = useRoute();
    const { t } = useTranslation();

    // Map route names to titles
    const sectionTitles = {
        'MyAccount': t('myaccount_main_title'),
        'MyProfile': t('myaccount_navbar_profile_section_subtitle'),
        'MyOrders': t('myaccount_navbar_orders_section_subtitle'),
        'Wishlist': t('myaccount_navbar_wishlist_section_subtitle'),
        'UserAddresses': t('myaccount_navbar_addresses_section_subtitle'),
    };

    const currentTitle = sectionTitles[route.name] || '';
    const canGoBack = navigation.canGoBack();

    return (
        <View style={styles.headerContainer}>
            {canGoBack && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-left" size={20} color="#333" />
                </TouchableOpacity>
            )}
            <Text style={[styles.title, !canGoBack && styles.titleCentered]}>
                {currentTitle}
            </Text>
            {/* This empty view helps in centering the title when the back button is present */}
            {canGoBack && <View style={styles.placeholder} />}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: 60, // Standard header height
    },
    backButton: {
        padding: 5,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    titleCentered: {
        textAlign: 'left', // If no back button, title aligns left
    },
    placeholder: {
        width: 25, // Same width as back button icon + padding
    },
});