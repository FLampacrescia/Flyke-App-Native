import { View, Text, StyleSheet } from 'react-native';

export default function ProductDescription({ product }) {
    return (
        <View style={styles.container}>
            <View style={styles.summaryContainer}>
                <Text style={styles.title}>
                    {product.secondaryInfoTitle || "DESCRIPCIÓN"}
                </Text>
                <Text style={styles.description}>
                    {product.secondaryInfo || "Sin descripción adicional disponible."}
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>DETALLES</Text>
                <Text style={styles.detailItem}>
                    • Los revestimientos cosidos en la parte superior agregan un estilo de herencia con durabilidad y soporte.
                </Text>
                <Text style={styles.detailItem}>
                    • Diseñada originalmente para el básquetbol de alto rendimiento, la amortiguación Nike Air agrega comodidad ligera durante todo el día.
                </Text>
                <Text style={styles.detailItem}>
                    • El estilo de corte low ofrece un look impecable y estilizado.
                </Text>
                <Text style={styles.detailItem}>
                    • La zona del tobillo acolchada es suave y cómoda.
                </Text>
                <Text style={styles.detailItem}>
                    • Entresuela de espuma
                </Text>
                <Text style={styles.detailItem}>
                    • Perforaciones en la punta
                </Text>
                <Text style={styles.detailItem}>
                    • Suela de goma
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    summaryContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
        color: '#121212',
    },
    description: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        lineHeight: 24,
        color: '#777',
    },
    detailItem: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        lineHeight: 24,
        color: '#777',
        marginBottom: 5,
    }
});

