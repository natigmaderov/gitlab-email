const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use('/webhook', webhookRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
