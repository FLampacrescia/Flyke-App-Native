import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { colors } from '../../../../theme/colors';

const Logo = require('../../../../assets/images/Logo-FLYKE-Isotipo.webp');

const HomeHeaderCustom = ({ navigation }) => {
    const { localId, userName } = useSelector(state => state.user);
    const isAuthenticated = !!localId;
    
    const goToSearch = () => {
        navigation.navigate('Search');
    };

    return (
        <View style={styles.headerContainer}> 
            <View style={styles.topRow}>
                <Image source={Logo} style={styles.logo} resizeMode="contain" />
                {isAuthenticated && (
                    <Text style={styles.welcomeText}>¡Hola, {userName}!</Text>
                )}

                <View style={styles.iconGroup}>
                    <TouchableOpacity onPress={goToSearch} style={styles.iconButton}>
                        <Icon name="search" size={26} color={colors.textColor} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        paddingTop: getStatusBarHeight(), 
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    logo: {
        width: 40,
        height: 27,
    },
    welcomeText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: colors.textColor,
        textAlign: 'center',
    },
});

export default HomeHeaderCustom;