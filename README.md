diner schema:
username: string
password: string
email: string
location: string

operator schema:
username: string
password: string
email: string

Create a new diner: POST /api/auth/diner

Create a new operator: POST /api/auth/operator

Login: POST /api/auth/login

View a truck: GET /api/trucks/:id
Create a truck: POST /api/trucks
Update a truck: PUT /api/trucks/:id
Delete a truck: DELETE /api/trucks/:id
