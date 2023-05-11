!function(){"use strict";var e=window.wp.richText,t=window.wp.editor,a=window.wp.element,n=window.wp.primitives,o=(0,a.createElement)(n.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,a.createElement)(n.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M18.5 5.5V8H20V5.5H22.5V4H20V1.5H18.5V4H16V5.5H18.5ZM13.9624 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.0391H18.5V18C18.5 18.2761 18.2761 18.5 18 18.5H10L10 10.4917L16.4589 10.5139L16.4641 9.01389L5.5 8.97618V6C5.5 5.72386 5.72386 5.5 6 5.5H13.9624V4ZM5.5 10.4762V18C5.5 18.2761 5.72386 18.5 6 18.5H8.5L8.5 10.4865L5.5 10.4762Z"})),r=window.wp.components,i=window.wp.blockEditor;[{name:"team",title:"Team",character:"."}].forEach((n=>{let{name:l,title:d,character:c,icon:s}=n;const p=`templated/${l}`;(0,e.registerFormatType)(p,{title:d,tagName:l+"-div",className:"trigger-tag-"+l,attributes:{dataTeamId:"data-team-id",dataVenueId:"data-venue-id"},edit:n=>{let{isActive:s,value:m,onChange:u}=n;const[h,v]=(0,a.useState)(!1),[w,g]=(0,a.useState)([]),[b,f]=(0,a.useState)(),E=(0,a.useRef)(null);if(!0===h&&0!==m.activeFormats?.length&&(u((0,e.toggleFormat)(m,{type:p},m.start,m.end)),v(!1)),!0===h&&0===m.activeFormats?.length){var V=new Headers;V.append("X-RapidAPI-Key","784166e8damshc6d584f31ac3909p179b89jsn9d778e3690a7"),V.append("X-RapidAPI-Host","api-football-v1.p.rapidapi.com"),V.append("Content-type","application/json");var y={method:"GET",headers:V,redirect:"follow"};fetch("https://api-football-v1.p.rapidapi.com/v3/teams?search="+m.text.substring(m.start,m.end),y).then((e=>e)).then((e=>e.json())).then((t=>{if(0===t.response.length)return E.current.showModal(),void v(!1);t&&(g(t.response),v(!1),f(t.response[0].team.id),u((0,e.applyFormat)(m,{type:p,attributes:{dataTeamId:t.response?.[0]?.team?.id?.toString(),dataVenueId:t.response?.[0]?.venue?.id?.toString()}})))})).catch((e=>console.log("error",e)))}const H=()=>{v(!h)};return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(t.RichTextShortcut,{type:"primary",character:c,onUse:H}),(0,a.createElement)(t.RichTextToolbarButton,{title:d,onClick:H,icon:o,isActive:s,shortcutType:"primary",shortcutCharacter:c,className:`toolbar-button-with-text toolbar-button__advanced-${l}`}),(0,a.createElement)("dialog",{ref:E},(0,a.createElement)("p",null,"Response is empty"),(0,a.createElement)("form",{method:"dialog",className:"text-center"},(0,a.createElement)("button",null,"OK"))),w?.length>0&&(0,a.createElement)(i.InspectorControls,null,(0,a.createElement)(r.PanelBody,{title:"Team Option",initialOpen:!0},(0,a.createElement)((function(t){const n=t.data.map((e=>({value:e.team.id,label:e.team.name,venueId:e.venue.id})));return(0,a.createElement)(r.SelectControl,{label:"Team",value:b,onChange:t=>{if(t){const a=n.filter((e=>t==e.value));f(t),u((0,e.applyFormat)(m,{type:p,attributes:{dataTeamId:t?.toString(),dataVenueId:a[0]?.venueId?.toString()}}))}},options:n})}),{data:w}))))}})}))}();