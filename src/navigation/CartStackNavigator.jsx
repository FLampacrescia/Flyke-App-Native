import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Cart/Cart';
import CustomHeader from '../components/common/Headers/CustomHeader/CustomHeader';

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="CartScreen"
                component={Cart} 
                options={{ 
                    header: () => <CustomHeader title="Mi Carrito" /> 
                }} 
            />
        </Stack.Navigator>
    );
};

export default CartStackNavigator;