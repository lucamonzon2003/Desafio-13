import http from './src/app.js';

import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

const numCPU = os.cpus().length

const argv = minimist(process.argv.slice(2), {
    alias: {
        p: 'port'
    }
});

const PORT = argv?.port || 8081;

if (cluster.isPrimary) {
    for (let i = 0; i < numCPU; i++) {
        cluster.fork()
    }
    cluster.on('exit', function() {
        console.log(`process ${process.pid} died`)
    })
} else {
    http.listen(PORT, () => console.info(`Server up and running on port ${PORT}, PID ${process.pid}`))
}
