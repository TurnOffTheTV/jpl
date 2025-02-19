import {jplToHtml} from "../jpl-html/index.mjs";
import fs  from "node:fs";
import express from "express";
import http from "node:http"

const app = express();
const server = http.createServer(app);

app.use(express.static("public/"));
app.use(function(req,res){
	if(!req.originalUrl.endsWith("/")){
		req.originalUrl+="/";
	}
	res.set("Content-Type", "text/html");
	try {
		res.send(jplToHtml(fs.readFileSync("pages/"+req.originalUrl+"index.json")));
	} catch(err){
		res.status(404).send(jplToHtml(fs.readFileSync("pages/404.json")));
	}
	
});

server.listen(80);