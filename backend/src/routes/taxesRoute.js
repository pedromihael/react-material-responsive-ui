import express from 'express';
import dynamodbDocClient from '../config/awsConfig';
import awsErrorResponse from '../utils/awsRequestErrorSample';

const router = express.Router();

router.all('/custos/:de-:para', (req, res) => {

    const calls_from = req.params.de;
    const calls_to = req.params.para;

    let params = {
        TableName: "overflow_minutes_pricetag",
        ProjectionExpression: "calls_from, calls_to, tax",
        KeyConditionExpression: "calls_from = :from and calls_to = :to",
        ExpressionAttributeValues: {
            ":from": calls_from,
            ":to": calls_to
        }
    };

    dynamodbDocClient.query(params, (err, data) => {
        if (!err) {
            if (data.Items[0] != null) {
                res.send({ response: data.Items[0] });
            } else {
                const request_error = {
                    response: {
                        type: "query_error",
                        request_error: 'Unable to query item. Try another params.'
                    }
                }

                res.send(request_error);                
            }
        } else res.send(awsErrorResponse(err));

    });
    
});

export default router;