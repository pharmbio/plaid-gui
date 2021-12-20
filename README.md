# PLAID Layout GUI Webb Application.

The PLAID Webb GUI currently supports the following features:
* Adding experimental data to a form and submitting it to generate a multiplate layout
* Downloading a form config file (json) and uploading it again to prepopulate the form
* Uploading a dzn file to bypass the form and directly generate a multiplate layout
* Uploading a previously computed layout (mzn) to view it again

Use:
docker-compose up -d --build

or

docker-compose up --build --force-recreate


# Testing the GUI
1. Clone or fork the repository
2. Start the development servers, make sure you're on the develop branch and setup the docker container by running docker-compose up --build in the root folder for the application.
3. Go to localhost:3000 and click on the **Tool** option in the sidebar menu
4. You can now test the form and the other functionalities!

**NOTE**
Make sure your docker configuration allows for enough access to
memory. The GUI might fail in some examples otherwise.

