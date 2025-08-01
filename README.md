# Natbladh - Aplicación de Seguimiento Diario

Aplicación web para el seguimiento diario de eventos corporales y factores relacionados.

## Configuración inicial

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Ve a Project Settings > General > Your apps
5. Añade una aplicación web
6. Copia la configuración de Firebase
7. Pega la configuración en `src/firebase.js` reemplazando los valores placeholder

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

## Estructura de datos

La aplicación maneja registros diarios con la siguiente estructura:

```javascript
{
  "date": "2025-08-01",
  "lekar": [
    {
      "tími": "14:30",
      "aðvarun": true,
      "styrkur": 2,
      "inní": 1,
      "þörf": 2
    }
  ],
  "fjöldi leka": 1, // calculado automáticamente
  "upplýsingar": {
    "hvar": "casa",
    "kaffi": 2,
    "áfengi": false,
    "æfing": 1,
    "seðl": false,
    "lip-riv": "10:00",
    "síð lio": "12:00",
    "kvöldmat": "20:00",
    "að sofa": "23:00",
    "natft": false,
    "bl": false,
    "pap": false
  },
  "athugasemd": "Comentarios adicionales"
}
```

## Características

- **Formulario responsivo**: Optimizado para móvil, tableta y escritorio
- **Gestión de lekar**: Añadir/eliminar múltiples eventos por día
- **Visualización de datos**: Estadísticas y lista de registros históricos
- **Base de datos en tiempo real**: Almacenamiento en Firestore
- **Interfaz en islandés**: Etiquetas y textos en el idioma original

## Despliegue

### Firebase Hosting

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify

1. Build: `npm run build`
2. Publish directory: `dist`
3. Deploy

## Tecnologías utilizadas

- React 18
- Vite
- Firebase (Firestore)
- Tailwind CSS
- date-fns
