import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuantityButton({ product, updateQuantity, isInCart = false }) {
  // Estado local si no está en el carrito (ej. en la página de detalles del producto)
  const [localQuantity, setLocalQuantity] = useState(1);

  const quantity = isInCart ? product.quantity : localQuantity;

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    if (isInCart) {
      updateQuantity(newQuantity);
    } else {
      setLocalQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    if (isInCart) {
      updateQuantity(newQuantity);
    } else {
      setLocalQuantity(newQuantity);
    }
  };

  const handleInputChange = (text) => {
    const value = parseInt(text, 10);
    const newQuantity = isNaN(value) || value < 1 ? 1 : value;
    if (isInCart) {
      updateQuantity(newQuantity);
    } else {
      setLocalQuantity(newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={String(quantity)}
        onChangeText={handleInputChange}
        keyboardType="number-pad"
        textAlign="center"
      />
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
});


