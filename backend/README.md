# shortenlinks

## Description
A simple application that shortens a URL link

### Requirements
1. nodeJS version 20.1.0 or up
2. docker or POSTGRES and REDIS

## Configuration
1. Install dependencies
```shell
npm i
```
2. Set up the environment - (with docker)
```shell
docker compose up -d
```

3. Migrate tables
```shell
npm run setup
```