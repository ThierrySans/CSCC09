const { workerData, parentPort } = require('worker_threads');

workerData.sort();
parentPort.postMessage(workerData);
