#!/usr/bin/env bash

## Create repository if not existent
aws ecr describe-repositories --repository-name ${APP_NAME} >/dev/null || \
    aws ecr create-repository --repository-name ${APP_NAME} >/dev/null || exit 1

## We specify a network in the docker-compose so we need to creatit
if [ ! "$(docker network ls -q -f name=local_dev)" ]; then
  echo "--- Create docker local_dev network"
  docker network create local_dev
fi

set -euo pipefail

aws ecr set-repository-policy --repository-name ${APP_NAME} \
    --policy-text file://./scripts/ecr_repo_permissions.json

script_dir="$(dirname $0)"

echo "--- Building docker image"
export DOCKER_IMAGE="${DOCKER_IMAGE}:${COMMIT}"
${script_dir}/build_image.sh

echo "--- Push the docker image ${DOCKER_IMAGE}"
docker push "${DOCKER_IMAGE}"
