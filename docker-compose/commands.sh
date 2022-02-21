docker build -t ultimatenode:dev --target dev .
docker build -t ultimatenode:test --target test .
docker build -t ultimatenode:prod --target prod .

# to build in ARM
docker build -t ultimatenode:dev --target dev --platform linux/x86_64 .
docker build -t ultimatenode:test --target test --platform linux/x86_64 .
docker build -t ultimatenode:prod --target prod --platform linux/x86_64 .

# to run container in ARM
docker run --platform linux/x86_64 -p 8080:8080 --rm ultimatenode:dev
docker run --platform linux/x86_64 -p 8080:8080 --rm ultimatenode:test
docker run --platform linux/x86_64 -p 8080:8080 --rm ultimatenode:prod

# docker build 
docker-compose build --force-rm --no-rm --parallel

# docker-compose up
docker-compose up -d --quiet-pull --remove-orphans --build

# connect to mongo container  
docker exec -it mongodb bash

# connect to mongodb
mongo -u jean -p 123456 --authenticationDatabase petsdb
mongo -u jean -p 123456 -host docker-mongodb --authenticationDatabase petsdb



mongo admin --username jean -p --host mongodb --port 27017

kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-pvc.yaml

kubectl delete -f mongodb-pvc.yaml
kubectl delete -f mongodb-deployment.yaml

kubectl describe  po --namespace pets
kubectl get po --namespace pets


kubectl exec --stdin --tty mongodb1-6c9564f474-s88d9 -- /bin/bash