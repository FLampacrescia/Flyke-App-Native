import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from "../../../../store/slices/cartSlice";
// import { addToWishlist, removeFromWishlist } from "../../../../store/slices/wishlistSlice";
import { useTranslation } from '../../../../hooks/useTranslations';

export default function ProductCard({ product }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // const wishlistItems = useSelector(state => state.wishlist.items);
    // const isInWishlist = wishlistItems.some((item) => item._id === product._id);

    const handleNavigate = () => {
        navigation.navigate('ProductDetail', { productId: product._id });
    };

    // const handleToggleWishlist = () => {
    //     if (isInWishlist) {
    //         dispatch(removeFromWishlist(product._id));
    //     } else {
    //         dispatch(addToWishlist(product));
    //     }
    // };

    const handleAddToCart = () => {
        dispatch(addItem({ product, quantity: 1 }));
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
            {/* <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name={isInWishlist ? "heart" : "heart-o"} size={22} color={isInWishlist ? "#D9534F" : "#555"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddToCart} style={styles.iconButton}>
                    <Icon name="shopping-cart" size={22} color="#555" />
                </TouchableOpacity>
            </View> */}
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
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});
