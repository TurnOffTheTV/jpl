import {readFileSync,writeFileSync} from "node:fs"
import {jplToMd} from "../index.mjs"

writeFileSync("./example.md",jplToMd(readFileSync("../example.json")));