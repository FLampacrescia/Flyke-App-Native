import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const Logo = require('../../../../assets/Logo-FLYKE-Isotipo.png');

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
                        <Icon name="search" size={26} color="#000" />
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
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default HomeHeaderCustom;