import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import ProductCard from '../../components/Home/ProductsSection/ProductCard/ProductCard'; 
import { useGetProductsQuery } from '../../store/services/shopApi';
import { colors } from '../../theme/colors';

export default function SearchScreen() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const { data: allProducts, isLoading } = useGetProductsQuery();

    useEffect(() => {
        if (allProducts && searchText.length > 2) {
            const results = allProducts.filter(product => 
                product.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchText, allProducts]);

    const handleSearch = (query) => {
        setSearchText(query);
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Escribe para buscar productos..."
                    value={searchText}
                    onChangeText={handleSearch}
                    autoFocus={true}
                    clearButtonMode="while-editing"
                />
            </View>

            <FlatList
                data={searchResults}
                keyExtractor={(item) => item._id}
                numColumns={2}
                renderItem={({ item }) => <ProductCard product={item} />}
                contentContainerStyle={styles.list}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={() => (
                    searchText.length > 2 ? (
                        <Text style={styles.emptyText}>No hay resultados para "{searchText}"</Text>
                    ) : null
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: -40,
        padding: 15,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 50,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: colors.textColorWhite,
        borderRadius: 25,
    },
    list: {
        padding: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
        fontSize: 16,
    }
});