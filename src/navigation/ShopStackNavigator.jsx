import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import ProductDetail from '../screens/ProductDetail/ProductDetail';
import HomeHeaderCustom from '../components/Common/Headers/HomeHeaderCustom/HomeHeaderCustom';
import SearchScreen from '../screens/Search/SearchScreen';

const Stack = createNativeStackNavigator();

const ShopStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    header: ({ navigation, route }) => (
                        <HomeHeaderCustom navigation={navigation} route={route} />
                    ),
                }} 
            />

            <Stack.Screen 
                name="ProductDetail" 
                component={ProductDetail} 
            />

            <Stack.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{
                    title: 'Buscar Productos', // Título estándar para la barra superior
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: '#000', // Color de la flecha de retroceso
                }}
            />
        </Stack.Navigator>
    );
};

export default ShopStackNavigator;