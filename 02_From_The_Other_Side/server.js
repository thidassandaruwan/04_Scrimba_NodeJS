import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { handleGet, handleNews, handlePost } from "./handlers/routeHandlers.js";

const PORT = 8000;
const __dirname = import.meta.dirname; // get current dir name

const server = http.createServer( async (req, res) => {
    if (req.url === "/api" && req.method === "GET"){
        return await handleGet(req, res);
    }

    if (req.url === "/api" && req.method === "POST"){
        return await handlePost(req, res);
    }

    if (req.url === "/api/news" && req.method === "GET"){
        return await handleNews(req, res);
    }

    if (!(req.url.startsWith("/api"))){
        return await serveStatic(req, res, __dirname);
    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))