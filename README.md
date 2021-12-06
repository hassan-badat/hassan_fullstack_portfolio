# Developer Showcase

Created by Hassan Badat.

## About

It is common for potential employers to see some sort of repository to have an outlook of the work I have done. Unfortunately, it is not possible for me to make my work public because of legal and moral obligations. Because of this I have started working on basic REST API built with Node.js and Express. Hopefully this project can bring up some talking points in any future interview.
\
\
While this API is not complete in any way, it is a good indicator of how my professional projects generally start.

## Skills

### Authentication

I generally implement authentication with [jsonwebtoken](https://jwt.io/). View these folders/files for a deeper look.

```zsh
./middleware/*
./routes/v1/customer.ts  (Login and Register routes)
```

### Database modeling

I am most comfortable with using [mongoosejs](https://mongoosejs.com/) to help create some sort of structure when working with [MongoDB](https://www.mongodb.com/).Take a look at the models folder

```zsh
./models/*
```

### CRUD

I demonstrate creating, reading, updating, and deleting throughout all of the route files.

```zsh
./routes/v1/*
```

### Aggregation Framework

I am fairly familiar with [MongoDB's aggregation framework](https://docs.mongodb.com/manual/aggregation/). Checkout the following files to see some use cases.

### Writing Clean and Readable code

Take a look at the main server file to see how I break up the code to prevent any file from becoming too large.

```zsh
server.ts
```

### Secure

Looking at the code, you will notice that environmental variables are not exposed. I am using the [config](https://www.npmjs.com/package/config) package to handle using sensitive data (such as database URIs and token secrets) safely. I am also using [bcrpyt](https://www.npmjs.com/package/bcryptjs) to encrypt passwords so they are not stored plain text.

## What about Front End?

Due to time restraints, this backend is not currently interfacing with any application. Here are links to a few of my projects that you can take a look at as an end user. Feel free to ask me how any of these applications work during an interview! \
\
[Chimspect (staging)](https://staging.chimspect.app/) \
\
[COVID Tracker](https://covidtrackerus.org) \
\
[Rick Dejonge Music](https://www.rickdejongemusic.com/)
