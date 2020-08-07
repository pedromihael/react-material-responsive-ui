import AWS from 'aws-sdk';

AWS.config.region = 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:92fa8b7e-3b48-4c25-896a-c6375cfc1001',
});

const dynamodbDocClient = new AWS.DynamoDB.DocumentClient();

export default dynamodbDocClient;