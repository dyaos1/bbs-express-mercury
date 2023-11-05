echo "wait db server"
dockerize -wait tcp://db:3308 -timeout 20s

echo "start node server"
node mock/mockaroo.js