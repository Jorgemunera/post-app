# Presentación de proyecto
A continuación se presenta el proyecto de POST-APP, esta es una aplicación en React que consume una fake API especifica de https://jsonplaceholder.typicode.com. Para el desarrollo de esta se usarán las siguientes tecnologías y dependencias:

* React.js (se levanta el entorno de desarrollo con créate-react-app)
* React hooks
* React router
* Custom Hooks
* Axios
* Bootstrap
* React-bootstrap
* Entre otras tecnologías


## Imágenes de la App
* Inicio
![home](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/home.png)

* Search
![search](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/search.png)

* Detalles
![details](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/details.png)

* Editar
![update](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/update.png)

* Eliminar
![delete](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/delete.png)

* Crear
![create](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/create.png)

* Responsive
![responsive](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/responsive.png)
 
 
## Estructura de carpetas
La estructura de carpetas que se define es una basada en atomic design en donde se trata de identificar cada uno de los elementos que sigue este modelo de diseño, como se muestra a continuación:
![folders](https://raw.githubusercontent.com/Jorgemunera/post-app/main/assets/folders.png)


## Funcionalidad
La aplicación realiza un CRUD básico de consumo a la API mencionada anteriormente, de tal manera que podemos obtener los recursos y renderizarlos en el home, ver los detalles de cada post, editar, eliminar y una pantalla distinta para la creación de un post. La función de detalles y editar realizan la apertura de un modal con la información necesaria para mostrar en el caso de los detalles y de poder editar en el caso de el botón editar.
Adicional a esto hay una barra de búsqueda que conecta a través de estados y react hooks cada uno de los componentes implicados en este proceso de filtrado. Todos los post se pueden ver en una data table con su respectiva paginación, que se actualiza de igual manera dependiendo de los post que debe renderizar.
En la estructura de carpetas se puede evidenciar la separación de componentes, contenedores, hooks y routes que permiten la funcionalidad de la app, todo esto tratando de respetar las buenas practicas, principios de una sola responsabilidad, entre otras.
Aunque la aplicación es susceptible aún a muchas mejoras.


## Instalación

Para la instalación de la app debemos:
* Descargar el repositorio, bien sea por descarga, clonándolo o el método que se elija y ubicarnos en una carpeta local donde queramos tener la aplicación

* Una vez allí, en la terminal correr el comando 
```npm install```
esto instalará todas las dependencias necesarias para que nuestra aplicación funcione

* Una vez instaladas las dependencias, debemos correr en la terminal el comando
```npm start``` o ```npm run start``` en caso de que no funcione el primero

Aquí se nos abrirá una ventana en el navegador donde podremos ver la app en funcionamiento

Cabe resaltar que podemos también probar todas las funcionalidades simulando nuestra propia fuente de recursos y peticiones a una API con json-server.
Para esto basta con modificar el archivo db.json y agregar los posts que queramos, luego en la terminal correr el comando ```npm run start-server``` y luego en otras terminal pero ubicados en la misma ruta de nuestra app el comando ```npm start```

## Aplicación desplegada
Se despliega en github pages como servicio de alojamiento de pagina estática

 - https://jorgemunera.github.io/post-app/
