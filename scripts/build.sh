#! /bin/bash

set -e

docker-compose build app
docker-compose run app npm run test
