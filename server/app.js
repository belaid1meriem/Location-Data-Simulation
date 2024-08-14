import express from 'express';
import net  from "net";
import cors from "cors";
const app = express();

app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.post('/api/data-sampling',(req,res)=>{
    const simulationData = req.body;
    console.log(simulationData)
    // Create a TCP client
    const client = net.createConnection({ port: 3000 }, () => {
        console.log('Connected to TCP server');

        // Send data to the TCP server
        client.write(JSON.stringify(simulationData))
    });

    // Handle data received from the TCP server
    client.on('data', (data) => {
        console.log('Received from TCP server:', JSON.parse(data));
        // Close the TCP connection
        client.end();
    });

    // Handle TCP client errors
    client.on('error', (err) => {
        console.error('TCP Client Error:', err);
        res.status(500).send('TCP Client Error: ' + err.message);
    });

    // Handle TCP client disconnection
    client.on('end', () => {
        console.log('Disconnected from TCP server')
    });
    res.json({message: 'Welcome to the Data Simulation API'})
})

app.listen(8080,()=>{
    console.log('listening on port 8080')
})