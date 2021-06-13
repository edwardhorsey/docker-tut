# Docker tutorial
### Watching: Learn Docker - DevOps with Node.js & Express
https://www.youtube.com/watch?v=9zUHg7xjIqQ

# Docker Compose
### Bring container up (-d for detached mode, looks for docker-compose.yml)

`sudo docker-compose up -d`

### Bring container down (-v to remove volumes, looks for docker-compose.yml)

`sudo docker-compose down -v`

### Pass one or more files to docker-compose (-f):
- Dev
>  `sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

> `sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml down`
- Prod
> `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

> `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml down`

Note: removed -v flag as we are using a named volume which we do not want to delete. To delete unused volumes, **important!** start your containers whose volumes you want to keep **then** run `sudo docker volume prune`

### Notes:
You need to tell docker-compose to rebuild the image with --build flag.

---
# MongoDB
### Enter mongo db
`sudo docker exec -it [container name] mongo -u "ed" -p "password"`

# Redis
### Enter redis db
`sudo docker exec -it [container name] redis-cli`

- See all keys `KEYS *`
- See entry `GET [key]`

---
# General docker commands:
### Enter container file system
`sudo docker exec -it [container name] bash`

### See container logs
`sudo docker logs [container name]`

### Restart docker
`systemctl restart docker`

### List images
`sudo docker image ls`

### List containers
`sudo docker ps -a`

### Find a container IP address
`sudo docker inspect [container name]`

---
# Notes
## Types of volumes
1. Bind mount
path on local machine : path on container, eg. `./:app`
2. Anonymous volume
just path on container which you're interested in, eg. `/app/node_modules`

3. Named volume 
name : path on container, eg. `mongo-db:/data/db` **but** must mention in docker-composer.yml as a volume under volumes section

## Custom networks
To inspect a network:
`sudo docker network inspect [network name]`

On custom networks within Docker DNS is built in. We can use service name and DNS will resolve to the ip. eg. Log into the node app container and ping mongo. It will resolve to mongo's IP address.
# Docker Normal
### Build image
`sudo docker build -t [image name] .`

### Run container (with bind mount volume for all files, volume for node_modules, )

`sudo docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:3000 -d --name [name to call container] [image name]`

### Remove container
`sudo docker rm [container name] -f`
