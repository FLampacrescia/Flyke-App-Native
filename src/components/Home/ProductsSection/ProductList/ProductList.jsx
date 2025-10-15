import { useEffect, useState } from "react";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';
import ProductCard from "../ProductCard/ProductCard";
import api from "../../../../utils/axiosInstance";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            setLoadingProducts(true);
            const response = await api.get(`${config.API_URL}/products`);
            const products = response.data.products;
            // Using a timeout to simulate network latency, can be removed.
            setTimeout(() => {
                setProducts(products);
                setLoadingProducts(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoadingProducts(false);
        }
    }
    
    if (loadingProducts) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>{t('loader_loading_products_message')}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item._id}
            style={styles.list}
            numColumns={2} // Display products in a 2-column grid
            columnWrapperStyle={styles.row}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    list: {
        paddingHorizontal: 5,
    },
    row: {
        flex: 1,
        justifyContent: "space-around",
    }
});
