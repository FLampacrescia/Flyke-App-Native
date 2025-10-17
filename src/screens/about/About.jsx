import { View, ImageBackground, StyleSheet, Text } from "react-native";
import SmallTextGroup from "../../components/About/SmallTextGroup/SmallTextGroup";
import { useTranslation } from '../../hooks/useTranslations';
import MainTitle from "../../components/common/Titles/MainTitle/MainTitle";
import SocialIcons from "../../components/About/SocialIcons/SocialIcons";

export default function About() {
    const { t } = useTranslation();

    return (
        <View style={styles.aboutContainer}>
                <MainTitle
                    classAddContainer="about-title-container"
                    classAdd="about-title"
                    text={t('about_page_main_title')}
                    spanText={t('about_page_main_title_gray')}
                />
            <View style={styles.aboutTextMainContainer}>
                    <View>
                        <SmallTextGroup title={t('about_page_about_us_title')} text={t('about_page_about_us_text')}/>
                        <SmallTextGroup title={t('about_page_our_vision_title')} text={t('about_page_our_vision_text')} />
                    </View>
                    <View>
                        <SocialIcons />
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    aboutContainer: {
        flex: 1,
        padding: 20,
    },
    aboutTextMainContainer: {
        marginBottom: 20,
        flexDirection: 'column'
    },
});
