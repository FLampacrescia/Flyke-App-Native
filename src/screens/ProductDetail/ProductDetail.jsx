import { useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import ProductDescription from "../../components/ProductDetail/ProductDescription/ProductDescription";
import ProductMainInfo from "../../components/ProductDetail/ProductMainInfo/ProductMainInfo";
import { useGetProductByIdQuery } from '../../store/services/shopApi';

export default function ProductDetail() {
    const route = useRoute();
    const { productId } = route.params;

    const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorMsg}>Producto no encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <ProductMainInfo product={product} />
            <ProductDescription product={product} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMsg: {
        fontSize: 18,
        color: 'red',
    },
    container: {
        flex: 1,
    }
});

