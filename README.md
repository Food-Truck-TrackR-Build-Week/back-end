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

- `req.body`: `username`, `password`, `email` and `location` are required
- returns the new diner that was added to the db

POST /api/auth/register/operator - creates a new operator

- `req.body`: `username`, `password`, and `email` are required
- returns the new operator that was added to the db

POST /api/auth/login - authenticates a diner or operator

- `req.body`: `username` and `password` are required
- returns a JSON web token - include `{ authorization: Bearer <token> }` in request headers to access restricted endpoints

GET /api/trucks - restricted, returns an array of all trucks

GET /api/trucks/:id - restricted, returns the truck with the given id

POST /api/trucks - restricted, creates a new truck

- `req.body`: `imageOfTruck`, `cuisineType`, `currentLocation`, `departureTime` and `operatorId` are required
- returns the new truck that was added to the db

PUT /api/trucks/:id - restricted, updates the truck with the given id

DELETE /api/trucks/:id - restricted, deletes the truck with the given id

GET /api/diners/:id/favoriteTrucks - restricted, returns an array of the diner with the given id's favorite trucks

POST /api/diners/:id/favoriteTrucks - restricted, adds a truck to the diner with the given id's favorite trucks

- `req.body`: `truckId` is required
- returns the updated array of the diner's favorite trucks

DELETE /api/diners/:id/favoriteTrucks - restricted, deletes a truck from the diner with the given id's favorite trucks

- `req.body`: `truckId` is required
- returns the updated array of the diner's favorite trucks

GET /api/operators/:id/trucksOwned - restricted, returns an array of trucks owned by the operator with the given id
