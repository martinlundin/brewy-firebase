# :beer: Brewy
Keep track and collect data for your brews. [Add more description]

## Firebase API
This is the **Firebase API** for the Brewy project. We use **Express** as a web application framwork to structure our API. 

---

## Endpoints

| Endpoint                                  | Method        | Status                | Description |
| ---------------------                     | :-----------: | :-------------------: | ----------- | 
| `/register`                               | `POST`        | :white_check_mark:    | Register new user |
| `/login`                                  | `POST`        | :white_check_mark:    | Login user |
| `/ingredient`                             | `POST`        | :white_check_mark:    | Create & update ingredient |
| `/ingredients`                            | `GET`         | :white_check_mark:    | Get ingredients |
| `/tag`                                    | `POST`        | :x:                   | Create tag |
| `/tag/:tagId`                             | `PUT`         | :x:                   | Update tag |
| `/tag/:tagId`                             | `GET`         | :x:                   | Get specific tag |
| `/process`                                | `POST`        | :white_check_mark:    | Create process |
| `/process/:processId`                     | `PUT`         | :white_check_mark:    | Update process |
| `/process/:processId/ingredients/:action` | `POST`         | :white_check_mark:    | Add or remove process ingredients |
| `/process/:processId`                     | `GET`         | :white_check_mark:    | Get specific process |
| `/brew`                                   | `POST`        | :white_check_mark:    | Create brew |
| `/brew/:brewId`                           | `PUT`         | :white_check_mark:    | Update brew |
| `/brew/:brewId/rating`                    | `POST`        | :white_check_mark:    | Set brew rating |
| `/brew/:brewId`                           | `GET`         | :white_check_mark:    | Get specific brew |
| `/brews`                                  | `GET`         | :white_check_mark:    | Get brews |


---

## Requests 
All POST, PUT & DELETE requests to the api need to have these headers:
- `Content-type: application/json`
- `Authorization: Bearer {YourUserTokenHere}`

The body is JSON.
**TODO** add example code for a js fetch() call

## Users
Keeping it simple for now, only register and login function by email.
##### `/register`
```
{
	"email": "email@email.com",
	"password": "qwerty",
	"displayName": "Slimshady"
}
```
##### `/login`
```
{
	"email": "email@email.com",
	"password": "qwerty"
}
```
Response for both `/register` & `/login`
```
{
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhOTAwNTFmYzA5ZThmNjBlMTE2N2ViYzMxMjYwZjNiM2Y2YmJhYmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnJld3ktMSIsImF1ZCI6ImJyZXd5LTEiLCJhdXRoX3RpbWUiOjE1Njk2NzAzNzUsInVzZXJfaWQiOiJNeUpzYWk1NFE4Z0pZVkpBUjF1VlZ6NFpSdzQzIiwic3ViIjoiTXlKc2FpNTRROGdKWVZKQVIxdVZWejRaUnc0MyIsImlhdCI6MTU2OTY3MDM3NSwiZXhwIjoxNTY5NjczOTc1LCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJlbWFpbEBlbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RRzY0gx-G_qYJNRgxRi9D5UKOGze1SpWzWghrStQPsSA0ElsYI3qrjK3hAtlXSH2aVB1CCFsZhi7RjqE-CiAcg9igo1LskajMMbWE-VS5L-9d5byPWWAZjL8YzOG2n2mI6G3AYBUu78pJFIFfMQG6xw0C3f3zkPNGHWnGN8AQkf3uvG_9BguTyqPm5ITRz89Hpw2Ck_pQwIeU47pUcVPQ8XWoHvEtI5zcH70WCut8p2JxhgVmi-ZvzUI1Nw-GSh4W_Wyuzq6biUYvVJItFLEuKpw3q66S1XKxuiq4JZniEpoe0TAG7ziI2LmArqr-OCW4a0g8kSsQVn6wG8NvFc0-A"
}
```

## Data
For now there are 3 types of data colletions. **ingredients**, **processes**, and **brews**. Here are some details about the collections and examples on request and responses.

All time-fields uses the ISO format, example `new Date().toISOString()`

### :potable_water: Ingredients:potable_water: 
This is where all the different ingredients are stored. These are later used in a process.
##### `POST` `/ingredient`
```
{
    "name": "Water"
}
```
<sub>Response</sub>
```
{
    "message": "Created ingredient"
}
```
##### `GET` `/ingredients`
```
{
    "name": "Water"
}
```
<sub>Response</sub>
```
[
    {
        "id": "lemon",
        "name": "Lemon",
        "createdBy": "MyJsai54Q8gJYVJAR1uVVz4ZRw43"
    },
    {
        "id": "water",
        "createdBy": "MyJsai54Q8gJYVJAR1uVVz4ZRw43",
        "name": "Water"
    }
]
```

### :hourglass: Processes :hourglass:
This is a collection of ingredients being processed in a certain type of way. The process is also alot about keeping track of time. Processes are created as a part of a brew, meaning the brewId should point to it's "parent".

##### `POST` `/process`
Create a new process. Note that if startedAt is not provided it will use the current time.
```
{
	"brewId": "QZTermlUvsZxV02KkpZi",
	"type": "Fermentation",
	"startedAt": "2019-09-28T11:54:23.766Z"
}
```
<sub>Response</sub>
```
{
    "message": "Created process",
    "id": "ko80ym6zVW49cavUwzxU"
}
```

##### `PUT` `/process/:processId`
Include fields that you want to change, they are merged with current data. Fields will **not** get deleted if not included in the request. See availible field above in the POST request example.

Ingredients cannot be added in this request, use the `/process/:processId/ingredients/:action` endpoint.
```
{
	"startedAt": "2019-08-28T11:54:23.766Z"
}
```
<sub>Response</sub>
```
{
    "message": "Updated process"
}
```

##### `POST` `/process/:processId/ingredients/:action`
Action can be "add" or "remove". When using remove, post the complete object you want removed. 
If ingredient object is not found and not removed, it still returns sucess message. For more info please look at issue [#1](https://github.com/martinlundin/brewy-firebase/issues/1)
```
{
	"name": "Water",
	"amount": 1,
	"measurement": "liter"
}
```
<sub>Response</sub>
```
{
    "message": "Updated process ingredient"
}
```

##### `GET` `/process/:processId`
Get specific process
<sub>Response</sub>
```
{
    "createdAt": "2019-09-28T13:11:29.835Z",
    "startedAt": "2019-09-28T11:54:23.766Z",
    "ingredients": [
        {
            "measurement": "liter",
            "name": "Water",
            "amount": 1
        }
    ],
    "updatedAt": "2019-09-28T13:13:29.650Z",
    "type": "Fermentation",
    "brewId": "QZTermlUvsZxV02KkpZi",
    "createdBy": "MyJsai54Q8gJYVJAR1uVVz4ZRw43"
}
```

### :beers: Brews :beers:
A brew starts of with just a name and category, then it is populated with processes, which in turn is populated by ingredients. 

##### `POST` `/brew`
Create new brew. See availible fields here.
```
{
    "name": "Sour pomegranate",
    "category": "Kefir"
}
```
<sub>Response</sub>
```
{
    "message": "Created brew",
    "id": "QZTermlUvsZxV02KkpZi"
}
```

##### `PUT` `/brew/:brewId`
Include fields that you want to change, they are merged with current data. Fields will **not** get deleted if not included in the request. See availible field above in the POST request example.
```
{
    "name": "Plain pomegranate",
}
```
<sub>Response</sub>
```
{
    "message": "Updated brew"
}
```

##### `POST` `/brew/:brewId/rating`
Add or update a users rating (1-10) of a brew. 
```
{
    "rating": 6,
}
```
<sub>Response</sub>
```
{
    "message": "Rating set"
}
```

##### `GET` `/brew/:brewId`
Get all the data for the brew. Includes more data than the `/brews` endpoint.
<sub>Response</sub>
```
{
    "rating": 6,
    "updatedAt": "2019-09-28T12:02:40.926Z",
    "ratings": {
        "MyJsai54Q8gJYVJAR1uVVz4ZRw43": 6
    },
    "name": "Plain pomegranate",
    "category": "Kefir",
    "createdBy": "MyJsai54Q8gJYVJAR1uVVz4ZRw43",
    "createdAt": "2019-09-28T11:54:23.766Z",
    "brewId": "QZTermlUvsZxV02KkpZi",
    "processes": [
        {
            "startedAt": "2019-09-28T11:54:23.766Z",
            "ingredients": [
                {
                    "amount": 1,
                    "measurement": "liter",
                    "name": "Water"
                }
            ],
            "updatedAt": "2019-09-28T13:13:29.650Z",
            "type": "Fermentation",
            "brewId": "QZTermlUvsZxV02KkpZi",
            "createdBy": "MyJsai54Q8gJYVJAR1uVVz4ZRw43",
            "createdAt": "2019-09-28T13:11:29.835Z"
        }
    ]
}
```


---

## Todo
| Status    | Description |
| :-------: | ----------- | 
| :x:       | Add reminder function.
| :x:       | Add Data validation and error response messages (do when settings up typechecking)
| :x:       | Add typechecking for all incomming data.
| :x:       | Change error handling to be consistent and precise

---

## Improvments
| Status    | Description |
| :-------: | ----------- | 
| :x:       | Add conversion table and functions for measurements. For now it is just a string.
| :x:       | Make process-types as a collection and add more information about the type, like description, images and such. For now it is just a string.
| :x:       | Make brew catagory as a collection and add more information about the type, like description, images and such. For now it is just a string.

If you have any issues or improvments, please open one in this github repository.

---

## Development
You are very welcome to add contribute to the project. Follow these steps.
#### Installation
- Clone this project from git, in terminal run `git clone https://github.com/martinlundin/brewy-firebase.git`
- Go to `https://console.firebase.google.com` and create your own Firebase project.
- In the Firebase project under Authentication, create app.
- Install firebase-tools globally, in terminal run `npm install -g firebase-tools`
- Login to firebase in terminal run `firebase login`
- Now in this project, in `.firebaserc` file, change `default: [YOUR-PROJECT-ID]`
- From Firebase go to Project settings > Your apps > Config. Copy the firebaseConfig.
- In `/functions/` create `config.js`. Paste your firebaseConfig. Also, to the bottom of the file add `module.exports = { firebaseConfig }`

TODO this should work but test so it actually does