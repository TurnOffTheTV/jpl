/**
 * @file Demo script for JPL
 * @author TurnOffTheTV <turnoffthetv@turnoffthetv.xyz>
 */

let p = document.createElement("p");
p.innerText="This was created by a script on "+(new Date());
document.body.appendChild(p);

setTimeout(()=>{document.getElementById("editMe").innerText="This was edited by a script to say this!";},2500);