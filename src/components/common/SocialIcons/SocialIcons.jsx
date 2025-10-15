import { View, TouchableOpacity, Linking, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SocialIcons({ type, type2, type3 }) {
    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles[type]}>
            <TouchableOpacity onPress={() => openLink("https://instagram.com")}>
                <View style={styles[type2]}>
                    <Icon name="instagram" style={styles[type3]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink("https://youtube.com")}>
                <View style={styles[type2]}>
                    <Icon name="youtube" style={styles[type3]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink("https://x.com")}>
                <View style={styles[type2]}>
                    <Icon name="twitter" style={styles[type3]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink("https://facebook.com")}>
                <View style={styles[type2]}>
                    <Icon name="facebook" style={styles[type3]} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    'social-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    'social-logo-container': {
        margin: 10,
    },
    'social-logo': {
        fontSize: 24,
        color: '#000',
    },
});
