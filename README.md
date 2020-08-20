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
