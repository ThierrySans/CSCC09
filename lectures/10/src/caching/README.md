Start a memcached docker container: 

```
$ docker run -p 11211:11211 -d memcached
```

Flush it

```
echo 'flush_all' | nc localhost 11211
```