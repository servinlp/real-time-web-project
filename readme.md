# Real time web project

![](./readme-images/header.png)

This little project is 2 game that need 2 people. One person will be in the browser and connect/give access to slack while the other person will be in slack ready to send messages to the other person. When the game starts the person in slack can start sending messages. These will then appear as objects the person in the browser needs to avoid. The more objects he avoids, the higher the score.

### Get started

**NOTE**: You can't run this project locally. The slack api send events to an endpoint that needs to be online.

**.env**

If you still wish to run this project you will need to create an application in slack. From this you will need the following. A `CLIENT` and `CLIENT_SECRET` in the `.env` file. You get these when installing the app. Don't forget to set the scope for the project. This needs to be `im:read` to receive messages.

You will also need to add a `SECRET` to the `.env` file for the `express-session`.

To install you can use both `npm` and `yarn`

```sh
(npm|yarn) install
```

To run as dev. This will start [nodemon] on [http:localhost:8000].

```sh
(npm|yarn) dev
```

Or run normally at [http:localhost:8000].

```sh
(npm|yarn) start
```

[http:localhost:8000]: http:localhost:8000
[nodemon]: http://nodemon.io/

### Data flow

<details>
	<summery>The data flow image</summery>
	![](./readme-images/real-time-web-data-flow.png)
</details>

### Licensing

This project uses the MIT license.

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Where do the 0️⃣s and 1️⃣s live in your project? What db system are you using?-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->
