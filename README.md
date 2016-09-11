# Delivery Admin

[![node](https://img.shields.io/badge/node-6.7.0-brightgreen.svg)]()


## To se google maps
```
$ sudo vim /etc/hosts
```
add
127.0.0.1     wbruno.local
and goes on your browser to

wbruno.local:3000


```
$ npm i -g nodemon gulp
$ npm i; bower i
```

```
$ mongoimport -d delivery-admin -c postalcodes --type csv  --file ~/Downloads/ceps.csv --headerline
$ mongoimport --host localhost --port 27017 -u delivery-admmin -d delivery-admmin -c postalcodes --type csv  --file ./ceps.csv --headerline -p ...
```

# Run application
```
$ mongod &
$ gulp; npm start
```
