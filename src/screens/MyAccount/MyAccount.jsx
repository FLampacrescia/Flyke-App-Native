import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from '../../hooks/useTranslations';
import MyAccountMobileMenuItem from '../../components/MyAccount/MyAccountMobile/MyAccountMobileMenuItem/MyAccountMobileMenuItem';
import MyAccountMobileHeader from '../../components/MyAccount/MyAccountMobile/MyAccountMobileHeader/MyAccountMobileHeader';

export default function MyAccount() {
    const { t } = useTranslation();

    const menuItems = [
        {
            title: t('myaccount_navbar_profile_section_subtitle'),
            subtitle: t('myaccount_profile_section_subtitle'),
            path: "MyProfile" // Corresponde al nombre de la ruta en el Stack Navigator
        },
        {
            title: t('myaccount_navbar_orders_section_subtitle'),
            subtitle: t('myaccount_orders_section_subtitle'),
            path: "MyOrders"
        },
        {
            title: t('myaccount_navbar_wishlist_section_subtitle'),
            subtitle: t('myaccount_wishlist_section_subtitle'),
            path: "Wishlist"
        },
        {
            title: t('myaccount_navbar_addresses_section_subtitle'),
            subtitle: t('myaccount_addresses_section_subtitle'),
            path: "UserAddresses"
        },
    ];

    return (
        <View style={styles.container}>
            <MyAccountMobileHeader />
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});
