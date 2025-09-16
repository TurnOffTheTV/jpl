/**
 * @file Functions for converting between JPL and HTML
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

//@ts-check

/**
 * Convert JPL element to HTML element
 * @param {Object} e - JPL JSON element object
 * @returns {string} - HTML element output
 */
function htmEl(e){
	let html = "";
	if(typeof e.class==="string"){
		e.class=[e.class];
	}
	switch(e.type){
		case "paragraph":
			html+=`<p${e.id?" id=\""+e.id+"\"":""}${e.style?" style=\""+e.style+"\"":""}${e.class?" class=\""+e.class.join(" ")+"\"":""}>`
			if(typeof e.content==="string") e.content=[e.content];
			for(let i=0;i<e.content.length;i++){
				if(typeof e.content[i]==="string"){
					html+=e.content[i];
				}else{
					html+=htmEl(e.content[i]);
				}
			}
			html+="</p>";
		break;
		case "link":
			html+=`<a${e.id?" id=\""+e.id+"\"":""}${e.style?" style=\""+e.style+"\"":""}${e.class?" class=\""+e.class.join(" ")+"\"":""} href="${e.href}">`+(e.content?e.content:e.href)+"</a>"
		break;
		case "header":
			html+=`<h${e.level}${e.id?" id=\""+e.id+"\"":""}${e.style?" style=\""+e.style+"\"":""}${e.class?" class=\""+e.class.join(" ")+"\"":""}>`;
			if(typeof e.content==="string") e.content=[e.content];
			for(let i=0;i<e.content.length;i++){
				if(typeof e.content[i]==="string"){
					html+=e.content[i];
				}else{
					html+=htmEl(e.content[i]);
				}
			}
			html+=`</h${e.level}>`;
		break;
		case "list":
			html+=`<${e.list[0]}l${e.id?" id=\""+e.id+"\"":""}${e.style?" style=\""+e.style+"\"":""}${e.class?" class=\""+e.class.join(" ")+"\"":""}>`;

			for(let i=0;i<e.items.length;i++){
				if(e.items[i].type){
					html+="<li>";
					html+=htmEl(e.items[i]);
					html+="</li>";
				}else{
					html+=`<li${e.id?" id=\""+e.id+"\"":""}${e.items[i].style?" style=\""+e.items[i].style+"\"":""}${e.class?" class=\""+e.class.join(" ")+"\"":""}>${e.items[i].content}</li>`;
				}
			}

			html+=`</${e.list[0]}l>`;
		break;
	}
	return html;
}

/**
 * Convert JPL to HTML
 * @param {string|Object} jpl - JPL JSON string or object
 * @returns {string} - HTML output
 */
export function jplToHtml(jpl){
	let jplObject;
	if(typeof jpl==="string"){
		jplObject = JSON.parse(jpl);
	}else{
		jplObject=jpl;
	}

	let html = `<!DOCTYPE html><html><head><title>${jplObject.title}</title>`;

	if(jplObject.styles){
		for(let i=0;i<jplObject.styles.length;i++){
			html+=`<link rel="stylesheet" href="${jplObject.styles[i]}"/>`
		}
	}

	html+="</head><body>"

	for(let i=0;i<jplObject.elements.length;i++){
		html+=htmEl(jplObject.elements[i]);
	}

	if(jplObject.scripts){
		for(let i=0;i<jplObject.scripts.length;i++){
			html+=`<script src="${jplObject.scripts[i]}"></script>`;
		}
	}

	html+="</body></html>";

	return html
}

/**
 * Convert HTML to JPL
 * @param {string} html - HTML string
 * @returns {string} - JPL JSON output
 */
export function htmlToJpl(html){
	let jplObject = {};
	
	return JSON.stringify(jplObject);
}