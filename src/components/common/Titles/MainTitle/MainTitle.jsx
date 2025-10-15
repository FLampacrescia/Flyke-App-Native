import { View, Text, StyleSheet } from "react-native";

export default function MainTitle({text, classAdd, classAddContainer, spanText, lineHeight}) {
    // The props classAdd and classAddContainer are now for style mapping
    return (
        <View style={styles[classAddContainer]}>
            <Text style={[styles[classAdd], lineHeight ? { lineHeight } : {}]}>
                {text}
                {spanText && <Text style={styles.aboutTitleGray}>{spanText}</Text>}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    heroTitle: {
        fontSize: 40,
        fontWeight: '900',
        fontStyle: 'italic',
        textAlign: 'center',
        letterSpacing: -1,
    },
    'about-title-container': {
        // styles for the container
    },
    'about-title': {
        fontSize: 24,
        fontWeight: 'bold',
    },
    aboutTitleGray: {
        color: 'gray',
    },
});
