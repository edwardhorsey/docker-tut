# Node docker

### Build image
`sudo docker build -t node-docker-app-image .`

### Run container
`sudo docker run -p 3000:3000 -d --name node-docker-app node-docker-app-image`

### Remove container
`sudo docker rm node-docker-app -f`

### Enter container file system
`sudo docker exec -it node-docker-app bash`