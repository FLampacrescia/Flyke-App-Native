import { View, StyleSheet } from "react-native";
import ProductList from "../ProductList/ProductList";

export default function ProductsSection({ products }) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.sectionProducts}>
                <ProductList products={products} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    sectionProducts: {
        padding: 10,
    },
});

