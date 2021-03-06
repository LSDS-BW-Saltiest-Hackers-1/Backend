# Saltiest Hackers API
https://saltiest-hacker-bw.herokuapp.com/

# User Routes

### REGISTER A USER (Unrestricted Route)
HTTP Request: POST

URL: /api/users/register

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | No        | User ID, generated by DB                                |
| First Name  | String  | Yes       | User first name                                         |
| Last Name   | String  | Yes       | User last name                                          |
| Username    | String  | Yes       | Username, must be unique                                |
| Password    | String  | Yes       | Password                                                |

##### Example
```javascript
{
    "id": 3,
    "first_name": "John",
    "last_name": "Sterling",
    "username": "john567",
    "password": "password"
}
```

#### Response
##### 201 (Created)
> Will receive a 201 response with the newly created user if registration is successful
```javascript
  {
      "id": 3,
      "first_name": "John",
      "last_name": "Sterling",
      "username": "john567"
  }
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided",
  "message": "Missing user data"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "There was an error during user registration, please try again later",
  "errorMessage": "Server error information"
}
```
*** ***
### LOGIN (Unrestricted Route)
HTTP Request: POST

URL: /api/users/login

##### Body
| Name        | Type    | Required  | Description                 |
| ----------- | ------- | --------- | ----------------------------|
| Username    | String  | Yes       | Username, must be unique    |
| Password    | String  | Yes       | User password               |

##### Example
```javascript
{
  "username": "joker",
  "password": "hahahahhaha"
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a welcome message and the user token if the request is successful
```javascript
{
  "message": "Welcome to our API!",
  "token": "Extremely secret token from JWT"
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "Missing credentials username and/or password"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "There was an error during user login, please try again later",
  "errorMessage": "Server error information"
}
```
*** ***

### GET ALL USERS (UNRESTRICTED)
HTTP Request: GET

URL: /api/users

#### Response
##### 200 (OK)
> Will receive a 200 response with an array of users in the database if the request is successful
```javascript
[
    {
        "id": 1,
        "username": "dark_knight",
        "first_name": "Bruce",
        "last_name": "Wayne",
    },
    {
        "id": 2,
        "username": "cl0wNprIncE",
        "first_name": "Knock",
        "last_name": "Knock",
    }
]
```
##### 400 (Bad Request) // (IF RESTRICTED)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "Not logged in, cannot access."
}
```
##### 401 (Unauthorized) // (IF RESTRICTED)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "No token found, please login"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "errorMessage": "Server error information"
}
```
*** ***
### GET USER BY ID (UNRESTRICTED)
HTTP Request: GET

URL: /api/users/:id

#### Response
##### 200 (OK)
> Will receive a 200 response with a user object
```javascript
{
    "id": 2,
    "first_name": "Bat",
    "last_name": "Man",
    "username": "clarkkent"
}
```
##### 400 (Bad Request) // (IF RESTRICTED)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "Missing user data"
}
```
##### 401 (Unauthorized) // (IF RESTRICTED)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "errorMessage": "Server error information"
}
```
*** ***
### UPDATE USER INFORMATION
HTTP Request: PUT

URL: /api/users/:id

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | Yes       | User ID, generated by DB                                |
| Username    | String  | Yes       | Username, must be unique                                |
| Password    | String  | Yes       | User password                                           |
| First Name  | String  | Yes       | User first name                                         |
| Last Name   | String  | Yes       | User last name                                          |
##### Example
```javascript
{
    "id": 3,
    "username": "robin",
    "first_name": "Dick",
    "last_name": "Grayson",
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with the updated user object if the request is successful
```javascript
    {
        "id": 1,
        "username": "Nightwing",
        "first_name": "Dick",
        "last_name": "Grayson",
        "zip_code": "54305"
    }
```
##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```
##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```
##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server could not update user",
  "error": "Server error information"
}
```
*** ***
### DELETE A USER
HTTP Request: DELETE

URL: /api/users/:id

#### Response
##### 200 (OK)
```javascript
{
    "message": "The user was successfully deleted"
}

```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Access Denied: Unauthorized"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User with the id of ${id} was not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server failed to remove the user"
  "error": "Server error information"
}
```
*** ***



# Favorite Comment Routes

### GET A USER'S FAVORITE COMMENTS LIST (UNRESTRICTED)
HTTP Request: GET

URL: /api/comments/:id/favorites

#### Response
##### 200 (OK)
> Will receive a 200 response with an array of object(s) for comments
```javascript
[
    {
        "favorite_comments": 1
    },
    {
        "favorite_comments": 2
    },
    {
        "favorite_comments": 777
    }
]
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "error": "Server error information"
}
```
*** ***
### ADD A COMMENT TO A USER'S FAVORITE LIST (UNRESTRICTED)
HTTP Request: POST

URL: /api/comments/:id/add/:favorite_comments

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| Nothing     | Null    | No        | To add a favorite comment to a user add the user's id in the first paramater, and the comment's ID as the second parameter.|

#### Response
##### 201 (OK)
> Will receive a 201 response with an object for the comment added
```javascript
{
    "id": 5,
    "favorite_comments": 777,
    "user_id": 1
}
```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server could not add comment due to location error",
  "error": "Server error information"
}
```
*** ***
### DELETE A COMMENT
HTTP Request: DELETE

URL: /api/comments/:id/remove/:comment_id

#### Response
##### 200 (OK)
```javascript
{
    message: "The comment was successfully deleted"
}

```
##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Server failed to remove the issue"
  "error": "Server error information"
}
