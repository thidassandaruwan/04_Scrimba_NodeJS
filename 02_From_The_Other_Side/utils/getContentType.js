export function getContentType(ext) {
   
   const types = {
     ".js": "text/javascript",
     ".css": "text/css",
     ".json": "application/json",
     ".png": "image/png",
     ".jpg": "image/jpeg",
     ".jpeg": "image/jpeg",
     ".gif": "image/gif",
     ".svg": "image/svg+xml"
   }


  return types[ext.toLowerCase()] || 'text/html'; 
  // if the content type is not definined browsers have a better chance of reading them properly if we send them with content type as text/html
}