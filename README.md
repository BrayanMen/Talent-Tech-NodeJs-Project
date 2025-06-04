# FakeStoreAPI Client

Un cliente Node.js para interactuar con [FakeStoreAPI](https://fakestoreapi.com) que permite realizar operaciones CRUD sobre productos.

## 📦 Instalación
1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

## 🚀 Uso
Ejecuta los comandos desde la terminal:

## 🔍 Obtener productos
```bash
npm run start GET products          # Todos los productos
npm run start GET products <id>     # Producto específico
```

## ➕ Crear producto
```bash
npm run start POST products "<Título>" <Precio> "<Categoría>"
```

## ❌ Eliminar producto
```bash
npm run start DELETE products <id>
```

## 📋 Ejemplos
```bash
# Obtener todos los productos
npm run start GET products

# Obtener producto con ID 5
npm run start GET products 5

# Crear nuevo producto
npm run start POST products "Nuevo Producto" 99.99 "electronics"

# Eliminar producto
npm run start DELETE products 5
```

## 🛠️ Funcionalidades

1. Listar todos los productos
2. Obtener detalles de producto por ID
3. Crear nuevos productos
4. Eliminar productos existentes
5. Validación de parámetros
6. Manejo de errores

## 📄 Notas
Los precios deben ser valores numéricos
