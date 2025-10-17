import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../../store/slices/cartSlice';
import { useTranslation } from '../../hooks/useTranslations';
import CartProductUnit from '../../components/CartProductUnit/CartProductUnit';

export default function Cart() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items: cartItems, total } = useSelector((state) => state.cart);
  const { email } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(t('cart_empty_warning'));
      return;
    }

    if (email) {
      Alert.alert("No disponible", "La funcionalidad de Checkout aún no está implementada.");
    } else {
            Alert.alert(
                t('login_required_title') || 'Inicio de Sesión Requerido',
                t('login_required_message') || 'Necesitas iniciar sesión para continuar.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Ir a Login', onPress: () => navigation.navigate('AuthStack') } 
                ]
            );
        }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartProductUnit product={item} />}
        keyExtractor={(item) => item._id.toString()}
        ListEmptyComponent={<View style={styles.emptyContainer}><Text style={styles.emptyText}>{t('cart_empty')}</Text></View>}
      />
      <View style={styles.footer}>
        <Text style={styles.totalTitle}>TOTAL</Text>
        <Text style={styles.totalAmount}>
          ${new Intl.NumberFormat('es-AR').format(total)}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleCheckout}>
          <Text style={styles.primaryButtonText}>{t('cart_btn_primary') || 'PROCEDER AL PAGO'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleClearCart}>
          <Text style={styles.secondaryButtonText}>{t('cart_btn_secondary') || 'VACIAR CARRITO'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonsContainer: {
    padding: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderRadius: 30,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: '#121212',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
