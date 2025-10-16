import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuantitySelector = ({ quantity, setQuantity }) => {
    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increment} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function ProductMainInfo({ product }) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItem({ product, quantity }));
        alert('Producto agregado al carrito');
    };

    return (
        <View style={styles.container}>
            <Image 
                style={styles.productImage} 
                source={{ uri : product.image}}
            />
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <Text style={styles.productCategory}>{product.category}</Text>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <Text style={styles.feeText}>{`Hasta 6 cuotas de $${parseInt(product.price / 6)} sin interés`}</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Cantidad</Text>
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                </View>

                <View style={styles.shipmentContainer}>
                    <Icon name="truck" size={20} color="#27AE60" />
                    <Text style={styles.shipmentText}>Este producto tiene <Text style={{fontWeight: 'bold'}}>envío gratis a todo el país</Text>.</Text>
                </View>

                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartButtonText}>Agregar al Carrito</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productImage: {
        width: '100%',
        aspectRatio: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    infoContainer: {
        padding: 20,
    },
    titleContainer: {
        marginBottom: 15,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#121212',
    },
    productCategory: {
        fontSize: 16,
        color: '#777',
        marginTop: 4,
    },
    priceContainer: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#121212',
    },
    feeText: {
        fontSize: 14,
        color: '#23a057ff',
        marginTop: 5,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 40,
        height: 40,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 20,
    },
    shipmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#e8f5e9',
        padding: 10,
        borderRadius: 8,
    },
    shipmentText: {
        marginLeft: 10,
        fontSize: 13,
        color: '#121212',
    },
    addToCartButton: {
        backgroundColor: '#121212',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

