/**
 * Should be used as sample error response in every route that uses aws dynamodb connection.
 * @param {*} err 
 */

const awsErrorResponse = (err) => {
    const errorResponse = {
        response: {
            type: "query_error",
            request_error: 'Unable to query item. Error JSON: ' + JSON.stringify(err, null, 2)
        }
    }

    return errorResponse;
}

export default awsErrorResponse;