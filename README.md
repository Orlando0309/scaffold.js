# Documentation

## Step 1: Database configuration

create a configuration for your database

``` javascript
const config={
    client: "mysql",
    connection: {
      host: "host",
      user: "user",
      password: "your_password",
      database: "database",
      port: 3306 // Add this line to specify the correct port
    },
    debug: true
}
```

## Step 2: Create your model

Import the `Scaffold` class:

``` javascript
const { Scaffold } = require("@orlando0309/scaffold/model");
```

Inherit your model class from `Scaffold`:

``` javascript
class Categorie extends Scaffold{
    table = "categorie";
}
```

## Step 3: create controllers

### Import the `ScaffoldController` class:

``` javascript
const { ScaffoldController } = require("@orlando0309/scaffold/controller");
```

### inherit your controllers with

``` javascript
class CategorieController extends ScaffoldController{
    modelClass = Categorie;
    config = config
    url="categorie"
}
```

#### Parameters:

* `config`:Database configuration object
* `modelClass`: Your model class.
* `url`:The URL of your CRUD API.

## Step 4: Routing

### Import the `getRoutes` method:

``` javascript
const { getRoutes } = require("@orlando0309/scaffold/routes");
```

### Use your controller to get the routes:

``` javascript
const {CategorieController} = require("../controllers/controller");
router = getRoutes({CategorieController},"/api")
```

#### Notes:

* The `getRoutes` method returns an object with all of the routes for your CRUD API.
* You can then use the `router` object to mount your routes to your application.

## Authentification

scaffold.js library can provide some features to authenticate user using its API.
Documentation coming soon...