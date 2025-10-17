# Flyke Ecommerce - Aplicación Móvil Nativa

!['Logo Flyke'](/src/assets/images/Logo-FLYKE-Isotipo.webp)

Esta es la documentación para la app de Flyke, desarrollada con React Native y el framework de Expo. La aplicación ofrece a los usuarios una experiencia de compra fluida, permitiéndoles explorar productos, gestionar su carrito y autenticarse de forma segura.

## Alcances del Proyecto y Features

El objetivo principal de este proyecto es proporcionar una plataforma de ecommerce que cumpla con un correcto funcionamiento, profesional y estético. Las funcionalidades incluidas son:

-   **Autenticación de Usuarios:** Sistema completo de registro e inicio de sesión utilizando **Firebase Authentication** para una gestión segura de las credenciales.
-   **Persistencia de Sesión:** La sesión del usuario se mantiene activa gracias al almacenamiento local con **SQLite**, mejorando la experiencia de usuario al no tener que iniciar sesión repetidamente.
-   **Catálogo de Productos:** Visualización de productos obtenidos desde la Realtime-Database de Firebase, con una interfaz limpia y organizada en la pantalla principal.
-   **Gestión de Carrito de Compras:** Los usuarios pueden añadir productos a su carrito, modificar las cantidades o eliminarlos. El estado del carrito se gestiona de forma centralizada con **Redux Toolkit**.
-   **Navegación Intuitiva:** La aplicación cuenta con un sistema de navegación anidado que incluye un menú de pestañas inferior (Tabs Navigator) y navegadores de pila (Stack Navigator) para flujos específicos como la autenticación o el proceso de compra.
-   **Fuentes e Iconos Personalizados:** La identidad visual se mantiene mediante el uso de fuentes personalizadas y una librería de iconos.

## Librerías Utilizadas

A continuación se detallan las librerías más importantes del proyecto y el porqué de su elección:

-   **`expo`**: Framework sobre React Native que simplifica enormemente el desarrollo, la compilación y el despliegue de la aplicación, proporcionando acceso a APIs nativas (como SQLite, Fonts, etc.) a través de un ecosistema unificado.
-   **`@react-navigation/*`**: La solución estándar para la navegación en aplicaciones React Native. Se utiliza para crear la estructura de navegación principal (tabs y stacks) y gestionar el flujo entre pantallas.
-   **`@reduxjs/toolkit` y `react-redux`**: El estándar para la gestión del estado en aplicaciones React. Se utiliza para manejar el estado global, como la información del usuario autenticado, el contenido del carrito de compras y el estado de las peticiones a la API a través de **RTK Query**.
-   **`expo-sqlite`**: Permite crear y gestionar una base de datos SQLite local en el dispositivo. Es fundamental para la persistencia de la sesión del usuario de forma segura.
-   **`expo-font`**: Facilita la carga y el uso de fuentes personalizadas (`.ttf`, `.otf`) para mantener una consistencia de marca en toda la interfaz.
-   **`expo-image-picker`**: Proporciona una API para que el usuario pueda seleccionar imágenes de la galería de su dispositivo o tomar una foto, útil para funcionalidades como la actualización de la foto de perfil.
-   **`react-native-vector-icons`**: Ofrece una amplia gama de iconos personalizables que mejoran la usabilidad y el diseño de la interfaz sin necesidad de utilizar imágenes pesadas.

## Estructura de Datos en Firebase

La base de datos en Firebase Realtime Database se organiza de la siguiente manera:

Productos (/products.json)

    [{
        "__v": 0,
        "_id": "6811688850ccb598fd911f45",
        "category": "Zapatillas de Moda Unisex",
        "createdAt": "2025-04-30T00:02:16.004Z",
        "description": "descripción ejemplo 1",
        "image": "https://i.postimg.cc/fRCgYTwJ/Nike-1.webp",
        "price": 199999,
        "title": "Nike Air Force 1 '07",
        "updatedAt": "2025-04-30T00:02:16.004Z"
    },
    {
        "__v": 0,
        "_id": "68116c7a50ccb598fd911f56",
        "category": "Zapatillas Jordan para Hombre",
        "createdAt": "2025-04-30T00:19:06.113Z",
        "description": "descripción ejemplo 2",
        "image": "https://i.postimg.cc/Z5HD6KTP/Nike-2.webp",
        "price": 349999,
        "title": "Air Jordan 1 Retro High",
        "updatedAt": "2025-04-30T00:19:06.128Z"
    },
    {
        "__v": 0,
        "_id": "68116d3650ccb598fd911f5f",
        "category": "Zapatillas de Moda para Hombre",
        "createdAt": "2025-04-30T00:22:13.983Z",
        "description": "descripción ejemplo 3",
        "image": "https://i.postimg.cc/sgm05DVp/Nike-3.webp",
        "price": 249999,
        "title": "Nike Air Max 1",
        "updatedAt": "2025-04-30T00:22:14.015Z"
    },
    {
        "__v": 0,
        "_id": "68116d7f50ccb598fd911f62",
        "category": "Zapatillas de Running para Hombre",
        "createdAt": "2025-04-30T00:23:27.154Z",
        "image": "https://i.postimg.cc/vZhS5HQY/Nike-4.webp",
        "price": 219999,
        "title": "Nike Renew Run 3",
        "updatedAt": "2025-04-30T00:23:27.179Z"
    },
    {
        "__v": 0,
        "_id": "68116dd450ccb598fd911f65",
        "category": "Zapatillas de Moda para Hombre",
        "createdAt": "2025-04-30T00:24:52.622Z",
        "image": "https://i.postimg.cc/kgshWXnv/Nike-5.webp",
        "price": 199999,
        "title": "Nike Dunk Low Retro",
        "updatedAt": "2025-04-30T00:24:52.630Z"
    },
    {
        "__v": 0,
        "_id": "68116df550ccb598fd911f68",
        "category": "Zapatillas Jordan para Hombre",
        "createdAt": "2025-04-30T00:25:25.504Z",
        "image": "https://i.postimg.cc/RZdbwVMp/Nike-6.webp",
        "price": 399999,
        "title": "Air Jordan 4 Retro",
        "updatedAt": "2025-04-30T00:25:25.541Z"
    },
    {
        "__v": 0,
        "_id": "68116e2950ccb598fd911f6b",
        "category": "Zapatillas de Moda para Mujer",
        "createdAt": "2025-04-30T00:26:17.834Z",
        "image": "https://i.postimg.cc/k55Ys34v/Nike-7.webp",
        "price": 399999,
        "title": "Nike Air Max SNDR",
        "updatedAt": "2025-04-30T00:26:17.842Z"
    },
    {
        "__v": 0,
        "_id": "68116e7050ccb598fd911f70",
        "category": "Sandalias de Moda para Mujer",
        "createdAt": "2025-04-30T00:27:28.789Z",
        "image": "https://i.postimg.cc/HLLvzDxv/Nike-8.webp",
        "price": 99999,
        "title": "Nike Calm",
        "updatedAt": "2025-04-30T00:27:28.815Z"
    },
    {
        "__v": 0,
        "_id": "68116e9a50ccb598fd911f73",
        "category": "Zapatillas de Moda para Mujer",
        "createdAt": "2025-04-30T00:28:10.574Z",
        "image": "https://i.postimg.cc/QMMYmGtP/Nike-9.webp",
        "price": 159999,
        "title": "Nike Gamma Force",
        "updatedAt": "2025-04-30T00:28:10.591Z"
    }]

## Instalación y Puesta a Punto

Para instalar y ejecutar el proyecto, ingresar los siguientes comandos en consola:

1.  **Clonar el Repositorio**
    git clone https://github.com/FLampacrescia/Flyke-App-Native.git

2.  **Navegar al Directorio del Proyecto**
    cd Flyke-Ecommerce-Native

3.  **Instalar Dependencias**
    npm install

4.  **Configurar Variables de Entorno**
    -   Crear el archivo .env en la raíz del proyecto.
    -   Agregar las variables de entorno mencionadas en el chat privado.

5.  **Ejecutar la Aplicación**
    Una vez instaladas las dependencias y configurado el entorno, iniciar la aplicación según preferencia.
