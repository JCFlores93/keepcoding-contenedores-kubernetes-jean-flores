kubectl create configmap mongo-initdb --from-file=create_user.sh

kubectl apply -y mongodb-configmap.yaml
kubectl delete -y mongodb-configmap.yaml

kubectl apply -f mongodb-deployment1.yaml
kubectl delete -f mongodb-deployment1.yaml

kubectl apply -f mongodb-service.yaml
kubectl delete -f mongodb-service.yaml

kubectl apply -f mongodb-secrets.yml
kubectl delete -f mongodb-secrets.yml

kubectl apply -f mongodb-pvc.yaml
kubectl delete -f mongodb-pvc.yaml

kubectl get po
kubectl describe po 

kubectl exec --stdin --tty mongodb1-6c9564f474-pmklg -- /bin/bash

mongo admin --username jean -p --host mongodb
--port SOURCE-PORT
