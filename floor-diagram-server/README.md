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

- `[POST] /registry`: registry.
  - body: {name: String, username: String, password: String}.

### Users `/users`

- `[GET] /`: get list users.

- `[GET] /me`: get user profile.

### Buildings `/buildings`

- `[GET] /`: get list buildings.

  - params: { name: String (Optional) }

- `[POST] /`: add new building.

  - body: {name: String, admin: String}.

- `[PUT] /:buildingId/`: update building.

  - body: {name: String, admin: String}.

- `[DELETE] /:buildingId/`: delete building.

- `[GET] /:buildingId/`: get building by id.

  - params: { buildingId }

- `[GET] /:buildingId/floors/`: get list floors by building id.

  - params: { buildingId }

- `[GET] /:buildingId/groups/`: get list groups by building id.

  - params: { buildingId }

- `[GET] /:buildingId/projects/`: get list projects by building id.
  - params: { buildingId }

### Floor `/floor`

- `[POST] /`: add new floor.

  - body: {name: String, buildingId: String, admin: String, users: [userId: String]}.

- `[PUT] /:floorId/`: update floor.

  - body: {name: String, buildingId: String, admin: String, users: [userId: String]}.

- `[DELETE] /:floorId/`: delete floor.

  - params: { floorId }

- `[GET] /:floorId/`: get floor by id.

  - params: { floorId }

- `[GET] /:floorId/shapes/`: get list shapes by floor id.

  - params: { floorId }

### Groups `/groups`

- `[POST] /`: add new group.

  - params: { buildingId }
  - body: {title: String, buildingId: String}.

- `[PUT] /:groupId/`: update group.

  - params: { buildingId }
  - body: {title: String, buildingId: String}.

- `[DELETE] /:groupId/`: delete group.

  - params: { groupId }

- `[GET] /:groupId/shapes/`: get list shapes by group id.

  - params: { groupId }

### Projects `/projects`

- `[POST] /`: add new project.

  - params: { groupId }
  - body: {title: String, groupId: String}.

- `[PUT] /:projectId/`: update project.

  - params: { groupId }
  - body: {title: String, groupId: String}.

- `[DELETE] /:projectId/`: delete project.

  - params: { projectId }

- `[GET] /:projectId/shapes/`: get list shapes by project id.

  - params: { projectId }

### Shape `/shape`

- `[POST] /`: add new shape.

  - body: shape

    - type: String,
    - x: number,
    - y: number,
    - floorId: number,
    - width: number (optional),
    - height: number (optional),
    - rotation: number (optional),
    - radius: number (optional),
    - src: String (optional),
    - staff: String (optional),
    - items: [ String ] (optional),
    - projectId: number (optional)

- `[PUT] /:shapeId/`: update shape.

  - body: shape

    - type: String,
    - x: number,
    - y: number,
    - floorId: number,
    - width: number (optional),
    - height: number (optional),
    - rotation: number (optional),
    - radius: number (optional),
    - src: String (optional),
    - staff: String (optional),
    - items: [ String ] (optional),
    - projectId: number (optional)

- `[PUT] /`: update many shape.

  - body: {shapes: []}

- `[DELETE] /:shapeId/`: delete shape.

- `[DELETE] /`: delete many shapes.

  - body: {shapeIds : []}

- `[POST] /back-ground/`: add background.

  - body: {file: File, floorId: String}

- `[PATCH] /:shapeId/back-ground/`: update background.

  - body: {file: File}
