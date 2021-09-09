const mongoose = require('mongoose');

const { MONGOLAB_URI } = process.env;

exports.connect = () =>
{
    // Connecting to the database
    mongoose
        .connect(MONGOLAB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() =>
        {
            console.log('Successfully connected to database');
        })
        .catch((error) =>
        {
            console.log('Database connection failed. exiting now...');
            console.error(error);
            process.exit(1);
        });
};
