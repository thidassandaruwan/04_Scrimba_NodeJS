import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js';

const DataFilepath = path.join(import.meta.dirname, "../data", "data.json");

export async function addNewSighting(newSighting) {
    // get the exising data and append the new data to it
    const existingSightings = await getData();
    existingSightings.push(newSighting)
    // write the all data to the file
    const dataString = JSON.stringify(existingSightings, null, 2)
    await fs.writeFile(DataFilepath, dataString, "utf8")
}