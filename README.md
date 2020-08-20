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
POST /api/auth/register/operator - creates a new operator  
POST /api/auth/login - authenticates a diner or operator
