# Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones
## Proyecto de Aplicación Web Vulnerable al OWASP Top 10:2021
Esta es la documentación del proyecto de aplicación vulnerable para el [Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones](https://platzi.com/cursos/owasp-top-10) de [Platzi](https://platzi.com/ciberseguridad).

A continuación encontrarás toda la información necesaria para utilizar este proyecto.

## Pasos de instalación
1) Clonar el repositorio
2) Agregar alias localbox al localhost
3) Agregar certificado CA al navegador

## Índice

1. [Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones](#curso-de-owasp-top-10-vulnerabilidades-en-aplicaciones)
2. [Pasos de instalación](#pasos-de-instalación)
    1. [Paso 1: Clonar el repositorio](#paso-1-clonar-el-repositorio)
    2. [Paso 2: Agregar el alias localbox a tu localhost](#paso-2-agrega-el-alias-localbox-a-tu-localhost)
        - [Agregar el alias en sistemas tipo UNIX (MacOS y Linux)](#agregar-el-alias-en-sistemas-tipo-unix-macos-y-linux)
        - [Agregar el alias en Windows](#agregar-el-alias-en-windows)
        - [Resultado final](#resultado-final)
    3. [Paso 3: Agrega el certificado CA al navegador](#paso-3-agrega-el-certificado-ca-al-navegador)
3. [Uso del repositorio](#uso-del-repositorio)
4. [Comandos de docker](#comandos-de-docker)
5. [Software de trabajo](#software-de-trabajo)
6. [Retos](#retos)
7. [Recursos adicionales](#recursos-adicionales)
    - [Acceso a grafana](#acceso-a-grafana)
    - [Usuarios de la aplicación](#usuarios-de-la-aplicación)
8. [Créditos](#créditos)

### Paso 1: Clonar el repositorio
Para clonar el repositorio simplemente muevete a tu directorio de trabajo en la terminal y ejecuta el comando.
```
git clone https://github.com/platzi/curso-owasp-top-10 OWASPTop10
```

Se creará el directorio OWASPTop10, en el que podrás trabajar el proyecto.

### Paso 2: Agrega el alias localbox a tu localhost
Para poder utilizar los certificados SSL se necesita que coincidan con el nombre de dominio registrado, por lo tanto es necesario indicarle a nuestra computadora ese dominio y acceder al proyecto desde esa dirección.

#### Agregar el alias en sistemas tipo UNIX (MacOS y Linux)
Para agregar el alias en sistemas tipo UNIX solamente necesitas editar el archivo `/etc/hosts`, con tu editor de texto plano preferido, siempre teniendo permisos de administrador.

Agrega la siguiente línea y guarda los cambios:
```
127.0.0.1   localbox
```

#### Agregar el alias en Windows
En el caso de windows deberás editar el archivo `C:\Windows\System32\drivers\etc\hosts`, con tu editor de texto plano preferido, siempre teniendo permisos de administrador.

Agrega la siguiente línea y guarda los cambios:
```
127.0.0.1   localbox
```

#### Resultado final
Este es un ejemplo de mi resultado final:
```
127.0.0.1   localhost
127.0.0.1   localbox
```

Ahora si, puedes utilizar el alias ingresando a http://localbox/ en lugar de http://localhost, donde podrás ver la página de inicio del proyecto, siempre que el servidor ya esté ejecutandose.

### Paso 3: Agrega el certificado CA al navegador
Para poder utilizar los certificados SSL del proyecto sin ninguna alerta o error del navegador, es necesario agregar el certificado `RootCA.crt`, que viene en la carpeta `CA` del repositorio, en las configuraciones del navegador.

## Uso del repositorio
Usa la rama `main` para ver la versión vulnerable del proyecto.
```sh
git checkout main
```

Cambia a la rama de cada riesgo del Top 10, para ver su solución.
```sh
git checkout <rama>
```

Por ejemplo:
```sh
git checkout A01-BrokenAccessControl
```

Usa la rama `solved` para ver la versión corregida del proyecto.
```sh
git checkout solved
```

## Comandos de docker
Aquí te van algunos comandos útiles para utilizar el proyecto durante las prácticas.

Ejecutar el proyecto
```sh
docker compose up --build
```

Ver logs por contenedor
```sh
docker logs <nombre-contenedor>
```

Por ejemplo:
```sh
docker logs backend
```

Terminar la ejecución del proyecto
```sh
Usa la combinación de teclas [Ctrl]+[C] ó el equivalente en tu sistema operativo
```

Eliminar los contenedores y volumenes de datos
```sh
docker compose down --volumes
```


__IMPORTANTE__

Recuerda terminar el proceso de docker y elimines los volúmenes cada vez que cambies de rama para generar un entorno limpio desde cero.

## Software de trabajo
- VS Code
- Docker
- Burp Suite
- DirBuster
- NodeJS (para la clase de npm audit)

Aquí te comparto una lista de tutoriales para instalar tus herramientas de pentesting

[Tutorial de instalación de Docker](https://platzi.com/new-home/clases/8781-docker-fundamentos/66589-instalacion-de-docker/)

[Tutorial de instalación de Burp Suite en Windows](https://platzi.com/blog/como-instalar-burp-suite-en-windows)

[Tutorial de instalación de Burp Suite en Linux](https://platzi.com/blog/como-instalar-burp-suite-en-linux)

[Tutorial de instalación de Burp Suite en MacOS](https://platzi.com/blog/como-instalar-burp-suite-en-macos)

[Tutorial de instalación de DirBuster](https://platzi.com/blog/como-instalar-dirbuster)

## Retos
A continuación puedes encontrar la documentación de los 10 retos del proyecto relacionados al OWASP Top 10.

[A01:2021 - Broken Access Control](docs/A01-BrokenAccessControl.md)

[A02:2021 - Cryptographic Failures](docs/A02-CryptographicFailures.md)

[A03:2021 - Injection](docs/A03-Injection.md)

[A04:2021 - Insecure Design](docs/A04-InsecureDesign.md)

[A05:2021 - Security Misconfiguration](docs/A05-SecurityMisconfiguration.md)

[A06:2021 - Vulnerable And Outdated Components](docs/A06-VulnerableAndOutdatedComponents.md)

[A07:2021 - Identification And Authentication Failures](docs/A07-IdentificationAndAuthenticationFailures.md)

[A08:2021 - Software And Data Integrity Failures](docs/A08-SoftwareAndDataIntegrityFailures.md)

[A09:2021 - Security Logging And Monitoring Failures](docs/A09-SecurityLoggingAndMonitoringFailures.md)

[A10:2021 - Server-Side Request Forgery](docs/A10-ServerSideRequestForgery.md)

## Recursos adicionales
### Acceso a grafana
Para acceder a las métricas en grafana puedes seguir los siguientes pasos:
1) Entra a [https://localbox/grafana](https://localbox/grafana)
2) Usa las credenciales por defecto para acceder al dashboard
3) Haz click en la opción "saltar" en la ventana de cambiar contraseña

Estas son las credenciales por defecto en grafana:

| username | password |
|----------|----------|
| admin    | admin    |

__¡Listo!__

Ahora puedes acceder a tus métricas en grafana.

### Usuarios de la aplicación
La aplicación tiene un usuario administrador y cuatro usuarios comunes, estas son sus credenciales:

| username | password |
|----------|----------|
| admin    | admin    |
| user1    | 1234     |
| user2    | 1234     |
| user3    | 1234     |

#### Happy Hunting!
Ha llegado el momento de poner manos a la obra y realizar tus prácticas.

## Créditos
Proyecto creado por [Diana Nerd](https://dnrd.dev).

Para el [Curso de OWASP Top 10: Vulnerabilidades en Aplicaciones](https://platzi.com/cursos/owasp-top-10) en [Platzi](https://platzi.com/ciberseguridad).
