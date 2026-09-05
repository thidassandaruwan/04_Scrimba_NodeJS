import http, { get } from "node:http"
// import { createServer } from "node:http"; colud directly import just he "createserver()" method as well, but it's easily recognisable when the method is associate with it's module
import {getAllDestinations, getFilteredDestinations, getSearchedDestinations} from "./routes/destinationRoutes.js"
import { sendJSONResponse } from "./utils/sendJSONResponse.js";

const PORT = 8000;
const VALID_SEARCH_PARAMS =["name", "location", "country", "continent", "is_open_to_public"];

const server = http.createServer(async (req, res) => {
    try{
        // gather query parameters from url if any exist
        const urlObj = new URL(req.url, `http://${req.headers.host}`);

        // base url
        if (req.url === "/api" && req.method === "GET"){
            await getAllDestinations(req, res);
            return;
        }

        // get desinations by continent
        if(req.url.startsWith("/api/continent/") && req.method === "GET"){
            await getFilteredDestinations(req, res, "continent");
            return;
        }

        // api/country/<country>' route.
        if (req.url.startsWith("/api/country/") && req.method === "GET"){
            await getFilteredDestinations(req, res, "country");
            return;
        }

        // if url with search parameters
        if (urlObj.pathname === "/api" &&urlObj.search && req.method === "GET"){
            let searchParams = Object.fromEntries(urlObj.searchParams)

            // check for parameter validity
            for (const key of Object.keys(searchParams)){

                // if a search param with bool value is used
                if (["true", "false"].includes(searchParams[key].toLowerCase())){
                    searchParams[key] = JSON.parse(searchParams[key]);
                }
                

                if (!VALID_SEARCH_PARAMS.includes(key)){
                    // if any parameter is invalid
                    return sendJSONResponse(res, 400, {
                        error: "Bad request", 
                        message: `"${key}" is not a valid search parameter.`
                    });
                }
            }

            await getSearchedDestinations(req, res, searchParams);
            return;
        }

        // if URL is invalid
        sendJSONResponse(res, 404, {
            error: "not found", 
            message: "The requested route does not exist"
        });
    }
    catch(error){
        // print error in server teminal 
        console.error(error.message);

        sendJSONResponse(res, 500, {
            error: "Internal Server Error", 
            message: "Something went wrong on our end"
        });
    }
});

server.listen(PORT, () => console.log(`server running on ${PORT} `))