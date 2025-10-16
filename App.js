import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MainNavigator from './src/navigation/MainNavigator';
import { initSessionsTable } from './src/db';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';

export default function App() {

    useEffect(() => {
        initSessionsTable()
            .then(() => console.log("Base de datos inicializada con éxito."))
            .catch(error => console.error("Error al inicializar la DB:", error));
    }, []);

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