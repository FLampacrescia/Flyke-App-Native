import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from '../../../hooks/useTranslations';
import { useNavigation } from '@react-navigation/native';
import MainTitle from "../../common/Titles/MainTitle/MainTitle";
import { colors } from "../../../theme/colors";

const FeaturesBackgroundImg = require("../../../assets/images/features-banner1.webp");
const FeaturesAboutImg = require("../../../assets/images/NikeAbt1.webp")

const Feature = ({ iconName, title, description }) => (
    <View style={styles.feature}>
        <View style={styles.featureIconContainer}>
            <Icon name={iconName} style={styles.featureIcon} />
        </View>
        <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDescription}>{description}</Text>
        </View>
    </View>
);

export default function FeaturesSection() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const featuresData = [
        {
            iconName: "truck",
            title: t('mainpage_features_subtitle_1'),
            description: t('mainpage_features_description_1'),
            buttonText: t('mainpage_features_btn'),
        },
        {
            iconName: "credit-card",
            title: t('mainpage_features_subtitle_2'),
            description: t('mainpage_features_description_2'),
            buttonText: t('mainpage_features_btn'),
        },
        {
            iconName: "dropbox",
            title: t('mainpage_features_subtitle_3'),
            description: t('mainpage_features_description_3'),
            buttonText: t('mainpage_features_btn'),
        }
    ];

    const handleNavigateToAbout = () => {
        navigation.navigate('About');
    };

    return (
        <View style={styles.sectionFeatures}>
            <ImageBackground style={styles.featuresBackgroundImg} source={FeaturesBackgroundImg} resizeMode="cover">
                <View style={styles.featuresBannerTextContainer}>
                    <MainTitle text={t('mainpage_features_title')} classAdd={'mainTitle'} />
                </View>
            </ImageBackground>
            <View style={styles.featuresMainContainer}>
                {featuresData.map((feature, index) => (
                    <Feature key={index} {...feature} />
                ))}
            </View>
            <ImageBackground style={styles.featuresAboutImg} source={FeaturesAboutImg} resizeMode="cover">
                <View style={styles.featuresAboutBannerContainer}>
                    <MainTitle text={t('mainpage_features_about')} classAdd={'mainTitle'} />
                    <TouchableOpacity style={styles.featuresBtn} onPress={handleNavigateToAbout}>
                        <Text style={styles.featuresBtnText}>{t('mainpage_features_about_btn')}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionFeatures: {
        backgroundColor: '#fff',
        marginTop: 30,
    },
    featuresBackgroundImg: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        overflow: 'hidden', 
    },
    featuresBannerTextContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    featuresMainContainer: {
        marginTop: 5,
        paddingHorizontal: 25,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: '#fff',
        padding: 15,
    },
    featureIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderWidth: 1,
        color: colors.textColor,
        backgroundColor: '#f7f7f7ff',
    },
    featureIcon: {
        fontSize: 28,
        color: '#333',
    },
    featureTextContainer: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: colors.textColor,
    },
    featureDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12.5,
        color: colors.textColorGray,
        marginVertical: 5,
    },
    featuresAboutImg: {
        width: '100%',
        height: 160,
        overflow: 'hidden', 
        justifyContent: 'center',
    },
    featuresAboutBannerContainer: {
        marginTop: 30,
    },
    featuresBtn: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginHorizontal: 'auto',
        marginTop: 5,
        marginBottom: 40,
    },
    featuresBtnText: {
        color: colors.textColor,
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        textAlign: 'center',
    }
});