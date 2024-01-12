# The Official Backend for KONECTIN

KONECTIN is an application that takes away the hassle of job searching. It connects you to top level recruiters and makes job hunting fun and stress free.


### Reference:
- [Backend Server URL](https://konectin-backend-hj09.onrender.com)  
- [API Documentation](https://documenter.getpostman.com/view/16987750/2s93RRvsyu)

## Development setup
### Prerequisites

- Install [Node.js >= 16.20.x](https://nodejs.org) which include [Node Package Manager](https://docs.npmjs.com/getting-started).
- Install [MongoDB](https://www.mongodb.com/docs/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/atlas).
- Create a [HubSpot developer account](https://app.hubspot.com/signup/developers). Hubsspot quick start [guide](https://developers.hubspot.com/docs/api/oauth-quickstart-guide).
- Create a [Cloudinary account](https://cloudinary.com) 
- Create an email service account of your choice.


### Run the application

1. Clone the repository:
    ```bash
    $ git clone your-fork-of-the-repo
    ```

2. Install the required dependencies: 
   ```
   npm install
   ```

3. Create environment file:  
    Copy .env.example to .env
    
    Below is a description of these env vars:

    ```
    NODE_ENV=development
    PORT=<you choose>
    MONGO_DB_URI=<mongodb URI for your mongodb install, e.g. mongodb://localhost:27017>
    JWT_SECRET=<jsonwebtoken secret>

    HUBSPOT_ACCESS_TOKEN=<taken hubspot oauth server response>
    HUBSPOT_APP_ID=<taken from hubspot app auth App ID>
    HUBSPOT_CLIENT_ID=<taken from hubspot app auth Client ID>
    HUBSPOT_CLIENT_SECRET=<taken from hubspot app auth Client secret>
    HUBSPOT_URL=<taken from hubspot app Install URL (OAuth)>

    CLOUDINARY_NAME=<taken from cloudinary account name>
    CLOUDINARY_API_KEY=<taken from cloudinary account API KEY>
    CLOUDINARY_API_SECRET=<taken from cloudinary account API SECRET>

    EMAIL_HOST=<your prefered email service SMTP HOST>
    EMAIL_PORT=<your prefered email service SMTP PORT>
    EMAIL_USER=<your prefered email service given user id>
    EMAIL_PASSWORD=<your prefered email service given user password>
    ``` 

3. Start the local server:  
   ```
   npm run dev
   ```

### Testing
#### Running Tests

```
npm run test
```

#### Writing Tests

Tests are written using Jest and Supertest. The test files are typically located in the `tests` directory.

### Team

**Lead Backend Developer** 
- Akinloluwa Olumuyide 

**Contributors** 
- Jeanne d'Arc NYIRAMWIZA