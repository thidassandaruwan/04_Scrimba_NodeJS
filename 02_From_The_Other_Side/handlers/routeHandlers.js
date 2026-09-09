import { sightingEvents } from "../events/sightingEvents.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sendResponse } from "../utils/sendResponse.js";
import { stories } from "../data/stories.js"

export async function handleGet(req, res) {
    try{
        const data = await getData();
        sendResponse(res, 200, "application/json",  JSON.stringify(data));
    }
    catch(error){
        console.log(error.message);
        sendResponse(
            res, 
            500, 
            'application/json', 
            {
                error: "Internal Server Error", 
                message: "Something went wrong on our end"
            }
        );
    }
}

export async function handlePost(req, res) {
    try{
        const body = await parseJSONBody(req);
        const cleanedData = sanitizeInput(body);

        await addNewSighting(cleanedData);
        sendResponse(res, 201, "application/json", JSON.stringify(cleanedData));

        sightingEvents.emit("sighting-added", cleanedData);
    }
    catch(error){
        const isClientError = error instanceof SyntaxError; // Json.parse in preseJsonBody throws syntax error if json is invalid(client error)
        const statusCode = isClientError ? 400 : 500;
        const message = isClientError ? "Invalid JSON Format" : "Internal server error";
        sendResponse(res, statusCode, "application/json", JSON.stringify({error : message}))
        console.log(error)
    }
}

export async function handleNews(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type","text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length)
    res.write(
        `data: ${JSON.stringify({event: "story-updated", story: stories[randomIndex]})}\n\n`
    )
  }, 3000)

}
