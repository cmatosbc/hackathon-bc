!function(){"use strict";var e=window.wp.richText,t=window.wp.editor,a=window.wp.element,n=window.wp.primitives,o=(0,a.createElement)(n.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,a.createElement)(n.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M18.5 5.5V8H20V5.5H22.5V4H20V1.5H18.5V4H16V5.5H18.5ZM13.9624 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.0391H18.5V18C18.5 18.2761 18.2761 18.5 18 18.5H10L10 10.4917L16.4589 10.5139L16.4641 9.01389L5.5 8.97618V6C5.5 5.72386 5.72386 5.5 6 5.5H13.9624V4ZM5.5 10.4762V18C5.5 18.2761 5.72386 18.5 6 18.5H8.5L8.5 10.4865L5.5 10.4762Z"})),r=window.wp.components,l=window.wp.blockEditor;const i=e=>{const{dialog:t}=e;return(0,a.createElement)("dialog",{ref:t},(0,a.createElement)("p",null,"Response is empty"),(0,a.createElement)("form",{method:"dialog",className:"text-center"},(0,a.createElement)("button",null,"OK")))};[{name:"team",title:"Team",character:"."}].forEach((n=>{let{name:c,title:d,character:m,icon:s}=n;const p=`templated/${c}`;(0,e.registerFormatType)(p,{title:d,tagName:c,className:"trigger-tag-"+c,attributes:{dataTeamId:"data-team-id",dataVenueId:"data-venue-id"},edit:n=>{let{isActive:s,value:u,onChange:h}=n;const[g,v]=(0,a.useState)(!1),[w,E]=(0,a.useState)([]),[I,f]=(0,a.useState)(),b=(0,a.useRef)(null),V=(t,a)=>{h((0,e.applyFormat)(u,{type:p,attributes:{dataTeamId:t,dataVenueId:a}}))};g&&0!==u.activeFormats?.length&&(h((0,e.toggleFormat)(u,{type:p})),v(!1)),g&&0===u.activeFormats?.length&&async function(e){let t=[];var a=new Headers;a.append("X-RapidAPI-Key","784166e8damshc6d584f31ac3909p179b89jsn9d778e3690a7"),a.append("X-RapidAPI-Host","api-football-v1.p.rapidapi.com"),a.append("Content-type","application/json");var n={method:"GET",headers:a,redirect:"follow"};return await fetch("https://api-football-v1.p.rapidapi.com/v3/teams?search="+e,n).then((e=>e.json())).then((e=>{({...e}).response.forEach(((e,a)=>{t.push({teamName:e.team.name,teamCode:e.team.code,teamId:e.team.id,venueId:e.venue.id})})),console.log(t)})).catch((e=>console.log("error",e))),t}(u.text.substring(u.start,u.end)).then((e=>{if(console.log(e),0===e.length)return b.current.showModal(),void v(!1);e?.length>0&&(E(e),v(!1),f(e[0].teamId),V(e?.[0]?.teamId?.toString(),e?.[0]?.venueId?.toString()))}));const C=()=>{v(!g)};return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(t.RichTextShortcut,{type:"primary",character:m,onUse:C}),(0,a.createElement)(t.RichTextToolbarButton,{title:d,onClick:C,icon:o,isActive:s,shortcutType:"primary",shortcutCharacter:m,className:`toolbar-button-with-text toolbar-button__advanced-${c}`}),(0,a.createElement)(i,{dialog:b}),w?.length>0&&(0,a.createElement)(l.InspectorControls,null,(0,a.createElement)(r.PanelBody,{title:"Team Option",initialOpen:!0},(0,a.createElement)((e=>{const t=e.data.map((e=>({value:e.teamId,label:e.teamName,venueId:e.venueId})));return(0,a.createElement)(r.SelectControl,{label:"Team",value:I,onChange:e=>((e,t)=>{if(e){const a=t.filter((t=>e==t.value));f(e),V(e?.toString(),a[0]?.venueId?a[0]?.venueId?.toString():"0")}})(e,t),options:t})}),{data:w}))))}})}))}();