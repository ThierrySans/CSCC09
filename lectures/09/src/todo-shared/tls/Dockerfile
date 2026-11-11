FROM alpine:3.23
RUN apk add --no-cache openssl
COPY init-certs.sh /init-certs.sh
ENTRYPOINT ["sh", "/init-certs.sh"]
