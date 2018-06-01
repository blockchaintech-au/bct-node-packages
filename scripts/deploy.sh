#! /bin/bash

set -euo pipefail

if [ "${BUILDKITE}" == "true" ]
then
  echo "--- assuming account [${AWS_ACCOUNT}]"
  [ -n "${AWS_ACCOUNT}" ] && $(stsassume ${AWS_ACCOUNT}) || exit 1
fi

echo "--- deploying the cloudformation template"
aws cloudformation deploy \
    --template-file cloudformation/template.yml \
    --stack-name ${PROJECT}-${ENVIRONMENT}-${APP_NAME} \
    --parameter-overrides AppName=${APP_NAME} \
    DockerImage="${DOCKER_IMAGE}:${COMMIT}" \
    AwsAccountPrefix=${AWS_ACCOUNT_PREFIX} \
    Environment=${ENVIRONMENT} Project=$PROJECT \
    Route53ZoneName=$ROUTE53_ZONE_NAME Route53ZoneId=$ROUTE53_ZONE_ID \
    --tags "application=${APP_NAME}" "environment=${ENVIRONMENT}" \
    "commit=${COMMIT}" "owner=${OWNER}" "project=${PROJECT}"
