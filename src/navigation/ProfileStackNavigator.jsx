import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyAccount from '../screens/MyAccount/MyAccount';
import ProfileHeaderCustom from '../components/common/Headers/ProfileHeaderCustom/ProfileHeaderCustom';
import MyProfile from '../screens/MyProfile/MyProfile';
import Wishlist from '../screens/Wishlist/Wishlist';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="MyAccount"
            screenOptions={{
                header: ({ navigation, route }) => (
                    <ProfileHeaderCustom navigation={navigation} route={route} />
                ),
            }}
        >
            <Stack.Screen name="MyAccount" component={MyAccount} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            <Stack.Screen name="Wishlist" component={Wishlist} />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;