export const sendJSONResponse = (res, statusCode, content) => {
    // overriding cors policy
    res.setHeader("Access-Control-Allow-Origin", "*")  // allowing requests from any domain, any port, any protocol
    res.setHeader("Access-Control-Allow-Methods", "GET") // only allowing get requests
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.end(JSON.stringify(content))
}