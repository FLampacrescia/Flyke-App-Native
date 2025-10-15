import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
// Asumo que tienes un componente ProductCard ya migrado
// import ProductCard from '../../components/Home/ProductsSection/ProductCard/ProductCard'; 
// Asumo que tienes una forma de obtener todos los productos para filtrar

export default function SearchScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    // **Nota:** En un proyecto real, usarías un hook para buscar/filtrar productos en la API/Store
    const [searchResults, setSearchResults] = useState([]);

    // Simulación de búsqueda (debes reemplazar esto con la lógica de tu API)
    const handleSearch = (query) => {
        setSearchText(query);
        if (query.length > 2) {
            // Lógica real: llama a tu función API de búsqueda (ej. api.searchProducts(query))
            // Por ahora, simularemos un resultado
            console.log("Buscando en API:", query);
            setSearchResults([{ _id: '1', name: 'Zapatilla Buscada' }, { _id: '2', name: 'Producto Filtrado' }]);
        } else {
            setSearchResults([]);
        }
    };

    return (
        // SafeAreaView es importante para evitar que el contenido se solape con la barra de estado/notch
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Escribe para buscar productos..."
                value={searchText}
                onChangeText={handleSearch}
                autoFocus={true} // Abre el teclado automáticamente
            />

            {/* Lista de Resultados */}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item._id}
                numColumns={2}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                    // Reemplazar con tu ProductCard:
                    // <ProductCard product={item} />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => <Text style={styles.emptyText}>No hay resultados para "{searchText}"</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 50,
        margin: 15,
        paddingHorizontal: 15,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
    },
    list: {
        paddingHorizontal: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
        fontSize: 16,
    }
});