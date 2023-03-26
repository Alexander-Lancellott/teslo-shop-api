<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

:one: Clonar el repositorio

:two: `yarn install`

:three: Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

:four: Levantar la base de datos

```
docker-compose up -d
```

:five: Clonar el `.env.template`, renombar la copia a `.env` y editar o llenar el valor de las variables definidas en el `.env` de ser necesario

:six: Levantar la aplicación en **dev**

```
yarn start:dev
```

:seven: Reconstruir la base de datos

> Elimina unicamente la seed que se inserto o los datos que coincidan con la seed a insertar y luego inserta la seed

```
http://localhost:3000/api/seed
```

> Elimina todos los datos y luego inserta la seed

```
http://localhost:3000/api/seed?hard=true
```
