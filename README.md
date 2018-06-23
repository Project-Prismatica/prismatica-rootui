[![Docker Repository on Quay](https://quay.io/repository/project-prismatica/prismatica-rootui/status "Docker Repository on Quay")](https://quay.io/repository/project-prismatica/prismatica-rootui)

# Overview
The Prismatica-RootUI is the central user interface for the distributed
prismatica runtime.

# Running
Running this in production requires a number of additional dependences such as:
* Mongodb
* [Prismatica Report Renderer](https://github.com/Project-Prismatica/prismatica_report_renderer)

Which is otherwise orchestrated using the recommended launch system:
[Prismatica Infrastructure](https://github.com/Project-Prismatica/prismatica-infrastructure)

# Developing
As the project is based on [Meteor](https://www.meteor.com/), use the following
to initialize a development instance of the RootUI:
```bash
$ cd ui-root
$ meteor --settings settings.json
=> Started proxy.
=> Started MongoDB.
I20180511-09:09:54.836(-5)? [FilesCollection.storagePath] Set to: assets\app\uploads\Images
=> Started your app.

=> App running at: http://localhost:3000/
   Type Control-C twice to stop.
```

Additionally note that one may have to specifically configure the UI server
using ```settings.json``` for things like the address of a development report
renderer and other similar details.
