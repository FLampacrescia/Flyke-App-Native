import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../../theme/colors";

export default function MainTitle({text, classAdd, classAddContainer, spanText, lineHeight}) {
    return (
        <View style={styles[classAddContainer]}>
            <Text style={[styles[classAdd]]}>
                {text}
                {spanText && <Text style={styles.aboutTitleGray}>{spanText}</Text>}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    'mainTitle': {
        fontFamily: 'Poppins-BlackItalic',
        fontSize: 28,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: colors.textColorWhite,
    },
    'formTitle': {
        fontSize: 36,
        fontFamily: 'Poppins-BlackItalic',
        letterSpacing: -1,
        color: colors.textColor,
    },
    'about-title-container': {
        marginBottom: 20,
    },
    'about-title': {
        fontSize: 36,
        fontWeight: '900',
        fontStyle: 'italic',
        textTransform: 'uppercase',
        color: colors.textColor,
    },
    aboutTitleGray: {
        color: '#b4b4b4ff',
    },
});
