## Name: Ng Wanzhen

## Observations:
### Models:
client model - attributes id, SSO, origins, secret

### Routes:
internal routes
* internal/clients, will list all clients in DB
* internal/api-key/validation will go to middleware validation using ApiKeyManager to help validate
* internal/clients/:clientId is a get request to pull for a specific client id

* clients/by-origin will query clients by headers.origin
* health route is just to check status of application itself (not linked to models) using swagger

### Controllers:
Client
- getById
- getByOrigin
- list
Util
- healthCheck

### Built with:
* AWS noSQL dynamoDB, dynamoose
* key management system and json web token being used here to generate keys for client
* App starts from index that goes to app. uses Koa as server, and helmet, and needs to handle cross-origin request

### Tests:
* tester file in services/clientservice.spec that uses mocha chai sinon to mock some requests with origins and see that the function getByOrigin is able to list the origins.

### Others:
* error messages are held in Const.js file and exported out
* there is a development, production environment
