import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Button({ text, variant, url, onClick }) {
    const navigation = useNavigation();

    const handlePress = () => {
        if (url) {
            // En React Navigation, la 'url' es el nombre de la ruta/pantalla
            navigation.navigate(url);
        }
        if (onClick) {
            onClick();
        }
    };

    // Mapear variantes a estilos
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];

    if (variant?.includes('btn-primary')) {
        buttonStyles.push(styles.primaryButton);
        textStyles.push(styles.primaryText);
    } else if (variant?.includes('btn-secondary')) {
        buttonStyles.push(styles.secondaryButton);
        textStyles.push(styles.secondaryText);
    }

    return (
        <TouchableOpacity style={buttonStyles} onPress={handlePress}>
            <Text style={textStyles}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryButton: {
        backgroundColor: '#000',
    },
    primaryText: {
        color: '#fff',
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
    },
    secondaryText: {
        color: '#000',
    },
});