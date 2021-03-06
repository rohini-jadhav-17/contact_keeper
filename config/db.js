const mongoose = require('mongoose');
// database connection string
const config = require('config');
// database connect variable
const db = config.get('mongoURI');

const connectDB = async () =>{
    try {
       await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });    
        console.log('Mongodb connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

// mongodb+srv://rohini17:rohini17@contactkeeper.o6q60.mongodb.net/?retryWrites=true&w=majority
// mongodb: //localhost:27017