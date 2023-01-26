# React CRUD consuming Odoo API module

This project is just that: A React frontend consuming an Odoo API.

This example is about bicyles. 

So a "bicycles" odoo module has been created, which is consumed from React.

The frontend is based on bezcoder example:
https://www.bezkoder.com/react-hooks-crud-axios-api/

## Prerequisites

You need a working environment with:
* [Git](https://git-scm.com) - You can install it from https://git-scm.com/downloads.
* [Node.js](https://nodejs.org) - Install node.js from https://nodejs.org/es/download/. It's advisable to install the LTS version.
* [Docker](https://www.docker.com/) - Install it if you want to deploy this project with Docker.

## General Installation instructions

The best option to start with this project is cloning it in your PC:

```
git clone https://github.com/tcrurav/react-consuming-odoo-api.git
```

This project contains 2 different parts:
* Frontend
* Backend

### In your Backend:

You can use Docker for your backend. Once you have your Docker-Desktop running just:

```
cd react-consuming-odoo-api/backend
docker-compose up -d
```

Now you should be able to access your Odoo installation. Follow the steps to install the "bicycles" module:

Enter credentials and remember data to later update frontend/.env file:

![Create Project](/screenshots/2-starting-alt.png)

Edit URL adding `?debug=1` to enter developper mode in Odoo:

![Create Project](/screenshots/3-starting.png)

Update Apps List to be able to install `bicycles` module:

![Create Project](/screenshots/4-starting.png)

Install `bicycles` module:

![Create Project](/screenshots/5-starting-alt.png)

Check that `bicycles` module is installed:

![Create Project](/screenshots/6-starting.png)

Follow similar steps to install "auth_session_info" module. The result would be:

![Create Project](/screenshots/6-y-medio-starting.png)

After installing "auth_session_info" modify the 2 following files in module "web". Notice the red marked places:

File `addons/web/controllers/main.py`:
![Create Project](/screenshots/7-web-controllers-main.py-alt.png)

File `addons/web/models/ir_http.py`:
![Create Project](/screenshots/8-web-models-ir_http.py-alt.png)

Don't forget to restart the Odoo container:

```
docker restart odoo-frontend
```

### In your Frontend:

You need a node.js working environment. The 16.19.0 LTS is recommended: https://nodejs.org/es/

At the moment of the creation of this project the http-proxy-middleware is not working with node 18 LTS so node 16 LTS is highly recommended.

```
$ node --version
v16.19.0
```

Once you have cloned your project install all dependencies.

```
cd react-consuming-odoo-api/frontend
npm install
```

To configure your environment you can create a frontend/.env file: 

```
PORT=8081
REACT_APP_ODOO_BASEURL=http://localhost:8069
REACT_APP_ODOO_DB=bike-shop
REACT_APP_ODOO_LOGIN=alberto@tiburcio.com
REACT_APP_ODOO_PASSWORD=albertotiburcio
```

Now you can start your frontend React App:

```
npm start
```

If you follow the former instructions the 2 different parts of this project will be running on the following urls:
* Frontend (http://localhost:8081)
* Backend (http://localhost:8069)

Enjoy!!!

## The most interesting parts of the project:

The most interesting files to check are:
* File `backend/extra-addons/bicycles/controllers/controllers.py`, which implement the CRUD operations in ODOO resulting in the API to be consumed.
* File `frontend/src/services/BicycleService.js`, where you can see how the frontend consumes the ODOO API.
* File `frontend/src/setupProxy.js`, where you can see the configuration of http-proxy-middleware which has been used to avoid CORS problems in development environment.
* module auth_session_info available for Odoo 13. You can download this module from https://apps.odoo.com/apps/modules/13.0/auth_session_info. This module makes possible to return the session_id. To make it work in Odoo 14 is also necessary to update the files `addons/web/controllers/main.py` and `addons/web/models/ir_http.py`.

## Interesting commands to create your own Odoo module

With this command you can enter into an odoo container:

```
docker exec -it <odoo-container-id> bash
```

With this command you can create the skeletton of a module in odoo:
```
/usr/bin/odoo scaffold bicycles /mnt/extra-addons/
```

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The Editor used in this project
* [React](https://reactjs.org/) - React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
* [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.
* [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) - Node.js proxying made simple.

## About this project

This project has been done by the teachers of 2-DAM-T to integrate Odoo with the Full Stack Project in our classroom.

## Special Acknowledgements to Gonzalo

* https://github.com/GonzaloSS/centralU-firstProject. Github Project from our former student Gonzalo. Without Gonzalo's help we would have never be able to successfully end this project example.

## Acknowledgements

* https://github.com/yezyilomo/odoo-rest-api/blob/master/controllers/controllers.py. There you can find examples of end-points using authentication and error management among others.
* https://github.com/yezyilomo/odoo-rest-api. Very interesting tutorial.
* https://www.odoo.com/documentation/14.0/developer/reference/addons/http.html. Odoo Api documentation.
* https://www.cluemediator.com/category/reactjs. Excellent tutorial as a basis for learning the basics needed for this project.
* https://bezkoder.com/react-crud-web-api/. Another excellent tutorial to learn about the basics of this project.
* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2. A very complete template for README.md files.
* https://www.theserverside.com/video/Follow-these-git-commit-message-guidelines. Guidelines to write properly git commit messages.