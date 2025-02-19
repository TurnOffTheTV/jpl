import {readFileSync,writeFileSync} from "node:fs"
import {join} from "node:path"
import {jplToHtml} from "../index.mjs"

writeFileSync("./example.html",jplToHtml(readFileSync("../example.json")));