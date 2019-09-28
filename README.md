
# :x: Work in progress. Wait for v1.0.0 :x:

---

# Brewy
Keep track and collect data for your brews. [Add more description]

## Firebase API
This is the **Firebase API** for the Brewy project. We use **Express** as a web application framwork to structure our API. 

---

## Endpoints

| Endpoint              | Method        | Status                | Description |
| --------------------- | :-----------: | :-------------------: | ----------- | 
| `/register`           | `POST`        | :white_check_mark:    | Register new user |
| `/login`              | `POST`        | :white_check_mark:    | Login user |
| `/ingredient`         | `POST`        | :white_check_mark:    | Create & update ingredient |
| `/ingredients`        | `GET`         | :white_check_mark:    | Get ingredients |
| `/tag`                | `POST`        | :x:                   | Create tag |
| `/tag/:tagId`         | `PUT`         | :x:                   | Update tag |
| `/tag/:tagId`         | `GET`         | :x:                   | Get specific tag |
| `/process`            | `POST`        | :white_check_mark:    | Create process |
| `/process/:processId` | `PUT`         | :white_check_mark:    | Update process |
| `/process/:processId` | `GET`         | :white_check_mark:    | Get specific process |
| `/brew`               | `POST`        | :white_check_mark:    | Create brew |
| `/brew/:brewId`       | `PUT`         | :white_check_mark:    | Update brew |
| `/brew/:brewId/rating`| `POST`        | :white_check_mark:    | Set brew rating |
| `/brew/:brewId`       | `GET`         | :white_check_mark:    | Get specific brew |
| `/brews`              | `GET`         | :white_check_mark:    | Get brews |


---

## Requests 
All request to the api need to have a **header** `Content-type: application/json` and a **body** with key values in json.
For post and put you will need to include `Authentication` header with `Bearer ${TokenHere}`
TODO better explanation and example code for a fetch() call

## Users
**/register**
Keys accepted in body:
`email`
`password`
`displayName`

**/login**
Keys accepted in body:
`email`
`password`

## Data
There are 3 types of data colletions. **Ingredients**, **processes**, and **brews**. Here are some details about the collections and examples on GET responses on specific data collections.

#### Ingredients
This is where all the different ingredients are stored. These are later used in a process.
Example:
```
{
    name: "Sugar"
    createdAt: "5 September 2019 at 19:00:00 UTC+2"
    updatedAt: "5 September 2019 at 19:00:00 UTC+2"
}
```

#### Tags
This is a collection for tagging other collections to an id. This id will be used as a entry point for retrieving the data you want. Will be used for easy access by QR code or handwritten id.
Example:
```
{
    id: "123"
    createdAt: "9 September 2019 at 19:00:00 UTC+2"
    updatedAt: "9 September 2019 at 19:00:00 UTC+2"
    reference: "/process/12d8sa9f83"
}
```

#### Processes
This is a collection of ingredients being processed in a certain type of way.
Example:
```
{
    type: "Fermented",
    createdAt: "25 September 2019 at 19:00:00 UTC+2",
    updatedAt: "25 September 2019 at 19:00:00 UTC+2",
    startedAt: "25 September 2019 at 19:00:00 UTC+2",
    remindAt: "29 September 2019 at 17:30:00 UTC+2",
    endedAt: "29 September 2019 at 18:00:00 UTC+2",
    ingredients: [
        {
            ingredient: {
                name: "Water"
                createdAt: "4 September 2019 at 11:00:00 UTC+2"
                updatedAt: "4 September 2019 at 11:00:00 UTC+2"
            },
            amount: 1,
            measurement: "liter"
        },
        {
            ingredient: {
                name: "Kefir grains"
                createdAt: "5 September 2019 at 19:00:00 UTC+2"
                updatedAt: "5 September 2019 at 19:00:00 UTC+2"
            },
            amount: 2,
            measurement: "msk"
        },
        {
            ingredient: {
                name: "Sugar"
                createdAt: "5 September 2019 at 19:00:00 UTC+2"
                updatedAt: "5 September 2019 at 19:00:00 UTC+2"
            },
            amount: 3.5,
            measurement: "msk"
        },
        {
            ingredient: {
                name: "Lemon"
                createdAt: "5 September 2019 at 19:00:00 UTC+2"
                updatedAt: "5 September 2019 at 19:00:00 UTC+2"
            },
            amount: 0.5,
            measurement: "st"
        }
    ]
}
```

#### Brews
This is a collection of processes, which in turn has a collection of ingredients.
Example:
```
{
    name: "Sour pomegranate",
    rating: 7,
    category: "Kefir",
    processes: [
        {
            type: "Fermented",
            createdAt: "25 September 2019 at 19:00:00 UTC+2",
            updatedAt: "25 September 2019 at 19:00:00 UTC+2",
            startedAt: "25 September 2019 at 19:00:00 UTC+2",
            remindAt: "29 September 2019 at 17:30:00 UTC+2",
            endedAt: "29 September 2019 at 18:00:00 UTC+2",
            ingredients: [
                {
                    ingredient: {
                        name: "Water"
                        createdAt: "4 September 2019 at 11:00:00 UTC+2"
                        updatedAt: "4 September 2019 at 11:00:00 UTC+2"
                    },
                    amount: 1,
                    measurement: "liter"
                },
                {
                    ingredient: {
                        name: "Sugar"
                        createdAt: "5 September 2019 at 19:00:00 UTC+2"
                        updatedAt: "5 September 2019 at 19:00:00 UTC+2"
                    },
                    amount: 3.5,
                    measurement: "msk"
                }
            ]
        },
        {
            type: "Fermented",
            createdAt: "29 September 2019 at 18:00:00 UTC+2",
            updatedAt: "29 September 2019 at 18:00:00 UTC+2",
            startedAt: "29 September 2019 at 18:00:00 UTC+2",
            remindAt: "3 October 2019 at 19:00:00 UTC+2",
            endedAt: "3 October 2019 at 20:30:00 UTC+2",
            ingredients: [
                {
                    ingredient: {
                        name: "Pomegranate"
                        createdAt: "4 September 2019 at 11:00:00 UTC+2"
                        updatedAt: "4 September 2019 at 11:00:00 UTC+2"
                    },
                    amount: 3,
                    measurement: "msk"
                },
                {
                    ingredient: {
                        name: "Lemon juice"
                        createdAt: "5 September 2019 at 19:00:00 UTC+2"
                        updatedAt: "5 September 2019 at 19:00:00 UTC+2"
                    },
                    amount: 2,
                    measurement: "msk"
                }
            ]
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