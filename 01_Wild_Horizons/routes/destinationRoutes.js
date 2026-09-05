import { getDataFromDB } from "../database/db.js";
import { sendJSONResponse } from "../utils/sendJSONResponse.js";

export async function getAllDestinations(req, res) {
    const destinations = await getDataFromDB();
    if (!destinations){
        throw new Error("Could not retrieve destinations data");
    }

    sendJSONResponse(res, 200, destinations);
}

export async function getFilteredDestinations(req, res, parameter) {
    const urlValue = req.url.split("/").pop(); // pop() remove last item form array and returns to the caller
    const value = decodeURIComponent(urlValue).toLowerCase()

    const destinations = await getDataFromDB();
    if (!destinations){
        throw new Error("Could not retrieve destinations data");
    }

    const filteredDestinations = destinations.filter(destination => decodeURIComponent(destination[parameter]).toLowerCase() === value );

    sendJSONResponse(res, 200, filteredDestinations);
}

export async function getSearchedDestinations(req, res, searchParams) {
    const destinations = await getDataFromDB();
    if (!destinations){
        throw new Error("Could not retrieve destinations data");
    }

    const searchedDestinations = destinations.filter( destination => {
        // return true if all seach parameter checks are true
        return Object.entries(searchParams).every(([key, value]) => destination[key] === value);
    });

    
    sendJSONResponse(res, 200, searchedDestinations)
}