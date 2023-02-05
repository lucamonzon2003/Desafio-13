import http from './src/app.js';
import dbConfig from './src/services/databases/config/mongo.js';
import mongoose from 'mongoose'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2), {
    alias: {
        p: 'port'
    }
});

// t
const PORT = argv?.port || 8081;


mongoose.connect(dbConfig.mongoUri, dbConfig.config).then(() => {
    http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`))
}).catch(err => {
    console.error(err.message)
})