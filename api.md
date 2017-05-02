```js
POST /v1/login
Payload
LoginForm {
	"email": "string",
	"password": "string"
}

Response
Token {
	id: "integer",
	code: "string",
	ownerId: "string(User)"
}
```


```js
POST /v1/register
Payload
RegisterForm {
	"email": "string",
	"password": "string",
	"name": "string"
}

Response
User {
	"id": "string(User)",
	"email": "string",
	"password": "md5(string)"
}
```

```js
INFO:
	PICKABLE olan facilitylerin dolapları olabilir. Diğer Facilityler adresin bir parçasıdır.
	
GET /v1/facility

Response
List<Facility> [
	{
		"status": "string<enum> (PICKABLE, VISIBLE, {HIDDEN})", // HIDDEN never returns from this service
		"name": "string",
		"parentId": "string(Facility)" // Always null
	}
]
```