Plaid layout GUI web application.

The PLAID Webb GUI currently supports the following features:
* Adding experimental data to a form and submitting it to generate a multiplate layout
* Downloading a form config file (json) and uploading it again to prepopulate the form
* Uploading a dzn file to bypass the form and directly generate a multiplate layout
* Uploading a previously computed layout (mzn) to view it again



# Testing the GUI

1. Start the development servers and setup the docker container by running docker-compose up --build in the root folder for the application.
2. Go to localhost:5000 and click on the **Tool** option in the sidebar menu
3. You can now test the form and the other functionalities!

**NOTE**
The docker container can't handle any examples that take over 1.5 minutes to compute. This is most likely a problem with minizinc in a docker environment. 
It is possible to test these examples without docker so keep your tests within a reasonable time limit.

