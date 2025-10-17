import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { store } from './src/store/store';
import MainNavigator from './src/navigation/MainNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { initSessionsTable } from './src/db';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [loaded, error] = useFonts({
        'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-BlackItalic': require('./src/assets/fonts/Poppins-BlackItalic.ttf'),
    });

    useEffect(() => {
        initSessionsTable()
            .then(() => console.log("Base de datos inicializada con éxito."))
            .catch(error => console.error("Error al inicializar la DB:", error));
    }, []);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            <Provider store={store}>
                <SafeAreaProvider>
                    <MainNavigator />
                    <StatusBar style="dark" />
                </SafeAreaProvider>
            </Provider>
        </>
    );
}