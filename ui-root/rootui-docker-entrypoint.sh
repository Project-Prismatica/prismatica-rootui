#!/usr/bin/env bash

# In English, the regex is, look for "anything://", anything that's not a slash
# followed with a ":portnumber", and everything after the slash and replace it with
# the second group (not-slashes followed by portnumber)
db_host=$(echo $MONGO_URL | sed -e 's/\(.*:\/\/\)\([^\/]\+:[0-9]\+\)\(\/.*\)/\2/')

echo "waiting for mongodb at $db_host"
wait-for-it.sh  "$db_host" -- echo "mongodb available"

exec "$@"