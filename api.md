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
GET /v1/room/active "kullanıcının odalarını listeler"
POST /v1/room/create "oda yaratmak icin"
GET /v1/room/info/{id} "bir odanın tüm bilgilerini alır, sadece odadaki kişiler alır, odada sadece 2 kişi olabilir, rekabetçi ve rakip şeklinde challenger ve opponent"
GET /v1/user/online "rastgele online 20 kullanıcı döndür"
GET /v1/user/random "rastgele 20 kullanıcı döndürür"
POST /v1/user/random "rastgele 20 kullanıcı döndürür"
```