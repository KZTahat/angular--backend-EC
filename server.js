const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');
const port = process.env.PORT || 3000;
const DB = process.env.MONGODB_URI;

// mongo database setup
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then((con) => {
        // con is shortcut for connect we add con inside callback fun above
        console.log('DB connection successful');
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });

const db = mongoose.connection;
db.on('error', () => {
    console.log('error connecting to database');
})
db.once('open', () => {
    console.log('> successfully opened the database');
});

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// for handling unhandled promise rejections (errors outside Express)
process.on('unhandledRejection', (err) => {
    console.log('unhandled Rejection! 💥 Shutting down...');
    console.log(err.name, err.message);
    // close the server and exit
    server.close(() => {
        // exit the process
        process.exit(1);
    });
});