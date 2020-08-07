import express from 'express';
import dynamodbDocClient from '../config/awsConfig';
import awsErrorResponse from '../utils/awsRequestErrorSample';

const router = express.Router();

router.all('/custos/todos', (req, res) => {

    let params = {
        TableName: "overflow_minutes_pricetag",
        ProjectionExpression: "calls_from, calls_to, tax",
        FilterExpression: "calls_from between :start and :end",
        ExpressionAttributeValues: {
            ":start": "011",
            ":end": "020"
        }
    };

    dynamodbDocClient.scan(params, (err, data) => {
        if (!err) {
            let taxItems = [];

            data.Items.map(item => {
                taxItems.push(item);
            });

            res.send({ response: taxItems });
        } else res.send(awsErrorResponse(err));
    });
    
});

export default router;