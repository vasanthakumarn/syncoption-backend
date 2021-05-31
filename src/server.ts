import express from 'express';
import {Server} from 'socket.io';
import cors from 'cors';

const port = 3000;
const app = express();
app.use(cors());

/**
 * MARKET DATA API END POINT AND SEND RESPONSE AFTER 10SECONDS
 */
app.get('/marketdata', (req, res) => {
    let data = getMarketData();
    //SIMULATE TO CANCEL THE REQUEST FROM FRONT END
    setTimeout(() => {
        res.send({data});
    }, 10000);
});

/**
 * STATS DATA API END POINT AND SEND RESPONSE
 */
app.get('/statsdata', (req, res) => {
    let data = getStatsData();
    res.send(data);
});

/**
 * LISTEN FOR REQUESTS
 */
const httpServer = app.listen(process.env.PORT || port, () => {
    console.log("SyncOption backend started in Port ", port, "process.env.port", process.env.PORT);
});

/**
 * CREATE SOCKET ON SERVER
 */
const io = new Server(httpServer, {cors: { origin: '*' }});

/**
 * GENERATE RANDOM MARKET DATA WITH SOME RANDOM VALUES
 */
const getMarketData = (): any => {
    return [
        {name: 'EURUSD', bid: parseFloat(1.234 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'forex'},
        {name: 'EURJPY', bid: parseFloat(1.334 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'forex'},
        {name: 'USDJPY', bid: parseFloat(1.434 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'forex'},
        {name: 'USDGPB', bid: parseFloat(1.534 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'forex'},
        {name: 'EURGBP', bid: parseFloat(1.634 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'forex'},
        {name: 'Coinbase', bid: parseFloat(1.234 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'stocks'},
        {name: 'Nokia', bid: parseFloat(1.334 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'stocks'},
        {name: 'Black Berry', bid: parseFloat(1.434 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'stocks'},
        {name: 'Game Stop', bid: parseFloat(1.534 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'stocks'},
        {name: 'AMC Entertainment', bid: parseFloat(1.634 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'stocks'},
        {name: 'Bitcoin', bid: parseFloat(1.234 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'crypto'},
        {name: 'Cardano', bid: parseFloat(1.334 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'crypto'},
        {name: 'Dogecoin', bid: parseFloat(1.434 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'crypto'},
        {name: 'Ethereum', bid: parseFloat(1.534 * Math.random()+'').toFixed(5), ask: parseFloat(1.234 * Math.random()+'').toFixed(5), onedaychange:1.234, type: 'crypto'},
    ]
}

/**
 * SEND MARKET DATA THROUGH SOCKET
 */
const sendMarketData = (client: any) => {
    setInterval(() => {
        let data = getMarketData();
        client.emit('marketChange', {data});
    }, 1000);
}

/**
 * CREATE STATS DATA WITH RANDOM VALUES
 */
const getStatsData = (): any => {
    const minimum = 20;
    const maxmimum = 65;
    return {
        date: new Date(),
        cpuUtilization: Math.floor(minimum+Math.random()*maxmimum).toFixed(2)
    }
}

/**
 * SEND STATS DATA THROUGH SOCKETS AFTER 10SECONDS
 */
const sendStatsData = (client: any) => {
    setInterval(() => {
        let data = getStatsData();
        client.emit('statsChange', data);
    }, 10000);
}

/**
 * AFTER CLIENT IS CONNECTED START SENDING MARKET DATA AND STATS DATA
 */
io.on('connection', (client) => {
    sendMarketData(client);
    sendStatsData(client);
});