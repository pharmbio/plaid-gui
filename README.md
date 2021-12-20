Plaid layout GUI web application.

--Development--
To start up the development servers run:

docker-compose up -d --build

You may stop the servers running in the containers as such:

docker-compose stop

<<<<<<< Updated upstream
You may also remove the containers as such:
=======
**NOTE**
Make sure your docker configuration allows for enough access to
memory. The GUI might fail in some examples otherwise.
>>>>>>> Stashed changes

docker-compose down
