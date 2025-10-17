import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors } from "../../../../theme/colors";

export default function ProductCard({ product }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleNavigate = () => {
        navigation.navigate('ProductDetail', { productId: product._id });
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={handleNavigate} style={styles.touchableArea}>
                <Image source={{ uri : product.image}} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        maxWidth: '48%',
        margin: '1%',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#f2f2f2',
    },
    touchableArea: {
        flex: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
    },
    infoContainer: {
        padding: 12,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: colors.textColor,
    },
    price: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13.6,
        color: colors.textColorGray,
        marginTop: 5,
    },
});
