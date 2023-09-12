<h1 align="center" >

<img style="object-fit: cover;" src="https://user-images.githubusercontent.com/89428967/233867247-1b9f771e-582b-41ff-b1b0-a28321710d13.png" width="100px" height="100px"><br>
CHAT-API
</h1>

<img style="object-fit: cover;" src="https://github.com/Nelson-Dominici/Chat-API/assets/89428967/1cced367-8758-42e8-a28e-fe5a0f516617"><br>

<h2>🚀 About</h2>
<p>
Chat-API - It is a web-based real-time communication platform that allows users to connect and chat with each other in chat rooms. It was built using the Express.js framework and the MongoDB database to store user information and message history. Additionally, the Socket.io library was used to enable two-way communication between the server and the client, ensuring a smoother and more responsive real-time chat experience.
</p>

<h2>🛠 Technologies</h2>

<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://expressjs.com">Express.js</a></li>
<li><a href="https://github.com/arb/celebrate">Celebrate</a></li>
<li><a href="https://www.npmjs.com/package/bcryptjs">Bcryptjs</a></li>
<li><a href="https://jwt.io">JWT</a></li>
<li><a href="https://swagger.io">Swagger</a></li>
<li><a href="https://socket.io/">Socket.IO</a></li>

<li><a href="https://github.com/uuidjs/uuid">uuid</a></li>

<li><a href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwj55Keuh8H-AhXSQUgAHWI6AJgYABAAGgJjZQ&ohost=www.google.com&cid=CAESaeD2Pu1D_Hk1KMZvjxoYgsKou_WZMbut6psBg21J3zYmU_KhROP7j_ynqafvEGfcCQvM7x8G5ae9VA73HGSJz68iorxygk1B3JP-MVcyrjGEk6mQyc_b3vcgQrJSkMK8y1TB4PQC320bVQ&sig=AOD64_3jqLM2diySGZnqMPbI2SkSFKYvwA&q&adurl&ved=2ahUKEwjchKKuh8H-AhWrIbkGHZtEDUkQ0Qx6BAgJEAE">MongoDB</a></li>

<h3>🌱 Send and Receive events from Socket.io server</h3>
<p>
To send and receive events from the Socket.io server, the object that was returned from the connection between the client and the server will be used.
Below we will list all the events available in this API:
</p>

<h4> register </h4>
<p>
The "register" event is responsible for creating a room for the client, so that it can receive events from other clients. In addition to the name of the event, there are two other parameters, the user's JWT Token, and a callback that will receive true or false if the client has been registered successfully.
</p>

```javascript
const socket = io("Server URL");

socket.emit("register", "Bearer JWT", (response) => {
  
  if(response === true){
    console.log("successfully registered user");
  }else{
    console.log("Something Went Wrong");
  }
});
```

<h4> friendMessage </h4>
<p>
The friendMessage event will be emitted from the server when the client receives a message from his friend, it will contain the friend's number, name and message.
</p>

```javascript
const socket = io("Server URL");

socket.on("friendMessage", (data) => {
  console.log(data);
});
```

<h4> deleteMessage </h4>
<p>
The deleteMessage event will be emitted from the server when the client's friend deletes his own message, it will contain the friend's number and name.
</p>

```javascript
const socket = io("Server URL");

socket.on("deleteMessage", (data) => {
  console.log(data);
});
```

<h4> requestFriend </h4>
<p>
The requestFriend event will be emitted from the server when the client's friend request is accepted, it will contain the new friend's number and name.
</p>

```javascript
const socket = io("Server URL");

socket.on("requestFriend", (data) => {
  console.log(data);
});
```

<h4> brokenFriendship </h4>
<p>
The brokenFriendship event will be emitted from the server when a friend unfriends the customer, it will contain the number and name of the former friend.</p>

```javascript
const socket = io("Server URL");

socket.on("brokenFriendship", (data) => {
  console.log(data);
});
```

<h4> friendAccountDeleted </h4>
<p>
The friendAccountDeleted event will be emitted from the server when a friend of the client deletes his own account, it will contain the number and name of the old friend.
</p>

```javascript
const socket = io("Server URL");

socket.on("friendAccountDeleted", (data) => {
  console.log(data);
});
```



<h4> friendNewName </h4>
<p>
The friendNewName event will be emitted from the server when a friend of the client changes his name, it will contain the friend's number and name.
</p>

```javascript
const socket = io("Server URL");

socket.on("friendNewName", (data) => {
  console.log(data);
});
```


<h2>🔥 Author</h2>

| [<img src="https://avatars.githubusercontent.com/Nelson-Dominici" width=115><br><sub>Nelson Dominici</sub>](https://github.com/Nelson-Dominici) |
| :---: |
