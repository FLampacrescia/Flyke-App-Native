import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import About from '../screens/about/About';
import ProductDetail from '../screens/ProductDetail/ProductDetail';
import HomeHeaderCustom from '../components/common/Headers/HomeHeaderCustom/HomeHeaderCustom';
import Search from '../screens/Search/Search';
import CustomHeader from '../components/common/Headers/CustomHeader/CustomHeader';

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
                options={{ header: () => <CustomHeader title="Detalles del Producto" /> }}
            />

            <Stack.Screen 
                name="Search" 
                component={Search} 
                options={{ header: () => <CustomHeader title="Buscar Producto" /> }}
            />

            <Stack.Screen 
                name="About" 
                component={About} 
                options={{ 
                    header: () => <CustomHeader title="Acerca de Nosotros" /> 
                }} 
            />
        </Stack.Navigator>
    );
};

export default ShopStackNavigator;