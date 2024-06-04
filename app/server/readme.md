## Backend
-----------

El backend de la aplicación para el hospital es con lo que interactúa el frontend . Es una API REST expuesta que envía y recibe JSON. El lenguaje que lo impulsa es Node.js y el marco detrás de él es [Express.js]() . Express.js es un marco web simple, pero también tiene funciones completas. Tiene documentación fantástica junto con una comunidad grande y activa que rodea el proyecto. SQL Alchemy es ORM y una interfaz de base de datos para la aplicación.

> Todas las librerias utilizadas se encuentran en el archivo **package.json** es bueno echar un vistado, entre los mas resaltantes estan

####Listaremos las librerias mas importantes a tener en consideracion
- "express": "^4.17.1" <abbr>Para la elaboracion de la </abbr>
- "jsonwebtoken": "^8.5.1",
- "moment": "^2.27.0",
- "morgan": "^1.10.0",
- "pg": "^8.3.0",
- "pg-hstore": "^2.3.3",
- "sequelize": "^6.3.3",



`mvn archetype:generate -DgroupId=org.openubl.xbuilder -DartifactId=xbuilder-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`{

> El comando anterior creó un proyecto Maven en la carpeta `xbuilder-quickstart`. Revisa el contenido de la carpeta para familiarizarte con la estructura de un proyecto Maven.

### Configura la versión de Java en tu proyecto Maven

- Abre el archivo `xbuilder-quickstart/pom.xml`{{open}}
- Agrega las las siguientes lineas:

```xml
<properties>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

> Los `<properties/>` deben de ser insertados debajo de `<url>http://maven.apache.org</url>`