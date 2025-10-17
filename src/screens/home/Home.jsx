import { useRef, useState } from "react";
import { StyleSheet, FlatList, View, Text, ActivityIndicator } from "react-native";
import ProductCard from "../../components/Home/ProductsSection/ProductCard/ProductCard";
import { useGetProductsQuery } from "../../store/services/shopApi";
import HomeBanner from "../../components/Home/HomeBanner/HomeBanner"; 
import FeaturesSection from '../../components/Home/FeaturesSection/FeaturesSection';
import { colors } from "../../theme/colors";

export default function Home() {
    const { data: products, error, isLoading } = useGetProductsQuery();
    const [bannerHeight, setBannerHeight] = useState(0);

    const flatListRef = useRef(null);

    const scrollToProducts = () => {
        if (flatListRef.current && bannerHeight > 0) {
            flatListRef.current.scrollToOffset({
                offset: bannerHeight,
                animated: true 
            });
        }
    };

    const HomeListHeader = () => (
        <>
            <View onLayout={(event) => setBannerHeight(event.nativeEvent.layout.height)}>
                <HomeBanner onScrollToProducts={scrollToProducts} /> 
            </View>
            <Text style={styles.productsTitle}>Productos Destacados</Text> 
        </>
    );

    const HomeListFooter = () => (
        <FeaturesSection />
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error al cargar los productos.</Text>
            </View>
        );
    }

    return (
        <FlatList
            ref={flatListRef}
            style={styles.container} 
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item._id.toString()}
            numColumns={2}
            ListHeaderComponent={HomeListHeader}
            ListFooterComponent={HomeListFooter}
            columnWrapperStyle={styles.row}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productsTitle: {
        fontSize: 21,
        fontFamily: 'Poppins-SemiBold',
        paddingHorizontal: 25,
        paddingVertical: 25,
        color: colors.textColor,
    },
    row: {
        justifyContent: 'space-around', 
        paddingHorizontal: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});