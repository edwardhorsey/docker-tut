# Node docker

### Build image
`sudo docker build -t node-docker-app-image .`

### Run container
`sudo docker run -p 3000:3000 -d --name node-docker-app node-docker-app-image`

### Run container with bind mount
`sudo docker run -v $(pwd):/app  -p 3000:3000 -d --name node-docker-app node-docker-app-image`

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
`sudo docker ps`