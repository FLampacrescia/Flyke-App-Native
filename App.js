import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MainNavigator from './src/navigation/MainNavigator';
import { initSessionsTable } from './src/db';
import { SafeAreaProvider } from 'react-native-safe-area-context';

(async () => {
    try {
        await initSessionsTable();
        console.log("Tabla de sesiones inicializada con éxito");
    } catch (error) {
        console.error("Error al inicializar la tabla de sesiones:", error);
    }
})();

export default function App() {
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


