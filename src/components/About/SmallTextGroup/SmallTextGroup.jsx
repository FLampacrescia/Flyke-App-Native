import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from '../../../hooks/useTranslations';

export default function SmallTextGroup() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.title}>{t('about_page_about_us_title')}</Text>
                <Text style={styles.description}>
                    {t('about_page_about_us_text')}
                </Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.title}>{t('about_page_our_vision_title')}</Text>
                <Text style={styles.description}>
                    {t('about_page_our_vision_text')}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
    },
});
