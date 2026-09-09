import path from 'node:path'
import fs from 'node:fs/promises'

const DataFilepath = path.join(import.meta.dirname, "../data", "data.json");

export async function getData() {
    try{
        const jsonString = await fs.readFile(DataFilepath, 'utf8');
        return JSON.parse(jsonString);
    } 
    catch(error){
        console.log(error.message)
        return [];
    }
}