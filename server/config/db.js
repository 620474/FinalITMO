const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
module.exports = function connectToDB() {
    mongoose.connect("mongodb://localhost:27017/vue-db", {useNewUrlParser: true}, error => {
        if (error) {
            console.log('Unable to connect to database');
            throw error;
        } else {
            console.log('Connected to MongoDB!');
        }
    });
}
