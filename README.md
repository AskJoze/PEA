# Catálogo Laravel - Tienda de Productos

Este proyecto es una aplicación web de catálogo de productos desarrollada con Laravel para el backend y HTML, CSS (Tailwind), y JavaScript para el frontend. Permite gestionar productos, categorías y pedidos, integrando autenticación y almacenamiento de imágenes con Firebase.

## Descripción del Proyecto

El sistema permite a los usuarios explorar una tienda de productos, buscar, filtrar por categorías y ver detalles de cada producto. Los administradores pueden gestionar productos y categorías. El backend está construido con Laravel, utilizando migraciones para la estructura de la base de datos y controladores para la lógica de negocio. El frontend es un HTML ligero que consume los datos y ofrece una experiencia de usuario moderna y responsiva.

## Tecnologías Utilizadas

- **Backend:** [Laravel 11](https://laravel.com/) (PHP 8.2)
- **Frontend:** HTML5, [Tailwind CSS](https://tailwindcss.com/), JavaScript
- **Base de datos:** MySQL 
- **Almacenamiento de imágenes:** [Firebase Storage](https://firebase.google.com/)
- **Herramientas de desarrollo:** Composer, XAMPP 

## Estructura del Proyecto

- `catalogo-laravel/`: Código fuente del backend Laravel
  - `app/`: Modelos, controladores, servicios
  - `database/migrations/`: Migraciones de la base de datos
- `Frontend/`: Archivos del frontend (HTML, JS)

## Pasos para Clonar y Ejecutar el Sistema

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/AskJoze/PEA.git
   cd catalogo-laravel