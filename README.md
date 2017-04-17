# EMV router
EMV router provides a directive to route the location hash of the browser to a view and an associated model. This directive
is very usefull if your want to make a one page application.

EMV router also provides a transformation 'path', to generates urls from the defined routes

# Install

## Legacy
```html
<script type="text/javascript" src="path/to/emv.min.js"></script>
<script type="text/javascript" src="path/to/emv-router.min.js"></script>
```

## Require AMD
```javascript
require.config({
    paths : {
        emv : 'path/to/emv.min',
        'emv-translate' : 'path/to/emv-router.min'
    },
    shim : {
        emv : {
            exports : ['EMV']
        },
        'emv-router' : {
            deps : ['emv']
        }
    }
});

require(['emv', 'emv-router'], (EMV) => {
    ...
});
```

## NodeJS project
```javascript
const emv = require('emv');
require('emv-router');
```

# First example
`index.html`

```html
<html>
    <head>
        <script type="text/javascript" src="emv.min.js"></script>
        <script type="text/javascript" src="emv-router.min.js"></script>
        <!-- Integrate page models -->
        <script type="text/javascript" src="home.js"></script>
        <script type="text/javascript" src="contacts.js"></script>
        <!-- Integrate the application manager -->
        <script type="text/javascript" src="index.js"></script>
    </head>
    <body>
        <ul id="menu">
            <li><a href="#/">Home</a></li>
            <li><a href="#/contacts">Contact</a></li>
        </ul>
        <div e-router></div>
    </body>
</html>
```

`index.js`
```javascript
EMV.config.routes = {
    home : {
        path : '/',
        templateUrl : 'path/to/view-home.html',
        model : emvHomeInstance
    },
    contact : {
        path : '/contacts',
        templateUrl : 'path/to/view-contacts.html',
        model : emvContactInstance
    },
    // other routes
};

const app = new EMV();
app.$apply();
```

`home.js`
```javascript
const emvHomeInstance = new EMV({
    ...
});
```

`contact.js`
```javascript
const emvContactInstance = new EMV({
    ...
});
```

# Router definition
To defines the application routes, you must declare the object `EMV.config.routes`. The keys of this object are the name of the
routes, and the associated objects contains the following data :

* **path** (string) : The path of the route
* **templateUrl** (string) : THe path to the HTML view
* **template** (string) : Alternatively to **templateView**, you can declare a template in the main view, and call it using the property **template**
* **model** (EMV) : The EMV instance that will be applied on the view
* **init** (string) (optional) : The nama of a method in model, that will be applied when the view is displayed. It can be usefull if you want to reset page data when displaying it

## Paths with parameters
A path can be a static string, or it can accept parameters, if the page to display depends on a specific dataset. Here is the syntax to define a path with parameters :
```javascript
EMV.config.routes = {
    contact : {
        path : 'contacts/{contactId}'
    }
}
```

Then, in this example, if you enter the location hash '/contact/1', or '/contacts/alex', the route **contact** will be catched

# The object EMV.$router
When you insert emv-router, an object is created : `EMV.$router`. This object is an EMV instance, with the following methods :

## EMV.$router.path : The current router path

## EMV.$router.route : The current router route

## EMV.$router.routes : All the defined routes

## EMV.$router.template : The current displayed template name

## EMV.$router.model : The current active model

## EMV.$router.getPath(routeName, data)
Get a path by the name of it route name, and the data to inject :

### Parameters :
* **routeName** (string, mandatory) : The name of the route, as defined in EMV.config.routes
* **data** (Object, optional) : The data to inject in the path

### Example : With the previous example on the route 'contact', you can get it path doing :
```javascript
EMV.$router.getPath('contact', 1); // '/contacts/1'
```

## EMV.$router.getRoute(routeName)
Get the route object by it name

### Parameters :
* **routeName** (string, mandatory) : The name of the route, as defined in EMV.config.routes

## EMV.$router.getRouteNameByPath(path) :
Find the name of the first route matching the given path

### Parameters :
* **path** (string, mandatory) : The path to get the matching route

## EMV.$router.getRouteByPath(path) :
Find the first route matching the given path

### Parameters :
* **path** (string, mandatory) : The path to get the matching route


# The 'path' transformation
The 'path' transformation is useful to write, in the `<a>` tags of your views, paths to other views, without taking care
of the real route path. So, your won't referer to the path, but to the route name, which is useful if the paths of your routes
depends on user environment, for example his language.

With the following routes declaration :
```javascript
EMV.config.routes = {
    home : {
        path : '/',
        ...
    },
    contact : {
        path : '/contacts/{id}'
    }
};
```

In your views, you can write :
```html
<a href="${ 'home' :: path}">Home</a>
<ul>
    <li e-each="contacts">
        <a href="${ 'contact' :: path(id: id) }">${contactName}</a>
    </li>
</ul>
```

Note : 'path' transformation add the '#' at the beginning of the generated path, don't add it manually