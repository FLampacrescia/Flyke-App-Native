import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import AuthStackNavigator from './AuthStackNavigator';
import TabsNavigator from './TabsNavigator';
import { getSession } from '../db';
import { setUser, setProfileImage } from '../store/slices/userSlice';
import { useGetProfilePictureQuery } from '../store/services/profileApi';
import React, { useEffect, useState } from 'react'; 
import { View, Text, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    const dispatch = useDispatch();
    const localId = useSelector(state => state.user.localId);
    const [isSessionChecked, setIsSessionChecked] = useState(false);
    
    const { data: profileImage } = useGetProfilePictureQuery(localId, {
        skip: !localId,
    });

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getSession();
                if (session) {
                    dispatch(setUser(session));
                }
            } catch (error) {
                console.error("Error al obtener la sesión:", error);
            } finally {
                setIsSessionChecked(true);
            }
        };
        fetchSession();
    }, [dispatch]);

    useEffect(() => {
        if (profileImage) {
            dispatch(setProfileImage(profileImage.image));
        }
    }, [profileImage, dispatch]);

    if (!isSessionChecked) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>Cargando aplicación...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* 1. La app principal (Tabs) es la pantalla por defecto y siempre accesible */}
                <Stack.Screen name="AppTabs" component={TabsNavigator} />
                {/* 2. El Stack de Autenticación está disponible para navegar hacia él cuando sea necesario */}
                <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;