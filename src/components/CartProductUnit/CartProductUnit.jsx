import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeItem } from '../../store/slices/cartSlice';
import QuantityButton from '../Buttons/QuantityButton/QuantityButton';
import config from '../../config/env.config';
import { Ionicons } from '@expo/vector-icons';

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
        source={{ uri: `${config.FILES_URL}/products/${product.image}` }}
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
    height: '100%',
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
