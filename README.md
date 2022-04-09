# Aplicación Demo petclinics
Esta aplicación está basada en node.js como backend y como base de datos mongodb.

Teniendo los siguientes endpoints:<br>
/api/(GET) -> Devuelve un mensaje de Hoola, usado para probar el despliegue del backend mas no el acceso a la BD<br>
  Ejecutar: curl --location --request GET 'http://localhost:8085/api/' --data-raw ''
  Response: {"message":"Hoola "}

/api/dogs(GET) -> Devuelve todos los perritos registrados en forma de arreglo.<br>
  Ejecutar:
    curl --location --request GET 'http://localhost:8085/api/dogs'

/api/dogs(POST) -> Registra un nuevo perrito.<br>
  Ejecutar: 
    curl --location --request POST 'http://localhost:8085/api/dogs' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "10"
    }'

/api/dogs/:dog_id(PUT) -> Actualiza los datos de un perrito.<br>
  Ejecutar: 
    curl --location --request PUT 'http://localhost:8085/api/dogs/:dog_id' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "10"
    }'

/api/dogs/:dog_id(DELETE) -> Elimina los datos de un perrito.<br>
  Ejecutar:
    curl --location --request DELETE 'http://localhost:8085/api/dogs/:dog_id'


# Docker compose
Dirigirse a la carpeta docker-compose, donde se encontrará con la siguiente estructura:<br>

app/ -> todos los archivos del backend con su Dockerfile.<br>
mongo/ -> Algunos archivos para la configuración inicial de la BD.<br>
mongodb/ -> Volumen local de la BD /data/db.<br>

comando de ejecución.<br>
```docker-compose up -d --quiet-pull --remove-orphans --build```<br>

La aplicación podrá ser accedida desde el puerto 8085 con los mismos endpoints mencionados en la parte inicial

Teniendo los siguientes endpoints:<br>
/api/(GET) -> Devuelve un mensaje de Hoola, usado para probar el despliegue del backend mas no el acceso a la BD<br>
  Ejecutar: curl --location --request GET 'http://localhost:8085/api/' --data-raw ''
  Response: {"message":"Hoola "}

/api/dogs(GET) -> Devuelve todos los perritos registrados en forma de arreglo.<br>
  Ejecutar:
    curl --location --request GET 'http://localhost:8085/api/dogs'

/api/dogs(POST) -> Registra un nuevo perrito.<br>
  Ejecutar: 
    curl --location --request POST 'http://localhost:8085/api/dogs' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "10"
    }'

/api/dogs/:dog_id(PUT) -> Actualiza los datos de un perrito.<br>
  Ejecutar: 
    curl --location --request PUT 'http://localhost:8085/api/dogs/:dog_id' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "10"
    }'

/api/dogs/:dog_id(DELETE) -> Elimina los datos de un perrito.<br>
  Ejecutar:
    curl --location --request DELETE 'http://localhost:8085/api/dogs/:dog_id'

# K8S
Dirigirse a la carpeta K8S, donde se encontrará con la siguiente estructura:<br>

app/ -> todos los manifestos del backend.<br>
  ```Ejecutar kubectl apply -f .```<br>
  api-configmap.yaml<br>
  api-deployment.yaml<br>
  api-ingress.yaml<br>
  api-service.yaml<br>

mongo/ -> Todos los manifestos para el despliegue de mongodb dentro del cluster, en esta oportunidad hice un doble despligue para poder validar los accesos.<br>
  ```Ejecutar kubectl apply -f .```<br>
  mongodb-configmap.yaml<br>
  mongodb-configmap1.yaml<br>
  mongodb-deployment.yaml<br>
  mongodb-deployment1.yaml<br>
  mongodb-pvc.yaml<br>
  mongodb-pvc1.yaml<br>
  mongodb-secrets.yaml<br>
  mongodb-secrets1.yaml<br>

Verificar que la BD petsdb haya sido creada. En caso de que no crearla manualmente.<br>
- Verificar los pods<br>
kubectl get po<br>

- Acceder al pod<br>
kubectl --stdin --tty mongodb-pod-id -- /bin/bash<br>

- Conectarse a la BD<br>
mongo admin --username jean -p --host mongodb<br>

- En caso el usuario no haya sido creado, ejecutar:<br>
db.createUser(<br>
  {<br>
    user: "jean",<br>
    pwd: "123456",<br>
    roles: [<br>
       { role: "readWrite", db: "petsdb" }<br>
    ]<br>
  }<br>
)<br>

- Crear un registro<br>
use petsdb<br>
db.dogs.insert({ "name": "Rocky", "age": "10" })<br>

Instalación de nginx ingress<br>
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.45.0/deploy/static/provider/cloud/deploy.yaml<br>

resources/ Todos los manifestos para el despliegue de nginx ingress dentro del cluster-> .<br>
  ```Ejecutar kubectl apply -f .```<br>
  ingress.yaml<br>
  
Endpoint resultante: <br>
```http://api.35-224-162-28.nip.io/api/```<br>

Teniendo los siguientes endpoints:<br>
/api/(GET) -> Devuelve un mensaje de Hoola, usado para probar el despliegue del backend mas no el acceso a la BD<br>
  Ejecutar: curl --location --request GET 'http://api.35-224-162-28.nip.io/api/' --data-raw ''
  Response: {"message":"Hoola "}

/api/dogs(GET) -> Devuelve todos los perritos registrados en forma de arreglo.<br>
  Ejecutar:
    curl --location --request GET 'http://api.35-224-162-28.nip.io/api/dogs'

/api/dogs(POST) -> Registra un nuevo perrito.<br>
  Ejecutar: 
    curl --location --request POST 'http://api.35-224-162-28.nip.io/api/dogs' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "20"
    }'

/api/dogs/:dog_id(PUT) -> Actualiza los datos de un perrito.<br>
  Ejecutar: 
    curl --location --request PUT 'http://api.35-224-162-28.nip.io/api/dogs/6250ee35c61d96da72bcfd78' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "10"
    }'

/api/dogs/:dog_id(DELETE) -> Elimina los datos de un perrito.<br>
  Ejecutar:
    curl --location --request DELETE 'http://api.35-224-162-28.nip.io/api/dogs/6250ee35c61d96da72bcfd78'


# Helm

Inicialización  
```helm install petsclinic petsclinic```

En esta oportunidad mongodb será instalado como una dependencia del chart.
```helm/petsclinic/Chart.yaml```

Ejecutar 
```helm dependency update petsclinic```

```
apiVersion: v2
name: petsclinic
description: A Helm chart for Kubernetes
type: application
version: 0.1.0
appVersion: "1.16.0"
dependencies:
  - name: mongodb
    version: 11.0.3
    repository: "@bitnami"
```

```
mongodb:
  auth:
    rootUser: "root"
    rootPassword: "123456"
    usernames: ["jean"]
    passwords: ["123456"]
    databases: ["petsdb"]
  service:
    name: docker-mongodb
    # type: NodePort
    type: ClusterIP
    # nodePort: 32762
    port: 27017
  initdbScriptsConfigMap:  mongodb-initdb-config
  fullnameOverride: docker-mongodb
```

Configuración inicial de mongodb
```helm/petsclinic/templates/docker-mongodb-configmap.yaml```
```
apiVersion: v1
kind: ConfigMap
metadata:
    name: mongodb-initdb-config
data:
    initdb.js: |
        use petsdb;
        db.createUser({
        user: "jean",
        pwd: "123456",
        roles: [
            {
                role: "readWrite",
                db: "petsdb"
            }
        ])
```

Configmap usado para pasar las credenciales al backend
```helm/petsclinic/templates/configmap.yaml```
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "petsclinic.fullname" . }}
data:
  DB_HOST: {{ .Values.configmap.DB_HOST | quote }}
  DB_PORT: {{ .Values.configmap.DB_PORT | quote }}
  DB_NAME: {{ .Values.configmap.DB_NAME | quote }}
  DB_USER: {{ .Values.configmap.DB_USER | quote }}
  DB_PASSWORD: {{ .Values.configmap.DB_PASSWORD | quote }} 
```

Configuración del backend
```
replicaCount: 1

image:
  registry: docker.io
  repository: jeanflores2c93/pets_app
  pullPolicy: IfNotPresent
  # Overrides the image tag whose default is the chart appVersion.
  tag: "latest"

imagePullSecrets: []
nameOverride: ""
fullnameOverride: ""

strategy:
  enabled: true
  type: RollingUpdate
  maxSurge: 1
  maxUnavailable: 1
```

Configuración del configmap
```
configmap:
  DB_HOST: docker-mongodb
  DB_PORT: 27017
  DB_NAME: petsdb
  DB_USER: jean
  DB_PASSWORD: 123456
```

Configuración del load balancer
```
service:
  type: LoadBalancer
  port: 80
  targetPort: 8080
```

Configuración del ingress
```
ingress:
  enabled: true
  className: ""
  annotations:
    kubernetes.io/ingress.class: nginx
  hosts:
    - host: apihelm.35-224-162-28.nip.io
      paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: petsclinic
              port:
                number: 80
```

Actualizar el los valores del chart
```
helm upgrade petsclinic petsclinic --values petsclinic/values.yaml
```

Endpoint Resultante
```apihelm.35-224-162-28.nip.io```

Teniendo los siguientes endpoints:<br>
/api/(GET) -> Devuelve un mensaje de Hoola, usado para probar el despliegue del backend mas no el acceso a la BD<br>
  Ejecutar: curl --location --request GET 'http://apihelm.35-224-162-28.nip.io/api/' --data-raw ''
  Response: {"message":"Hoola "}

/api/dogs(GET) -> Devuelve todos los perritos registrados en forma de arreglo.<br>
  Ejecutar:
    curl --location --request GET 'http://apihelm.35-224-162-28.nip.io/api/dogs'

/api/dogs(POST) -> Registra un nuevo perrito.<br>
  Ejecutar: 
    curl --location --request POST 'http://apihelm.35-224-162-28.nip.io/api/dogs' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "20"
    }'

/api/dogs/:dog_id(PUT) -> Actualiza los datos de un perrito.<br>
  Ejecutar: 
    curl --location --request PUT 'http://apihelm.35-224-162-28.nip.io/api/dogs/62510490222e9b3ffa8219c5' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "Rocky",
      "age": "10"
    }'

/api/dogs/:dog_id(DELETE) -> Elimina los datos de un perrito.<br>
  Ejecutar:
    curl --location --request DELETE 'http://apihelm.35-224-162-28.nip.io/api/dogs/62510490222e9b3ffa8219c5'