Test contract with server

REQUIREMENTS:
 - GOLANG (https://golang.org/doc/install)
 - nodejs (https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)
 - npm (same link as above)
 - eris-db (https://github.com/eris-ltd/eris-db)
 - eris-keys (https://github.com/eris-ltd/eris-keys)

In order to run this Follow the erisdb instructions for setting up an running an erisdb instance. MAKE SURE YOU FOLLOW THESE FOR SETTING IT UP. THIS EXAMPLE SERVER ASSUMES YOU ARE USING THE EXAMPLE_DATABASE (https://github.com/eris-ltd/eris-db.js/tree/master/templates/example_database)

In one terminal start the `eris-keys server` and then `erisdb /Path/to/template/folder` once you are sure its running...

In another terminal navigate to the test folder (where this README is located)

run `npm install` to install the dependancies and then run `node test.js` navigate in a browser to `localhost:8080/get` and you should see "Hello, World!" 