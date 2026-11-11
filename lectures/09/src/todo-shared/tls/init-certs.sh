#!/bin/sh
set -eu
umask 077

if [ -s /certs/localhost.crt ] && [ -s /certs/localhost.key ]; then
  echo "Reusing localhost certificate."
  exit 0
fi

mkdir -p /certs/ca
if [ ! -s /certs/ca/root.crt ] || [ ! -s /certs/ca/root.key ]; then
  openssl req -x509 -newkey rsa:2048 -nodes -days 3650 \
    -keyout /certs/ca/root.key -out /certs/ca/root.crt \
    -subj '/CN=Todo localhost development CA' \
    -addext 'basicConstraints=critical,CA:TRUE' \
    -addext 'keyUsage=critical,keyCertSign,cRLSign'
fi

openssl req -new -newkey rsa:2048 -nodes \
  -keyout /certs/localhost.key -out /tmp/localhost.csr \
  -subj '/CN=localhost'
printf '%s\n' \
  'subjectAltName=DNS:localhost' \
  'basicConstraints=critical,CA:FALSE' \
  'keyUsage=critical,digitalSignature,keyEncipherment' \
  'extendedKeyUsage=serverAuth' > /tmp/localhost.ext
openssl x509 -req -in /tmp/localhost.csr \
  -CA /certs/ca/root.crt -CAkey /certs/ca/root.key -CAcreateserial \
  -days 365 -extfile /tmp/localhost.ext -out /certs/localhost.crt
chmod 644 /certs/ca/root.crt /certs/localhost.crt
echo "Created localhost certificate. Trust certs/ca/root.crt on your host."
