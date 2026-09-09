import path from "node:path";
import fs from 'node:fs/promises'
import { getContentType } from "./getContentType.js";
import { sendResponse } from "./sendResponse.js";

export async function serveStatic(req, res, baseDIR){
   const publicDir = path.join(baseDIR, "public")
   const resourcePath = path.join(publicDir, 
      req.url === "/"? "index.html" : req.url
   );
   const resourceExtension = path.extname(resourcePath);
   const contentType = getContentType(resourceExtension);

   try{
      const content = await fs.readFile(resourcePath);
      if(content.length === 0){
         throw new Error(`Error reading file at ${resourcePath}`);
      }

      sendResponse(res, 200, contentType, content)
   }
   catch(error){
      if (error.code === "ENOENT")
      {
         const errorHTML = await fs.readFile(path.join(publicDir, "404.html"));
         sendResponse(res, 404, 'text/html', errorHTML)
      }
      else{
         console.log(error.message)
         sendResponse(
            res, 
            500, 
            'text/html', 
            '<html><h1>Somethign went wrong when returning data.</h1></html>'
         );
      }
   }
   
}
