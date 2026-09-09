export async function parseJSONBody(req) {
    let body = "";
    for await (const chunk of req) {
        body += chunk;
    }
    // If body is empty or invalid, JSON.parse naturally throws SyntaxError
    return JSON.parse(body);
}
