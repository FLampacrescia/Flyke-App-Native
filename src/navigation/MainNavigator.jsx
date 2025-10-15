import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import AuthStackNavigator from './AuthStackNavigator';
import TabsNavigator from './TabsNavigator';
import { getSession } from '../db';
import { setUser, setProfileImage } from '../store/slices/userSlice';
import { useGetProfilePictureQuery } from '../store/services/profileApi';
import React, { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    const dispatch = useDispatch();
    const { localId, token } = useSelector(state => state.user);
    
    const { data: profileImage } = useGetProfilePictureQuery(localId, {
        skip: !localId,
    });

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (session) {
                dispatch(setUser(session));
            }
        };
        fetchSession();
    }, [dispatch]);

    useEffect(() => {
        if (profileImage) {
            dispatch(setProfileImage(profileImage.image));
        }
    }, [profileImage, dispatch]);

    return (
        <NavigationContainer>
            {token ? <TabsNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

export default MainNavigator;