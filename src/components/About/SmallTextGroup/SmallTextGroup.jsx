import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export default function SmallTextGroup({ title, text }) {

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                    {text}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
        color: colors.textColor,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: colors.textColor,
    },
});
