# 🌸 Teresa Galeano - Sitio Web Profesional

Este repositorio contiene el código fuente de la página web oficial de **Teresa Galeano**, psicóloga clínica.  
El sitio fue desarrollado con **React + Vite**, usando **React Bootstrap** para la maquetación y estilos personalizados en CSS.

---

## 🚀 Tecnologías principales

- [React](https://react.dev/) (con Vite)
- [React Bootstrap](https://react-bootstrap.github.io/) para componentes responsivos
- [React Router](https://reactrouter.com/) para el enrutado interno
- [Formspree](https://formspree.io/) para el envío de formularios de contacto
- Google Ads / Google Analytics (medición de tráfico y conversiones)
- Integración con redes sociales (WhatsApp, Instagram, Facebook, YouTube, LinkedIn)
- Deploy en [Vercel](https://vercel.com/)

---

## 📂 Estructura de carpetas

src/
├── assets/ # Imágenes, íconos, ilustraciones
├── components/ # Componentes reutilizables (NavBar, Footer, etc.)
├── hooks/ # Hooks personalizados (ej. useReveal para animaciones)
├── pages/ # Páginas principales (Home, Servicios, Blog, Contacto, etc.)
├── styles/ # Archivos CSS modulares
├── siteConfig.js # Configuración general (marca, email, teléfono, redes, etc.)
└── main.jsx # Punto de entrada


---

## 🖥️ Páginas incluidas

- **Inicio** (`/`)
- **Acerca de mí** (`/acerca`)
- **Servicios** (`/servicios`)
- **Testimonios** (`/#testimonios`)
- **Blog** (`/blog`)
- **Contacto** (`/contacto`)
- **Política de Privacidad** (`/privacidad`)

---

## ⚙️ Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/nombre-del-repo.git
   cd nombre-del-repo

    Instalar dependencias:

npm install

Crear un archivo de configuración en src/siteConfig.js (ya existe un ejemplo):

export default {
  brand: "Teresa Galeano",
  email: "correo@ejemplo.com",
  phone: "+595 000 000 000",
  address: "Dirección del consultorio",
  mapsUrl: "https://goo.gl/maps/ejemplo",
  mapsEmbedSrc: "https://www.google.com/maps/embed?...",
  hours: "Lun-Vie 08:00 - 18:00",
  whatsapp: "+595 000 000 000",
  bookingUrl: "", // opcional
  formspreeId: "xxxxxxx", // ID del formulario en Formspree
  social: {
    instagram: "https://instagram.com/...",
    facebook: "https://facebook.com/...",
    youtube: "https://youtube.com/...",
    linkedin: "https://linkedin.com/..."
  },
  privacyUrl: "/privacidad"
};

Ejecutar en modo desarrollo:

npm run dev

Build de producción:

    npm run build

🔒 Privacidad y cumplimiento

El sitio incluye una Política de Privacidad

que explica el uso de:

    Google Ads / Analytics

    Formularios con Formspree

    WhatsApp prellenado

    Google Maps embed

    Enlaces a redes sociales

    Cookies para analítica y funcionamiento

🖌️ Estilo y diseño

    Paleta de colores: tonos salmón, azul oscuro y blanco

    Layout responsive y accesible

    Animaciones suaves con CSS y hook useReveal

    Blog con layout tipo masonry

📦 Deploy

Este proyecto está optimizado para Vercel.
Para hacer deploy:

npm run build

y luego subir la carpeta dist/ a tu hosting, o conectar directamente el repo a Vercel.
👨‍💻 Créditos

Desarrollado con ❤️ en 🇵🇾 por
Fede Barrios
