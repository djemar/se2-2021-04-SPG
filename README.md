# se2-2021-04-SPG

Solidarity Purchasing Group project developed for the Software Engineering II course @ Politecnico di Torino, 2021.

## Docker

### Build

Using `podman`:

```
podman build --format=docker -t wilmore/se2-2021-04-spg:tag .
```
Using `docker`:
```
docker build -t wilmore/se2-2021-04-spg:tag .
```

### Run

Using `podman`:

```
podman run -d -p  3001:3001 --name spg se2-2021-04-spg:tag
```
Using `docker`:
```
docker run -d -p  3001:3001 --name spg se2-2021-04-spg:tag
```

### Deploy on Heroku *
\* _Heroku CLI is needed_

First, tag the built image for Heroku.
Using `podman`:

```
podman tag wilmore/se2-2021-04-spg:tag registry.heroku.com/spg04/web
```
Using `docker`:
```
docker tag wilmore/se2-2021-04-spg:tag registry.heroku.com/spg04/web
```
Publish the image:

```
heroku container:release web
```


## Built with

- [React](https://github.com/facebook/react)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [Express](https://github.com/expressjs/express)
- [Passport](http://www.passportjs.org/)
- [SQLite](https://github.com/sqlite/sqlite)
- [TailWindCSS](https://github.com/tailwindlabs/tailwindcss)
- [Docker](https://github.com/docker)

## Team

- [Marino Diego](https://github.com/djemar)
- [Cannarella Alessandro](https://github.com/cannarelladev)
- [Cavallo Simone](https://github.com/LeSimo)
- [Gourlet Katell](https://github.com/KatellGourlet)
- [Lanfranco Dario](https://github.com/MOVdario)
- [Acquaro Claudio](https://github.com/claudione996)
- [Lisciandrello Mattia](https://github.com/Stormz4)
