// import express from 'express';
import { server, app } from './config/server';
import dotenv from 'dotenv';
import cors from 'cors';

import homeRoute from './routes/homeRoute';
import taxesRoute from './routes/taxesRoute';
import allTaxesRoute from './routes/allTaxesRoute';

dotenv.config();
app.use(cors());
app.disable('x-powered-by');

const port = process.env.PORT || 3033;

server.listen(port, () => {
    console.info(`Hello from port ${port}`);
});

app.use('/', homeRoute);
app.get('/custos/:de-:para', taxesRoute);
app.get('/custos/todos', allTaxesRoute);