### Diner schema

    {
      id: integer,
      userId: integer,
      username: string,
      password: string,
      email: string,
      currentLocation: string
    }

### Operator schema

    {
      id: integer,
      userId: integer,
      username: string,
      password: string,
      email: string
    }

### Truck schema

    {
      id: integer,
      imageOfTruck: string,
      cuisineType: string,
      currentLocation: string,
      departureTime: date,
      operatorId: integer
    }

### API

POST /api/auth/register/diner - creates a new diner

- username, password, email and location are required
- returns the new diner object that was added to db

POST /api/auth/register/operator - creates a new operator

- username, password, and email are required
- returns the new operator object that was added to db

POST /api/auth/login - authenticates a diner or operator

- username and password are required
- returns a JSON web token - include `{ authorization: Bearer <token> }` in request headers to access restricted endpoints

GET /api/trucks - restricted, returns an array of truck objects

GET /api/trucks/:id - restricted, returns the truck with the given id

POST /api/trucks - restricted, creates a new truck

PUT /api/trucks/:id - restricted, updates the truck with the given id

DELETE /api/trucks/:id - restricted, deletes the truck with the given id
