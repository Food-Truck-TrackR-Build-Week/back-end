### Diner schema

    {
      id: integer,
      userId: integer,
      username: string,
      password: string,
      email: string,
      currentLocation: string,
      favoriteTrucks: array of truck objects
    }

### Operator schema

    {
      id: integer,
      userId: integer,
      username: string,
      password: string,
      email: string,
      trucksOwned: array of truck objects
    }

### Truck schema

    {
      id: integer,
      name: string,
      imageOfTruck: string,
      cuisineType: string,
      currentLocation: string,
      departureTime: date and time (in ms since 1/1/70),
      operatorId: integer,
      menu: array of menuItems objects,
      customerRatings: array of customerRating values (integers),
      customerRatingAvg: integer
    }

### Menu Item schema

    {
      id: integer,
      menuId: integer,
      itemName: string,
      itemDescription: string,
      itemPrice: integer
      itemPhotos: array of URLs (strings)
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
- returns a JSON web `token`, user `type` (either `diner` or `operator`), and the user's `diner` or `operator` object - include `{ 'authorization': 'Bearer <token>' }` in request headers to access restricted endpoints

GET /api/trucks - restricted, returns an array of all trucks

GET /api/trucks/:id - restricted, returns the truck with the given id

POST /api/trucks - restricted, creates a new truck

- `req.body`: `name`, `imageOfTruck`, `cuisineType`, `currentLocation`, and `operatorId` are required, `departureTime` defaults to current time if not provided
- returns the new truck that was added to the db

PUT /api/trucks/:id - restricted, updates the truck with the given id

DELETE /api/trucks/:id - restricted, deletes the truck with the given id

GET /api/trucks/:id/menu - restricted, returns an array of the `menuItems` from the `menu` for the `truck` with the given id

POST /api/trucks/:id/customerRatings - restricted, adds a customerRating to the truck with the given id

- `req.body`: `customerRating` is required
- returns the customerRating added to the db

DELETE /api/trucks/:truckId/customerRatings/ratingId - restricted, deletes the customerRating with the given ratingId from the truck with the given truckId

POST /api/menus/:id - restricted, adds a menuItem to the menu with the given id

- `req.body`: `itemName`, `itemDescription`, and `itemPrice` are required
- returns the menuItem added to the db

PUT /api/menus/:menuId/menuItems/:menuItemId - restricted, updates the menuItem with the given menuItemId

- returns the updated menuItem

DELETE /api/menus/:menuId/menuItems/:menuItemId - restricted, removes the menuItem with menuItemId from the menu with menuId

POST /api/menus/:menuId/menuItems/:menuItemId/itemPhotos - restricted, adds a url (string) to the `itemPhotos` array for the menuItem with the given id

- `req.body`: a `url` (string) is required
- returns the updated array of itemPhotos

DELETE /api/menus/:menuId/menuItems/:menuItemId/itemPhotos - restricted, removes a url (string) from the `itemPhotos` array for the menuItem with the given id

- `req.body`: a `url` (string) is required
- returns the updated array of the itemPhotos

GET /api/diners/:id - restricted, returns the diner with the given id

GET /api/diners/:id/favoriteTrucks - restricted, returns an array of the diner with the given id's favorite trucks

POST /api/diners/:id/favoriteTrucks - restricted, adds a truck to the diner with the given id's favorite trucks

- `req.body`: `truckId` is required
- returns the updated array of the diner's favorite trucks

DELETE /api/diners/:id/favoriteTrucks - restricted, deletes a truck from the diner with the given id's favorite trucks

- `req.body`: `truckId` is required
- returns the updated array of the diner's favorite trucks

GET /api/operators/:id - restricted, returns the operator with the given id

GET /api/operators/:id/trucksOwned - restricted, returns an array of trucks owned by the operator with the given id
