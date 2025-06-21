# 💻 Frontend - Sistema de Gestión de Turnos para Clínicas y Consultorios

Este proyecto es parte del trabajo integrador final de la materia **Prácticas Profesionalizantes IV**. Se trata de una **aplicación web frontend** desarrollada con **React** y **Next.js**, que permite a los usuarios (pacientes, médicos y administradores) interactuar con el sistema de turnos médicos.

---

## Grupo 9:

-  Silvina Villanueva
-  Florencia Casanova
-  Pamela Gómez
-  Verónica Menéndez
-  Soledad Aldao

---

## 📌 Objetivos del Proyecto

-  Permitir el **login de usuarios** según su rol (paciente, médico, administrador).
-  Mostrar interfaces personalizadas según el tipo de usuario.
-  Visualizar y gestionar turnos médicos.
-  Acceder a mensajes, notificaciones y encuestas de satisfacción.
-  Brindar una experiencia de usuario clara y responsiva.

---

## 🚀 Tecnologías y Librerías

-  **Next.js** - Framework de React para renderizado del lado del cliente y servidor.
-  **React** - Biblioteca para construir interfaces de usuario.
-  **Emotion** - Librería para estilos con `styled-components`.
-  **Next Auth (o custom hooks)** - Manejo de autenticación de usuarios.
-  **Next Navigation** - Navegación entre páginas.

---

## 🗂️ Estructura de carpetas

La organización del proyecto sigue una estructura modular dentro de la carpeta `src`, optimizada para proyectos con App Router de Next.js:

```bash
src/
├── api/          # Servicios para conexión con el backend
├── app/          # Sistema de rutas y vistas principales (App Router)
│   └── (page.tsx, layout.tsx, etc.)
├── components/   # Componentes reutilizables y genéricos
├── context/      # Proveedores y estados globales (Auth)
├── hooks/        # Custom hooks
utils/            # Funciones auxiliares de uso general
```

---

## ⚙️ Instalación y ejecución

1. **Clonar el repositorio**

```bash
git clone git@github.com:solealdao/proyecto-integrador-PPIV.git
cd proyecto-integrador-fe-ppiv
```

2. **Instalar dependencias**
   El proyecto requiere a partir de estas versiones de Node: ^18.18.0 || ^19.8.0 || >= 20.0.0

```bash
npm install
```

3. **Configurar variables de entorno**

```
NEXT_PUBLIC_API_URL=http://localhost:4001
```

4. **Correr el servidor de desarrollo**

```bash
npm run dev
```
