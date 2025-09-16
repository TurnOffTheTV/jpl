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
			if(typeof e.content==="string") e.content=[e.content];
			for(let i=0;i<e.content.length;i++){
				if(typeof e.content[i]==="string"){
					md+=e.content[i];
				}else{
					md+=mdEl(e.content[i])
				}
			}
		break;
		case "link":
			if(e.content){
				md+=`[${e.content}](${e.href})`;
			}else{
				md+=`<${e.href}>`;
			}
		break;
		case "header":
			for(let i=0;i<e.level;i++){
				md+="#";
			}

			md+=" ";

			if(typeof e.content==="string") e.content=[e.content];
			for(let i=0;i<e.content.length;i++){
				if(typeof e.content[i]==="string"){
					md+=e.content[i];
				}else{
					md+=mdEl(e.content[i])
				}
			}
		break;
		case "list":
			for(let i=0;i<e.items.length;i++){
				if(i!==0) md+="\n";
				if(e.items[i].type){
					md+="* ";
					md+=mdEl(e.items[i]);
				}else{
					md+=`* ${e.items[i].content}`;
				}
			}
		break;
	}
	return md;
}

/**
 * Convert JPL to Markdown
 * @param {string|Object} jpl - JPL JSON string or object
 * @returns {string} - Markdown output
 */
export function jplToMd(jpl){
	let jplObject;
	if(typeof jpl==="string"){
		jplObject = JSON.parse(jpl);
	}else{
		jplObject=jpl;
	}
	let md = "";

	for(let i=0;i<jplObject.elements.length;i++){
		md+=mdEl(jplObject.elements[i]);
		md+="\n";
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