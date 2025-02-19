import {readFileSync,writeFileSync} from "node:fs"
import {jplToHtml} from "../index.mjs"

writeFileSync("./example.html",jplToHtml(readFileSync("../example.json")));