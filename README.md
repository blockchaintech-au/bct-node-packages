## Overview

`kyc-admin` is the UI and BFF (Backend For Frontend) of KYC (Know Your Customer). 

## Configure Dev Environment

In this section we talk about how to configure your development environment. Follow the following steps:

#### Setup node environment
`npm i -g n`
`n 10.0.0`
#### Build
In the project folder, run `npm run build`
#### Static check and test
In the project folder, run `npm run test`

## Run in Docker

1. Make sure Docker and docker-compose are installed on your machine, and clone the project.
2. Run `docker-compose build app`
3. Run `docker-compose up app`