import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from '../../../../hooks/useTranslations';

export default function ProfileHeaderCustom() {
    const navigation = useNavigation();
    const route = useRoute();
    const { t } = useTranslation();

    const sectionTitles = {
        'MyAccount': t('myaccount_main_title'),
        'MyProfile': t('myaccount_navbar_profile_section_subtitle'),
        'Wishlist': t('myaccount_navbar_wishlist_section_subtitle'),
    };

    const currentTitle = sectionTitles[route.name] || route.name;
    const canGoBack = navigation.canGoBack();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.sideContainer}>
                {canGoBack && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="chevron-left" size={20} color="#333" />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>{currentTitle}</Text>
            </View>
            <View style={styles.sideContainer} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: getStatusBarHeight(),
        paddingHorizontal: 10,
        height: getStatusBarHeight() + 50,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sideContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        padding: 5,
    },
});