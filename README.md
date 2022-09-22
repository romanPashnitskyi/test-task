# How to start app

## Backend
- go to `https://hub.docker.com/r/webbylabhub/movies`
- pull image
- run `docker run --name movies -p 8000:8000 webbylabhub/movies`

## Frontend
- got to `https://hub.docker.com/r/romanpashnitskyi/movies`
- pull image
- run `docker run -d -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8000/api/v1 romanpashnitskyi/movies`
- open `http://localhost:3000/`
