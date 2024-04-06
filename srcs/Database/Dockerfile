FROM postgres:14-alpine

ADD CreateDB.sql /docker-entrypoint-initdb.d/

# the postgres image automatically initializes the database
# so all you need to do is have those 3 env variables inside the image
# POSTGRES_USER=
# POSTGRES_PASSWORD=
# POSTGRES_DB=
# and the .sql will automatically be launched
# note that if any of your env variables are wrong, the .sql file will have no effect
# also to check just "docker logs <db>" and it will show you whether it worked or not