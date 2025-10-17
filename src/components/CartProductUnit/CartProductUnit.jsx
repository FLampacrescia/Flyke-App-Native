import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeItem } from '../../store/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import QuantityButton from '../Buttons/QuantityButton/QuantityButton';

export default function CartProductUnit({ product }) {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (newQuantity) => {
    dispatch(updateItemQuantity({ itemId: product._id, quantity: newQuantity }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(product._id));
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri : product.image}}
        style={styles.productImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <QuantityButton
          product={product}
          updateQuantity={handleUpdateQuantity}
          isInCart={true}
        />
      </View>
      <View style={styles.summaryContainer}>
        <TouchableOpacity onPress={handleRemoveItem}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.productTotal}>
          ${new Intl.NumberFormat('es-AR').format(product.price * product.quantity)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  productTotal: {
    fontSize: 15,
    fontWeight: 600,
    marginTop: 10,
  },
});
