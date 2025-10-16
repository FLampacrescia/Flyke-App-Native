import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Cart/Cart';

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Cart"
        >
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    );
};

export default CartStackNavigator;