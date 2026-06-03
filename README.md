# PLAID Layout GUI Web Application.
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
![with-coffee](https://img.shields.io/badge/made%20with-%E2%98%95%EF%B8%8F%20coffee-yellow.svg)
[![GitHub Repo stars](https://img.shields.io/github/stars/pharmbio/plaid-gui?style=social)](https://github.com/pharmbio/plaid-gui/stargazers)

The PLAID Webb GUI currently supports the following features:
* Adding experimental data to a form and submitting it to generate a multiplate layout
* Downloading a form config file (JSON) and uploading it again to prepopulate the form
* Uploading a dzn file to bypass the form and directly generate a multiplate layout
* Uploading a previously computed layout (JSON) to view it again



# Testing the GUI
1. Clone or fork the repository
2. Start the development servers, make sure you're on the develop
branch and setup the docker container by running

```bash
$ docker-compose up --build
```

or

```bash
$ docker-compose up --build --force-recreate
```

in the root folder for the application.
3. Go to localhost:3000 and click on the **Tool** option in the sidebar menu
4. You can now test the form and the other functionalities!

**NOTE**
Make sure your Docker configuration allows for enough access to memory. The GUI might otherwise fail in some examples.

