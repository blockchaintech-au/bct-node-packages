.PHONY: build package deploy-%

export APP_NAME := admin
export AWS_ACCOUNT_PREFIX := common
export AWS_DEFAULT_REGION ?= ap-southeast-2
export COMMIT := $(shell git rev-parse --short HEAD)
export DOCKER_IMAGE = 106251776774.dkr.ecr.ap-southeast-2.amazonaws.com/$(PROJECT)-$(APP_NAME)
export OWNER := delivery_engineering@blockchaintech.net.au
export PROJECT := kyc

build:
	./scripts/build.sh

ecr-login:
	eval `aws ecr get-login --no-include-email`

package: ecr-login
	./scripts/push_image.sh

%-staging: env := staging
%-staging: route53_zone_id := Z3TFZFJ49W7YEB

%-production: env := production
%-production: route53_zone_id := Z3K3953IHQ8JTR

deploy-%: route53_zone_name = $(PROJECT)-$(APP_NAME).common-$(env).blockchaintechpro.com
deploy-%: aws_account = $(AWS_ACCOUNT_PREFIX)-$(env)
deploy-%: ecr-login
	@docker-compose run --rm -e AWS_ACCOUNT=$(aws_account) \
		-e ENVIRONMENT=$(env) -e DOCKER_IMAGE -e AWS_ACCOUNT_PREFIX \
		-e ROUTE53_ZONE_NAME=$(route53_zone_name) -e ROUTE53_ZONE_ID=$(route53_zone_id) \
		build-helper ./scripts/deploy.sh
