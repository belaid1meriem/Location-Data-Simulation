/**************** FOR TESTING ONLY   ****************/
import { createServer } from 'net';

const server = createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log('Received:', JSON.parse(data));
        // socket.write(data);
        socket.end();
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(3000, () => {
    console.log('TCP server listening on port 3000');
});
