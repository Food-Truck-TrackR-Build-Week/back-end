### Diner schema

    {
      id: integer,
      dinerId: integer,
      username: string,
      password: string,
      email: string,
      location: string
    }

### Operator schema

    {
      id: integer,
      operatorId: integer,
      username: string,
      password: string,
      email: string
    }

### API

POST /api/auth/register/diner - creates a new diner

- username, password, email and location are required

POST /api/auth/register/operator - creates a new operator

- username, password, and email are required

POST /api/auth/login - authenticates a diner or operator

- username and password are required
