import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from '../../../hooks/useTranslations';

const FeaturesBackgroundImg = require("../../../assets/images/features-banner.webp");

const Feature = ({ iconName, title, description, buttonText, iconColor }) => (
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

    return (
        <View style={styles.sectionFeatures}>
                <ImageBackground style={styles.featuresBackgroundImg} source={FeaturesBackgroundImg} resizeMode="cover">
                    <View style={styles.featuresBannerTextContainer}>
                        <Text style={styles.mainTitle}>{t('mainpage_features_title')}</Text>
                    </View>
                </ImageBackground>
            <View style={styles.featuresMainContainer}>
                {featuresData.map((feature, index) => (
                    <Feature key={index} {...feature} />
                ))}
            </View>
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '900',
        fontStyle: 'italic',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#fff',
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
        borderColor: '#333',
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
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
    },
    featureDescription: {
        fontSize: 13,
        color: '#666',
        marginVertical: 5,
    },
});