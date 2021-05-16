# Node docker
### Watching: Learn Docker - DevOps with Node.js & Express
https://www.youtube.com/watch?v=9zUHg7xjIqQ

# Commands used
## Docker Compose
### Bring container up (-d for detached mode, looks for docker-compose.yml)

`sudo docker-compose up -d`

### Bring container down (-v to remove volumes, looks for docker-compose.yml)

`sudo docker-compose down -v`

### Pass one or more files to docker-compose (-f):
- Dev
>  `sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

> `sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v`
- Prod
> `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

> `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v`

### Notes:
You need to tell docker-compose to rebuild the image with --build flag.

## General docker commands:
### Enter container file system
`sudo docker exec -it node-docker-app bash`

### See container logs
`sudo docker logs node-docker-app`

### Restart docker
`systemctl restart docker`

### List images
`sudo docker image ls`

### List containers
`sudo docker ps -a`

## Docker Normal
### Build image
`sudo docker build -t node-docker-app-image .`

### Run container (with bind mount volume for all files, volume for node_modules, )

`sudo docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-docker-app node-docker-app-image`

### Remove container
`sudo docker rm node-docker-app -f`
