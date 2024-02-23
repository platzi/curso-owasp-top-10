# A01 - Broken Access Control

## Aplicación vulnerable
La aplicación no tiene un buen control de acceso, pues el rol del usuario es visible en la cookie de sesión.

## Análsis
Durante un análisis el pentester descubrirá que es posible modificar el rol del usuario editando las cookies de sesión, y así conseguir permisos de administrador.

## Explotación
1) Se ejecuta proxy para capturar las peticiones en el flujo de inicio de sesión y acceso a un endpoint privado.
2) Se decodifica la cookie, se modifica el rol de usuario a administrador y se codifica de nuevo.
3) Se repiten las peticiones a endpoints privados con la nueva cookie y se obtiene una respuesta positiva.

## Control
Para mitigar este riesgo se implementa una validación del rol de usuario contra la base de datos, en lugar de confiar en la cookie de sesión.

[Ver clase completa](https://platzi.com/new-home/clases/9342-owasp-top-10/68372-broken-access-control/)
