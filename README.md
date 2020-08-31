Path of child
=============

Gamified life planning platform for your child

aka 'yet another glorified spreadsheet app'


Stack
-----

- Angular
- Ngrx
- Serverless framework
- Apollo GraphQL
- AWS Lambda
- AWS DynamoDB
- Auth0


Similar apps
------------

https://asana.com

https://www.hanselman.com/babysmash

https://habitica.com

https://www.choremonster.com

https://www.classcraft.com

#edtech #familytech


Setup
-----

#### Auth0 account

Create account on auth0.com

Create a SINGLE PAGE APPLICATION

Allowed Callback URLs: http://localhost:4200/security/callback

Allowed Web Origins: http://localhost:4200

Allowed Origins (CORS): http://localhost:4200

Check: Advanced Settings > Endpoints > JSON Web Key Set

You will need this with Domain, Client ID/Secret for environment config files.

#### DynamoDB

Install dynamodb local

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

#### ElasticSearch

Install elasticsearch 7.x+

https://www.elastic.co/elasticsearch

#### Angular

Install angular-cli

> npm install -g @angular/cli

```
cd app
cp src/environments/environment.ts.dist src/environments/environment.ts
cp src/environments/environment.ts.dist src/environments/environment.dev.ts
cp src/environments/environment.ts.dist src/environments/environment.production.ts
```

Create auth0 app at auth0.com and use credentials.

```
npm i
npm start
```

#### Serverless

Install serverless framework

> npm install -g serverless

```
cd serverless
cp .env.dist .env.dev
```

Update AUTH0_JWKS_URI and AUTH0_JWKS_KID based on Auth0 credentials.
You can get these from the JSON Web Key Set.

```
npm i
npm start
```
