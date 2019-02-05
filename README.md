# Safe Space Backend

A Backend for Lambda's Safe Space app. Now on Heroku!

## Getting Started

The API can be found at the following url:
```
https://lambda-safe-space.herokuapp.com/
```

### Prerequisites (for local use)

- run `yarn` in order to install all dependencies
- use the command `yarn server` to run a live server!

## Endpoints

### Users Overview


| Method |     Endpoint    |   Requires   | Description |
|--------|-----------------|--------------|-------------|
|  POST  | `/api/register/` | `username`, `name`, `password`| Used for adding a new user to database.                                       |
|  POST  | `/api/login/`    |     `username`, `password`    | Used to log a user in. Returns a token in its body.                           |
|  GET   | `/api/users`     |        Successful Login       | Used to show all users in the database.                                       |
|  GET   | `/api/users/:id/`|        Successful Login       | Used to show a specific user in the database.                                 |
|  PUT   | `/api/users/:id/`|     Successful Login, Data    | Used to edit the logged in user's credentials. **Only works on current user!**|
| DELETE | `api/users/:id/` |        Successful Login       | Used to delete the logged in user. **Only works on current user!**            |

---

### User Registration


Method used: **[POST]** `/api/register/`

On Success: Returns the Id of the new user.



Parameters:

|  Name  | Type | Required |                   Notes                     |
|--------|------|----------|---------------------------------------------|
|  name  |string|    yes   |The name the user wishes to go by.           |
|username|string|    yes   |Must be unique.                              |
|password|string|    yes   |Can be any length, but the longer the better.|

Example: 
```
{
    name: "John"
    username: "JohnDoe",
    password: "testpassword"
}
```
---

### User Login


Method used: **[POST]** `/api/login/`

On Success: Returns a token to be used to authenticate the user. Place it wherever you'd like!



Parameters:

|  Name  | Type | Required |
|--------|------|----------|
|username|string|    yes   |
|password|string|    yes   |

Example: 
```
{
    username: "JohnDoe",
    password: "testpassword"
}
```

---

### Get Users

Method used: **[GET]** `/api/users/`

On Success: Returns an array of users.


Parameters:

|      Name     |   Type   | Required |              Notes                |
|---------------|----------|----------|-----------------------------------|
| Authorization |**Header**|   yes    | Acquired from a successful login. |

---

### Get Specific User

Method used: **[GET]** `/api/users/:id/`

On Success: Returns an array of users matching the current params.


Parameters:

|      Name     |   Type   | Required |              Notes                |
|---------------|----------|----------|-----------------------------------|
| Authorization |**Header**|   yes    | Acquired from a successful login. |

---

### Update User

Method used: **[PUT]** `/api/users/:id/`

On Success: Returns `1`, or returns `0` if user could not be updated.


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Authorization |**Header**|    yes   | Acquired from a successful login.           |
|     name      |  string  |    no    |The name the user wishes to go by.           |
|    username   |  string  |    no    |Must be unique.                              |
|    password   |  string  |    no    |Can be any length, but the longer the better.|

---

### Delete User

Method used: **[DELETE]** `/api/users/:id/`

On Success: Returns `1`.


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Authorization |**Header**|    yes   | Acquired from a successful login.           |

---

### Messages Overview


| Method |          Endpoint          |         Requires        |                                           Description                                          |
|--------|----------------------------|-------------------------|------------------------------------------------------------------------------------------------|
|  POST  | `/api/users/:id/messages/` | Successful Login, `text` | Used for adding a new message to the database. **Only adds for current user!**                |
|  GET   | `/api/users/:id/messages/` |      Successful Login    | Used to show all messages in the database. **Only shows messages for current user!**          |
|  GET   |    `/api/messages/:id/`    |      Successful Login    | Used to show a specific message in the database. **Only works on messages for current user!** |
|  PUT   |    `/api/messages/:id/`    | Successful Login, `text` | Used to edit a specific message. **Only works on current user!**                              |
| DELETE |    `/api/messages/:id/`    |      Successful Login    | Used to delete a specific message. **Only works on current user!**                            |

---

### Add Message

Method used: **[POST]** `/api/users/:id/messages/`

On Success: Returns the Id of the new message.


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Authorization |**Header**|    yes   | Acquired from a successful login.           |
|    `text`     |  string  |    yes   |                                             |

---

### View All Messages

Method used: **[GET]** `/api/users/:id/messages/`

On Success: Returns an array containing all messages related to the current user.


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Authorization |**Header**|    yes   | Acquired from a successful login.           |

---

### View Specific Message

Method used: **[GET]** `/api/messages/:id/`

On Success: Returns an array containing the message specified in the params if it belongs to the current user.


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Authorization |**Header**|    yes   | Acquired from a successful login.           |

---

### Edit Specific Message

Method used: **[PUT]** `/api/messages/:id/`

On Success: Returns `1` if the message has been updated **and** belongs to the current user. Otherwise, nothing changes.


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Authorization |**Header**|    yes   | Acquired from a successful login.           |
|    `text`     |  string  |    yes   |                                             |

---

### Delete Specific Message

Method used: **[DELETE]** `/api/messages/:id/`

On Success: Returns `1` if the message has been deleted **and** belonged to the current user. Otherwise, nothing changes.


Parameters:

|      Name     |   Type   | Required |                   Notes                     |
|---------------|----------|----------|---------------------------------------------|
| Authorization |**Header**|    yes   | Acquired from a successful login.           |