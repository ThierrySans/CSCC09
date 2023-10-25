import { workerData, parentPort } from 'worker_threads';

workerData.sort();
parentPort.postMessage(workerData);
