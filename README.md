# **MixArt 🛍️🎨🖼️**

Una galería de arte en línea donde la creatividad y el comercio se encuentran.

## 📋 Tabla de Contenidos
- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuraciones](#-configuraciones)
- [Equipo de Desarrollo](#-equipo-de-desarrollo)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🎨 Descripción del Proyecto

**MixArt** es una innovadora tienda en línea especializada en arte y materiales artísticos. Nuestra plataforma conecta a artistas, coleccionistas y entusiastas del arte en un espacio digital donde pueden:
- **Descubrir y adquirir** obras de arte únicas de artistas locales e internacionales
- **Encontrar materiales** de alta calidad para la creación artística
- **Explorar diferentes técnicas** y estilos artísticos
- **Conectar con la comunidad** artística

### Misión
Promover la creatividad, inspiración, comunicación de mensajes y belleza a través del arte, facilitando el acceso tanto a obras terminadas como a los materiales necesarios para crearlas.

### Visión
Convertirnos en la tienda de arte #1 en la región, estableciendo colaboraciones significativas con una amplia variedad de artistas y siendo el punto de referencia para la comunidad artística.

## ✨ Características Principales
- **Catálogo Diverso**: Amplia selección de obras de arte y materiales artísticos
- **Interfaz Intuitiva**: Diseño moderno y responsivo para una experiencia de usuario óptima
- **Navegación Fluida**: Sistema de routing eficiente con React Router
- **Animaciones Elegantes**: Transiciones suaves powered by Framer Motion
- **Diseño Responsivo**: Adaptable a todos los dispositivos y tamaños de pantalla
- **Iconografía Rica**: Integración de múltiples librerías de iconos para mejor UX

## 🛠️ Tecnologías Utilizadas
### Frontend Framework
- **React** - Librería principal para la construcción de la interfaz
- **React DOM** - Renderizado de componentes React
- **TypeScript** - Superset de JavaScript con tipado estático

### Routing y Navegación
- **React Router DOM** - Manejo de rutas y navegación SPA

### Estilos y UI
- **TailwindCSS** - Framework CSS utility-first
- **Tailgrids** - Componentes de grid prediseñados
- **Classnames** - Utilidad para manejo condicional de clases CSS

### Iconografía
- **React Icons (Fa)** - Iconos de Font Awesome
- **React Icons (Fi)** - Iconos de Feather
- **Lucide React** - Iconos modernos y minimalistas
- **Font Awesome Free** - Conjunto completo de iconos FA
- **Font Awesome SVG Core** - Core para iconos SVG
- **Font Awesome SVG Icons** - Iconos SVG de Font Awesome

### Herramientas de Desarrollo
- **Node.js** - Entorno de ejecución para gestión de dependencias
- **npm** - Gestor de paquetes

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16.0 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. **Instalar dependencias**
   ```bash
   cd backend & cd frontend-public/frontend-private
   npm install
   ```

3. **Iniciar el servidor de desarrollo (backend & frontend)**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   La aplicación estará disponible en `coming soon`

## 📁 Estructura del Proyecto

```
mixart/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── table/
│   │   ├── buttons/
│   │   └── misc/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── utils/
│   ├── hooks/
│   ├── types/
│   ├── App.jsx
│   └── index.jsx
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`
Ejecuta la aplicación en modo de desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.
Optimiza la construcción para el mejor rendimiento.

### `npm test`
Lanza el corredor de pruebas en modo interactivo.

### `npm run eject`
**Nota: esta es una operación de un solo sentido. ¡Una vez que hagas `eject`, no puedes volver atrás!**

## ⚙️ Configuraciones

### Tailwind CSS
El archivo `tailwind.config.js` contiene todas las configuraciones personalizadas:

- **Content**: Especifica los archivos a analizar para clases de Tailwind
- **Theme**: Define el tema personalizado incluyendo:
  - Tipografías personalizadas
  - Paleta de colores del proyecto
  - Espaciados específicos
  - Breakpoints responsivos
- **SafeList**: Incluye todas las clases de iconos Font Awesome para evitar purging
- **Plugins**: 
  - `@tailwindcss/forms` para estilizado de formularios
  - `Tailgrids` para componentes de grid

### TypeScript
Configuración incluida para tipado estático y mejor experiencia de desarrollo.

## 👥 Equipo de Desarrollo

| Nombre | Rol | Especialización |
|--------|-----|----------------|
| **Aldo André Molina Maldonado** | Desarrollador Frontend | UI/UX, Componentes React |
| **Juan Pablo Ayala Menjivar** | Desarrollador Frontend | Routing, Estado de la aplicación |
| **Rafael Alejandro Menéndez Alfaro** | Desarrollador Frontend | Estilos, Animaciones |

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- Usar TypeScript para tipado estático
- Seguir las convenciones de naming de React
- Mantener componentes pequeños y reutilizables
- Comentar código complejo
- Usar TailwindCSS para estilos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Contacto y Soporte

Para preguntas, sugerencias o soporte técnico, no dudes en contactar al equipo de desarrollo.

---

**¡Gracias por ser parte de MixArt! 🎨**

*Donde el arte cobra vida digital*

































































































































































































































































































































































































































































































































