import http from './src/app.js';

import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

const numCPU = os.cpus().length

const argv = minimist(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'modo'
    }
});

if(argv?.m == 'cluster') {
    if (cluster.isPrimary) {
        for (let i = 0; i < numCPU; i++) {
            cluster.fork()
        }
        cluster.on('exit', function() {
            console.info(`process ${process.pid} died`)
        })
    } else {
        http.listen(argv?.port + cluster.worker.id, () => console.info(`Server up and running on port ${argv?.port + cluster.worker.id}, PID ${process.pid}`))
    }
} else {
    http.listen(8080, () => console.info(`Server up and running on port ${argv?.port}, PID ${process.pid}`))
}