import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';

const Logo = require('../../../../assets/Logo-FLYKE-Isotipo.png');

const HomeHeaderCustom = ({ navigation }) => {
    
    const goToSearch = () => {
        navigation.navigate('Search');
    };

    return (
        // Añadimos padding superior para respetar la barra de estado del móvil
        <View style={styles.headerContainer}> 
            <View style={styles.topRow}>
                <Image source={Logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.welcomeText}>¡Hola, Franco!</Text>
                <View style={styles.iconGroup}>
                    {/* 1. Ícono de Búsqueda (Navegación) */}
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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: 40,
        height: 40,
    },
    welcomeText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
        textAlign: 'center',
    },
});

export default HomeHeaderCustom;