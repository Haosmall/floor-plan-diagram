# Floor diagram - NodeJs

Initial:

    cd ./floor-diagram-server
    npm install

Start server:

    npm start

## Api

### Auth `/auth`

- `[POST] /login`: login.

  - body: {username: String, password: String}.
  - result: {\_id: String, username: String, username: String, role: String token: String}.

- `[POST] /registry`: registry.
  - body: {name: String, username: String, password: String}.
  - result: {\_id: String, username: String, username: String, role: String token: String}.
