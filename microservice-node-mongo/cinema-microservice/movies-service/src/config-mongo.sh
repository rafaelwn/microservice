# https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp
# https://nodejs.dev/learn/the-nodejs-event-emitter
# http://localhost:8080/movies

docker run -it --rm mongo \
	mongo --host 127.0.0.1 \
		-u glaucia \
		-p teste123456 \
		--authenticationDatabase admin \
		movies


docker-compose exec mongo /bin/sh

# É necessário criar um usuário admin
use admin
db.createUser(
  {
    user: 'admin',
    pwd: 'password',
    roles: [ { role: 'root', db: 'admin' } ]
  }
);

# sair e depois entrar com o usuário para ter pemissões para criar os dbs e collections
mongo -u admin -p password

db.createUser(
{
   user: "glaucia",
   pwd: "teste123456",
   roles: [
     { role: "readWrite", db: "movies" }
   ]
})

# insert movie
db.movies.insert({"id":1,"title":"Matrix Reload"})