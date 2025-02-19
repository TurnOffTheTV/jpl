/**
 * @file Functions for converting between JPL and Markdown
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

//@ts-check

/**
 * Convert JPL element to Markdown element
 * @param {Object} e - JPL JSON element object
 * @returns {string} - Markdown element output
 */
function mdEl(e){
	let md = "";
	switch(e.type){
		case "paragraph":
			md+=e.content+"\n";
		break;
		case "link":
			if(e.content){
				md+=`[${e.content}](${e.href})\n`;
			}else{
				md+=`<${e.href}>\n`;
			}
		break;
		case "header":
			for(let i=0;i<e.level;i++){
				md+="#";
			}

			md+=` ${e.content}\n`;
		break;
		case "list":
			for(let j=0;j<e.items.length;j++){
				if(e.items[j].type){
					md+="* ";
					md+=mdEl(e.items[j]);
				}else{
					md+=`* ${e.items[j].content}\n`;
				}
			}
		break;
	}
	return md;
}

/**
 * Convert JPL to Markdown
 * @param {string} jpl - JPL JSON string
 * @returns {string} - Markdown output
 */
export function jplToMd(jpl){
	let jplObject = JSON.parse(jpl);
	let md = "";

	for(let i=0;i<jplObject.elements.length;i++){
		md+=mdEl(jplObject.elements[i]);
		if(i!==jplObject.elements.length-1) md+="\n";
	}

	return md;
}

/**
 * Convert Markdown to JPL
 * @param {string} md - Markdown string
 * @returns {string} - JPL JSON output
 */
export function mdToJpl(md){
	let jpl = "";
	
	return jpl;
}