# Node docker

## docker-compose
(-d for detached mode)

`sudo docker-compose up -d`

### Build image
`sudo docker build -t node-docker-app-image .`

### Run container 
(with bind mount volume for all files, volume for node_modules, )

`sudo docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-docker-app node-docker-app-image`

### Remove container
`sudo docker rm node-docker-app -f`

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