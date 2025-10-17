import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyAccount from '../screens/MyAccount/MyAccount';
import MyProfile from '../screens/MyProfile/MyProfile';
import Wishlist from '../screens/Wishlist/Wishlist';
import CustomHeader from '../components/common/Headers/CustomHeader/CustomHeader';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="MyAccount"
            screenOptions={{
                header: (props) => <CustomHeader {...props} />,
            }}
        >
            <Stack.Screen name="MyAccount" component={MyAccount} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            <Stack.Screen name="Wishlist" component={Wishlist} />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;