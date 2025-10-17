import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useTranslation } from '../../../hooks/useTranslations';
import MainTitle from "../../common/Titles/MainTitle/MainTitle";
import { colors } from "../../../theme/colors";

const HeroImg = require('../../../assets/images/bannerMob1.webp');

export default function HomeBanner({ onScrollToProducts }) {
    const { t } = useTranslation();
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={[styles.sectionBanner, { height: screenHeight * 0.795 }]}> 
            
            <ImageBackground source={HeroImg} style={styles.heroImg} resizeMode="cover">
                <View style={styles.heroTextContainer}>
                    <MainTitle text={t('hero_main_title')} classAdd={'mainTitle'} />
                    <TouchableOpacity style={styles.heroBtn} onPress={onScrollToProducts} >
                        <Text style={styles.heroBtnText}>{t('hero_btn')}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    heroImg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    heroTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: 30,
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
    },
    heroBtn: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 10,
    },
    heroBtnText: {
        fontFamily: 'Poppins-Medium',
        color: colors.textColor,
        fontSize: 15,
    }
});
