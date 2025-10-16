import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import ShopStackNavigator from './ShopStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    const { token } = useSelector(state => state.user);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Shop') {
                        iconName = 'home';
                    } else if (route.name === 'CartTab') {
                        iconName = 'shopping-cart';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Shop" component={ShopStackNavigator} />
            <Tab.Screen name="CartTab" component={CartStackNavigator} />
            <Tab.Screen 
                name="Profile" 
                component={ProfileStackNavigator} 
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        if (!token) {
                            e.preventDefault();
                            navigation.navigate('AuthStack'); 
                        }
                    },
                })}
            />
        </Tab.Navigator>
    );
};

export default TabsNavigator;