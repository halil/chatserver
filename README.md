# chatserver


# API DOCUMENTATION
# POST /login

+ Request (application/json)

        {"username":"halil","password":"123456"}

+ Response 200 (application/json; charset=utf-8)

    + Headers

            Etag: W/"69-40beeae2"
            X-Powered-By: Express

    + Body

            {"status":"ok","auth":{"key":"c56d0e9a7ccec67b4ea131655038d604","expireDate":"2015-06-03T13:53:19.000Z"}}

# GET /rooms

+ Request (application/json)

    + Headers

            X-AUTH-TOKEN: c56d0e9a7ccec67b4ea131655038d604



+ Response 200 (application/json; charset=utf-8)

    + Headers

            Etag: W/"5a-c6bed484"
            X-Powered-By: Express

    + Body

            {"status":"ok","rooms":[{"roomId":1,"name":"İlk Oda"},{"roomId":2,"name":"İkinci Oda"}]}

# POST /rooms/1/join

+ Request (application/json)

    + Headers

            X-AUTH-TOKEN: c56d0e9a7ccec67b4ea131655038d604

    + Body

            {}

+ Response 200 (application/json; charset=utf-8)

    + Headers

            Etag: W/"c1-d57fefb"
            X-Powered-By: Express

    + Body

            {"status":"ok","rooms":{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":34,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}}

# GET /rooms/1/messages

+ Request (application/json)

    + Headers

            X-AUTH-TOKEN: c56d0e9a7ccec67b4ea131655038d604



+ Response 200 (application/json; charset=utf-8)

    + Headers

            Etag: W/"c3-4d638c7b"
            X-Powered-By: Express

    + Body

            {"status":"ok","messages":[{"message":"sdsdfsdfsfd","username":"halil","messageDate":"2015-05-02T16:45:47.000Z"},{"message":"qwerte","username":"halil","messageDate":"2015-05-02T16:45:57.000Z"}]}
