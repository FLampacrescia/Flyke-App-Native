import { View, Image, StyleSheet, Text } from "react-native";
import SmallTextGroup from "../../components/About/SmallTextGroup/SmallTextGroup";
import SocialIcons from "../../components/Common/SocialIcons/SocialIcons";
import MainTitle from "../../components/Common/Titles/MainTitle/MainTitle";
import AboutImg from "../../assets/about1.jpg";
import { useTranslation } from '../../hooks/useTranslations';

export default function About() {
    const { t } = useTranslation();

    return (
        <View style={styles.aboutContainer}>
            <View style={styles.aboutTextMainContainer}>
                <MainTitle
                    classAddContainer="about-title-container"
                    classAdd="about-title"
                    text={t('about_page_main_title')}
                    spanText={t('about_page_main_title_gray')}
                />
                <View style={styles.aboutDescriptionColumnContainer}>
                    <View>
                        <SmallTextGroup />
                    </View>
                    <View>
                        <SocialIcons
                            type="social-container"
                            type2="social-logo-container"
                            type3="social-logo"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.aboutImgContainer}>
                <Image style={styles.aboutImg} source={AboutImg} alt="Nike About Photo" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    aboutContainer: {
        flex: 1,
        padding: 10,
    },
    aboutTextMainContainer: {
        marginBottom: 20,
    },
    aboutDescriptionColumnContainer: {
        // Styles for this container
    },
    aboutImgContainer: {
        alignItems: 'center',
    },
    aboutImg: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
});
