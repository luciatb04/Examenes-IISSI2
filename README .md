# Examen DeliverUS - Octubre

Recuerde que DeliverUS está descrito en: <https://github.com/IISSI2-IS-2025>

## Enunciado del examen

Tenemos que incorporar un nuevo requisito en la aplicación DeliverUS que consiste en que las categorías de productos pueden editarse por los dueños de los restaurantes, de modo que cada restaurante tendrá sus propias categorías de productos. Se nos ha proporcionado el siguiente modelado conceptual:

![Modelo conceptual](./DeliverUS-EntityDiagram-ProductCategory.drawio.svg)

Es necesaria la implementación de los siguientes requisitos funcionales:

### RF1. Listado de Categorías de productos

Como propietario,
quiero listar todas las categorías de producto de mi restaurante

**Ruta:** `GET /productCategories/restaurants/:restaurantId`

**Pruebas de aceptación:**

- Devuelve un array con todas las categorías de productos del restaurante especificado. El objeto json que devuelve debe tener la forma del ejemplo siguiente:

  ```Javascript
  [{
      id: 1,
      restaurantId: 1,
      name: "Starters"
      createdAt: "2025-03-12T16:33:20.000Z",
      updatedAt: "2025-03-12T16:33:20.000Z",
  },
  {
      id: 2,
      restaurantId: 1,
      name: "Sides"
      createdAt: "2025-03-12T16:33:20.000Z",
      updatedAt: "2025-03-12T16:33:20.000Z",
  }]
  ```

- Devuelve código `401` si el usuario no está autenticado.
- Devuelve código `403` si el usuario no es propietario del restaurante.
- Devuelve código `404` si el restaurante no existe.

### RF2. Creación de categoría de producto

Como propietario,
quiero crear una nueva categoría de producto
para asignarlo a mis productos

**Ruta:** `POST /productCategories/restaurants/:restaurantId`

- La categoría de producto creada contiene el atributo `name`. Recibe un objeto json en el cuerpo de la petición con la forma del siguiente ejemplo:

  ```Javascript
      {
          restaurantId: 1,
          name: "Nueva Categoría"
      }
  ```

- Devuelve código `401` si el usuario no está autenticado.
- Devuelve código `403` si el usuario no es propietario del restaurante.
- Devuelve código `404` si el restaurante no existe.
- Devuelve código `422` si faltan atributos o si las validaciones fallan

### RF3. Borrado de categoría de producto

Como propietario,
quiero eliminar una categoría de producto que ya no necesito

**Ruta:** `DELETE /productCategories/:restaurantId/categories/:categoryId`

**Pruebas de aceptación:**

- Borra correctamente la categoría de producto especificada **solo si no hay productos asociados a esa categoría**.
- Devuelve código `401` si el usuario no está autenticado.
- Devuelve código `403` si el usuario no es propietario del restaurante.
- Devuelve código `404` si el restaurante o la categoría no existe.

## Ejercicios

### 1. Migraciones, modelos y cambios necesarios (2 puntos)

Cree y modifique las migraciones necesarias para implementar el modelado conceptual así como los modelos necesarios.

Complete los ficheros `/src/database/migrations/20210718065004-create-product-category.js` y `/src/models/ProductCategory.js`, además de las modificaciones necesarias sobre otros ficheros.

---

### 2. Rutas de ProductCategory (2 puntos)

Implemente las siguientes rutas:

- RF1: **GET** `/productCategories/restaurants/:restaurantId`
- RF2: **POST** `/productCategories/restaurants/:restaurantId`
- RF3: **DELETE** `/productCategories/:restaurantId/categories/:categoryId`

Se le proporciona el fichero /src/routes/ProductCategoryRoutes.js para definir estas rutas y recuerde incorporar los middlewares necesarios en cada ruta.

---

### 3. Validaciones para ProductCategory (1 punto)

Implemente las reglas de validación para la creación y la edición de una categoría.
Se le proporciona el fichero `/src/controllers/Validation/ProductCategoryValidation.js` para definir estas validaciones.

---

### 4. Controlador de ProductCategory (3 puntos)

Implemente las funciones necesarias para RF1, RF2, RF3.

Se le proporciona el fichero `/src/controllers/ProductCategoryController.js` para definir estas funciones.

---

### 5. Comprobación de que el owner puede borrar una Categoría de producto (2 puntos)

Implemente la comprobación que un owner debe cumplir para borrar una categoría de producto, esto es:

1. No hay ningún producto que tenga esa categoría asignada.
2. El restaurante asociado a la categoría del producto es propiedad del usuario que realiza la petición.

Se le proporciona el fichero `/src/middlewares/ProductCategoryMiddleware.js` con el prototipo de las funciones `checkNoProductsInCategory` y `checkProductCategoryOwnership` que ha de implementar.

### Información adicional importante

- **Las rutas y validaciones deben respetarse exactamente como aquí se describen, ya que los tests automáticos se basan en estas especificaciones.**
- **No modificar los tests.** El fichero de test `/tests/e2e/productCategories.test.js` se comprueban explícitamente las rutas, estructuras de datos, validaciones y asociaciones descritas anteriormente.

## Procedimiento de entrega

1. Borrar las carpetas **node_modules** de backend.
2. Crear un ZIP que incluya todo el proyecto. **Importante: Comprueba que el ZIP no es el mismo que te has descargado e incluye tu solución**
3. Avisa al profesor antes de entregar.
4. Cuando el profesor te dé el visto bueno, puedes subir el ZIP a la plataforma de Enseñanza Virtual. **Es muy importante esperar a que la plataforma te muestre un enlace al ZIP antes de pulsar el botón de enviar**. Se recomienda descargar ese ZIP para comprobar lo que se ha subido. Un vez realizada la comprobación, puedes enviar el examen.

## Preparación del entorno

### a) Windows

- Abra un terminal y ejecute el comando `npm run install:all:win`. Para que se ejecute esta instrucción sin errores previamente deberá completar el ejercicio 1 correctamente.

### b) Linux/MacOS

- Abra un terminal y ejecute el comando `npm run install:all:bash`. Para que se ejecute esta instrucción sin errores previamente deberá completar el ejercicio 1 correctamente.

## Ejecución

### Backend

- Para **rehacer las migraciones y seeders**, abra un terminal y ejecute el comando

  ```Bash
  npm run migrate:backend
  ```

- Para **ejecutarlo**, abra un terminal y ejecute el comando

  ```Bash
  npm run start:backend
  ```

## Depuración

- Para **depurar el backend**, asegúrese de que **NO** existe una instancia en ejecución, pulse en el botón `Run and Debug` de la barra lateral, seleccione `Debug Backend` en la lista desplegable, y pulse el botón de _Play_.

## Test

- Para comprobar el correcto funcionamiento de backend puede ejecutar el conjunto de tests incluido a tal efecto. Para ello ejecute el siguiente comando:

  ```Bash
  npm run test:backend
  ```

**Advertencia: Los tests no pueden ser modificados.**

## Problemas con los puertos

En ocasiones, los procesos de backend, con o sin depuración, puede quedarse bloqueado sin liberar los puertos utilizados, impidiendo que puedan ejecutarse otros procesos. Se recomienda cerrar y volver a iniciar VSC para cerrar dichos procesos.
