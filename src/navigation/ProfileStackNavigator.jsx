import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyAccount from '../screens/MyAccount/MyAccount'; // Assuming this screen exists

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="MyAccount"
        >
            <Stack.Screen name="MyAccount" component={MyAccount} />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
