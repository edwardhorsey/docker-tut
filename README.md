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

Add multiple instances of a container: add flag `--scale [container name]=2` (or more)

Rebuild a specific service but do not rebuild its dependencies: add flag `--no-deps` followed by service name, eg. `--no-deps [container-name]`

### Production workflow
In this case [service name] refers to our node app as this is generally where we'll be making changes in our code. We only want to rebuild this service to avoid rebuilding the database containers unneccesarily, in case anything breaks.

1. Begin on dev environment
1. `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml build [service name]`
2. `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml push [service name]`
3. Log into prod server
4. `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull [service name]`
5. `sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps [service name]`

# Docker Swarm
## Alternative production workflow
Docker swarm is a container orchestrator. It can spin up containers, distribute them over multiple servers and perform rolling updates wheras Docker Compose is intended as a development tool for configuring and starting multiple Docker containers on a single host.

## docker stack
To see all options: `docker stack --help` and `docker stack [option] --help`

### To deploy or update a stack (flag -c to pass a docker-compose file):

`sudo docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml [your-stack-name]`

### Push updated changes to our node app / service:

1. Make changes to service in dev envirionment
2. Build and push image of service
3. Run same `sudo docker stack deploy ...` command as above and Docker Swarm will pull the latest image and update our containers as per the parallelism setting within `docker-compose.prod.yml` (in this case shutting down and rebuilding a maximum of `2` at a time).

### See all running containers for a stack

`docker stack ps [your-stack-name]`

### Shut down stack

`docker stack rm [your-stack-name]`

---
# MongoDB
### Enter mongo db
`sudo docker exec -it [container name] mongo -u "ed" -p "password"` (username & password set in docker-compose.dev.yml / prod environment)

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
1. Bind mount:
_path on local machine : path on container_, eg. `./:app`
2. Anonymous volume:
_just path on container which you're interested in_, eg. `/app/node_modules`

3. Named volume: 
_name : path on container_, eg. `mongo-db:/data/db` **but** must mention in docker-composer.yml as a volume under volumes section

## Custom networks
To inspect a network:
`sudo docker network inspect [network name]`

On custom networks within Docker DNS is built in. We can use service name and DNS will resolve to the ip. eg. Log into the node app container and ping mongo. It will resolve to mongo's IP address.

## Ubuntu server

Install docker @ https://get.docker.com/

Create .env file and add `set -o allexport; source /[path to your]/.env; set +o allexport` to .profile file to load environment variables

## Watchtower 

Documentation @ https://containrrr.dev/watchtower/arguments/

Command used (poll interval is 50 seconds)

`docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower [container-name]`

`docker rm -f watchtower`

# Docker Normal
### Build image
`sudo docker build -t [image name] .`

### Run container (with bind mount volume for all files, volume for node_modules, )

`sudo docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:3000 -d --name [name to call container] [image name]`

### Remove container
`sudo docker rm [container name] -f`

### Rename images
New image name must match that of _username/repository_ on DockerHub
`sudo docker image tag [old image name] [new image name]`

# :whale:
