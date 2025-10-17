import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../theme/colors';

const socialLinks = [
    { name: 'instagram', url: 'https://instagram.com' },
    { name: 'youtube', url: 'https://youtube.com' },
    { name: 'twitter', url: 'https://x.com' },
    { name: 'facebook', url: 'https://facebook.com' },
];

export default function SocialIcons() {
    const handlePress = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`No se puede abrir esta URL: ${url}`);
        }
    };

    return (
        <View style={styles.socialContainer}>
            {socialLinks.map((social) => (
                <TouchableOpacity
                    key={social.name}
                    style={styles.logoContainer}
                    onPress={() => handlePress(social.url)}
                    activeOpacity={0.7}
                >
                    <Icon
                        name={social.name}
                        style={[
                            styles.logo,
                            social.name === 'instagram' && styles.instagramLogo,
                        ]}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    socialContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        paddingBottom: 16,
    },
    logoContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: colors.textColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 19,
        color: colors.textColorWhite,
    },
    instagramLogo: {
        fontSize: 21,
        transform: [{ translateY: -1 }],
    },
});