# Git Search

## Description

Git search is a simple node.js application to search users by repositories based on their location

## Local

### Prodution

If you want to run this application on your local computer just run

```bash
$ npm install --production
$ npm start
```

### Dev

To run the application on your local computer dev mode on run `$ npm install`

```bash
$ npm test #For tests
$ npm run coverage #For coverage
```

## Docker

To run the application on a docker container you only need to execute
`./run-docker.sh`

## Envars

* PORT
* DEFAULT_LOCATION
* MIN_USERS
* PAGE_SIZE
* API_URL
* TIMEOUT
* USER
* PASSWORD

## ROUTES

| METHOD | ROUTE | Description |
| ------ | ------| ----------- |
| **GET** | */location/{location}*| It will return the top 50 (or what you have setted on MIN_USERS) of the location specified|
|| */location/{location}/top/{top}*| It will return the top X users located on the location specified |

## AUTH

To add some security there is a basic auth on each request, if you run the application on you local computer it will not be set, however if you do it via Docker a user and password will be needed on each request (Darth:Vader)

## Example Requests

*/location/Barcelona/top/150*
```bash
curl -X GET \
  http://localhost:3100/user/location/Barcelona/top/150 \
  -H 'authorization: Basic RGFydGg6VmFkZXI='
```

*/location/Paris*

```bash
curl -X GET \
  http://localhost:3100/user/location/Paris \
  -H 'authorization: Basic RGFydGg6VmFkZXI='
```
