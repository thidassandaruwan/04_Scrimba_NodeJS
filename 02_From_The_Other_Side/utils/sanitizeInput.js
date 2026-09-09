import sanitizeHtml from "sanitize-html";

export function sanitizeInput(newSighting){
    // if new sighting is empty or not an object
    if (!newSighting || typeof newSighting !== "object"){
        return {};
    }

    const sanitized = {};

    // sanitize the values iterating over the keys 
    for (const[key, value] of Object.entries(newSighting)){
        sanitized[key] = (typeof value === "string")
            ? sanitizeHtml(value, {allowedTags: ['b'], allowedAttributes: {}})
            : value
    }

    return sanitized;
}