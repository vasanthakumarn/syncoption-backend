import express from 'express';
import {Server} from 'socket.io';
import cors from 'cors';

const port = 3000;
const app = express();
app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
    res.send('Get Request Working Fine');
});

const httpServer = app.listen(port, () => {
    console.log("SyncOption backend started in Port ", port);
});

const io = new Server(httpServer, {cors: { origin: '*' }});

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

const sendMarketData = (client: any) => {
    setInterval(() => {
        let data = getMarketData();
        client.emit('marketChange', {data});
    }, 1000);
}

const getStatsData = (): any => {
    return {
        date: new Date(),
        cpuUtilization: Math.floor(Math.random()*100).toFixed(2);
    }
}

const sendStatsData = (client: any) => {
    setInterval(() => {
        let data = getStatsData();
        console.log(data);
        client.emit('statsChange', data);
    }, 5000);
}

io.on('connection', (client) => {
    console.log('Client Connected');
    sendMarketData(client);
    sendStatsData(client);
});