Developed by: Eduardo Ribeiro de Morais
Date: 27/05/2024


In this project I used next.js for the front-end and .net for the back-end. Below are the details of each project and how to execute them.

### Back-end ###
The back-end is built in .net core 8. I am using entity framework, sql server, hangfire, fluent validation and mongodb.
To run the application, run the command "dotnet ef database update -s ./GotchaFeed -p ./Infraestructure" in the project root folder. 
This command will create all the necessary tables and will feed the database with user data and initial posts. Mongodb will also be feed on first use.
In this project I am using mongodb as a reading database and sql server for writing.
I'm using fluent validation to validate requests made by the client and hangfire for asynchronous processes.

### Front-end ###

The front end is built on next.js and I'm using libraries like Zustand to manage user state, Skeleton to load information, infinite scroll to load the feed, and bootstrap to help with components.
To run the application, simply run the npm-install command and then npm run dev. (remember to change the development env endpoint to your local enviroment).
To acesses the application you can use one of the following users: johnny, aliceJ, bobby, janeS

### Critique ###

The improvements I would initially make in this project would be authentication, using AzureAD B2C for example. 
The asynchronous process can also be improved by adding a queue service such as RabbitMQ or ServiceBus, and a WebJob or Azure Functions to perform the processing. 
Image storage could also be improved by saving these images in blobContainers, for example. 
Imagining a scenario where we had several users, we could also create personalized feeds for each user, and implement Redis Cache to avoid unnecessary queries to our database.
In the current project we do not have any visibility regarding logs or metrics, something very important in large applications. In this case, we could use datadog for the logs or azure AppInsight, if the application is in the azure cloud enviroment.

On the front-end, in addition to being able to improve the layout, we could also work with caching to avoid unnecessary calls to the back-end.
