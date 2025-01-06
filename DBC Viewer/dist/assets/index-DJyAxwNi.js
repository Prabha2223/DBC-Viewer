(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();var f=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},M={exports:{}};(function(o,t){(function(e,s){s()})(f,function(){function e(n,l){return typeof l>"u"?l={autoBom:!1}:typeof l!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),l={autoBom:!l}),l.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type)?new Blob(["\uFEFF",n],{type:n.type}):n}function s(n,l,u){var i=new XMLHttpRequest;i.open("GET",n),i.responseType="blob",i.onload=function(){d(i.response,l,u)},i.onerror=function(){console.error("could not download file")},i.send()}function a(n){var l=new XMLHttpRequest;l.open("HEAD",n,!1);try{l.send()}catch{}return 200<=l.status&&299>=l.status}function r(n){try{n.dispatchEvent(new MouseEvent("click"))}catch{var l=document.createEvent("MouseEvents");l.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),n.dispatchEvent(l)}}var c=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof f=="object"&&f.global===f?f:void 0,g=c.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),d=c.saveAs||(typeof window!="object"||window!==c?function(){}:"download"in HTMLAnchorElement.prototype&&!g?function(n,l,u){var i=c.URL||c.webkitURL,h=document.createElement("a");l=l||n.name||"download",h.download=l,h.rel="noopener",typeof n=="string"?(h.href=n,h.origin===location.origin?r(h):a(h.href)?s(n,l,u):r(h,h.target="_blank")):(h.href=i.createObjectURL(n),setTimeout(function(){i.revokeObjectURL(h.href)},4e4),setTimeout(function(){r(h)},0))}:"msSaveOrOpenBlob"in navigator?function(n,l,u){if(l=l||n.name||"download",typeof n!="string")navigator.msSaveOrOpenBlob(e(n,u),l);else if(a(n))s(n,l,u);else{var i=document.createElement("a");i.href=n,i.target="_blank",setTimeout(function(){r(i)})}}:function(n,l,u,i){if(i=i||open("","_blank"),i&&(i.document.title=i.document.body.innerText="downloading..."),typeof n=="string")return s(n,l,u);var h=n.type==="application/octet-stream",y=/constructor/i.test(c.HTMLElement)||c.safari,m=/CriOS\/[\d]+/.test(navigator.userAgent);if((m||h&&y||g)&&typeof FileReader<"u"){var w=new FileReader;w.onloadend=function(){var p=w.result;p=m?p:p.replace(/^data:[^;]*;/,"data:attachment/file;"),i?i.location.href=p:location=p,i=null},w.readAsDataURL(n)}else{var v=c.URL||c.webkitURL,S=v.createObjectURL(n);i?i.location=S:location.href=S,i=null,setTimeout(function(){v.revokeObjectURL(S)},4e4)}});c.saveAs=d.saveAs=d,o.exports=d})})(M);var x=M.exports;class D{constructor({onNew:t,onOpen:e,onSave:s,onUndo:a,onRedo:r,onClear:c,onThemeToggle:g}){this.callbacks={onNew:t,onOpen:e,onSave:s,onUndo:a,onRedo:r,onClear:c,onThemeToggle:g},this.container=document.getElementById("toolbar"),this.render(),this.setupHandlers()}render(){const t=document.createElement("div");t.className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700",t.innerHTML=`
      <button id="newBtn" class="toolbar-btn">
        <i class="fas fa-file"></i> New
      </button>
      <label for="fileInput" class="toolbar-btn cursor-pointer">
        <i class="fas fa-folder-open"></i> Open
      </label>
      <button id="saveBtn" class="toolbar-btn">
        <i class="fas fa-save"></i> Save
      </button>
      <div class="h-4 border-r border-gray-300 dark:border-gray-700 mx-2"></div>
      <button id="undoBtn" class="toolbar-btn">
        <i class="fas fa-undo"></i> Undo
      </button>
      <button id="redoBtn" class="toolbar-btn">
        <i class="fas fa-redo"></i> Redo
      </button>
      <button id="clearBtn" class="toolbar-btn">
        <i class="fas fa-trash"></i> Clear
      </button>
      <div class="flex-1"></div>
      <button id="themeBtn" class="toolbar-btn">
        <i class="fas fa-moon"></i>
      </button>
      <input type="file" id="fileInput" accept=".dbc" class="hidden">
    `,this.container.innerHTML="",this.container.appendChild(t)}setupHandlers(){const t=document.getElementById("fileInput");document.getElementById("newBtn").onclick=()=>{var e,s;return(s=(e=this.callbacks).onNew)==null?void 0:s.call(e)},t.onchange=e=>{var a,r,c;const s=(a=e.target.files)==null?void 0:a[0];s&&((c=(r=this.callbacks).onOpen)==null||c.call(r,s),t.value="")},document.getElementById("saveBtn").onclick=()=>{var e,s;return(s=(e=this.callbacks).onSave)==null?void 0:s.call(e)},document.getElementById("undoBtn").onclick=()=>{var e,s;return(s=(e=this.callbacks).onUndo)==null?void 0:s.call(e)},document.getElementById("redoBtn").onclick=()=>{var e,s;return(s=(e=this.callbacks).onRedo)==null?void 0:s.call(e)},document.getElementById("clearBtn").onclick=()=>{var e,s;return(s=(e=this.callbacks).onClear)==null?void 0:s.call(e)},document.getElementById("themeBtn").onclick=()=>{var e,s;return(s=(e=this.callbacks).onThemeToggle)==null?void 0:s.call(e)}}}class k{constructor(t){this.container=t,this.messages=[],this.selectedRow=null,this.onRowSelect=null}setMessages(t){console.log("MessageTable - Setting messages:",t),this.messages=Array.isArray(t)?t:[],this.selectedRow=null,this.render()}selectMessage(t){if(!t)return;const e=this.messages.findIndex(s=>s.idDecimal===t.idDecimal);e!==-1&&e!==this.selectedRow&&(this.selectedRow=e,this.render())}render(){const t=document.createElement("table");t.className="w-full text-sm border-collapse",t.innerHTML=`
      <thead class="bg-gray-100 dark:bg-gray-800 sticky top-0">
        <tr>
          <th class="table-header">#</th>
          <th class="table-header">Name</th>
          <th class="table-header">ID Decimal</th>
          <th class="table-header">ID HEX</th>
          <th class="table-header">PGN Decimal</th>
          <th class="table-header">PGN HEX</th>
          <th class="table-header">Frame Format</th>
          <th class="table-header">DLC</th>
          <th class="table-header">TX Node</th>
          <th class="table-header">Signals</th>
        </tr>
      </thead>
      <tbody>
        ${this.messages.map((e,s)=>`
          <tr class="table-row ${this.selectedRow===s?"bg-blue-100 dark:bg-blue-900":""}"
              data-index="${s}">
            <td class="table-cell">${s+1}</td>
            <td class="table-cell">${e.name||""}</td>
            <td class="table-cell">${e.idDecimal||""}</td>
            <td class="table-cell">${e.idHex||""}</td>
            <td class="table-cell">${e.pgnDecimal||""}</td>
            <td class="table-cell">${e.pgnHex||""}</td>
            <td class="table-cell">${e.frameFormat||""}</td>
            <td class="table-cell">${e.dlc||""}</td>
            <td class="table-cell">${e.txNode||""}</td>
            <td class="table-cell">${(e.signals||[]).length}</td>
          </tr>
        `).join("")}
      </tbody>
    `,this.container.innerHTML="",this.container.appendChild(t),t.querySelectorAll("tbody tr").forEach(e=>{e.addEventListener("click",()=>{const s=parseInt(e.dataset.index),a=this.messages[s];a&&this.onRowSelect&&s!==this.selectedRow&&(console.log("MessageTable - Selected message:",a),this.onRowSelect(a))})})}}class I{constructor(t){this.container=t,this.signals=[]}setSignals(t){this.signals=Array.isArray(t)?t:[],this.render()}formatValue(t){return t==null?"":t.toString()}formatValues(t){return!Array.isArray(t)||t.length===0?"":t.sort((e,s)=>e.value-s.value).map(e=>`${e.value}=${e.description}`).join(" | ")}render(){const t=document.createElement("table");t.className="min-w-full border-collapse",t.innerHTML=`
      <thead class="bg-gray-900 text-white sticky top-0">
        <tr>
          <th class="signal-header">#</th>
          <th class="signal-header">Name</th>
          <th class="signal-header">Start Bit</th>
          <th class="signal-header">Length</th>
          <th class="signal-header">Byte Order</th>
          <th class="signal-header">Type</th>
          <th class="signal-header">Factor</th>
          <th class="signal-header">Offset</th>
          <th class="signal-header">Min</th>
          <th class="signal-header">Max</th>
          <th class="signal-header">Unit</th>
          <th class="signal-header text-blue-400">Values</th>
        </tr>
      </thead>
      <tbody class="bg-gray-900 text-gray-300">
        ${this.signals.map((e,s)=>`
          <tr class="signal-row">
            <td class="signal-cell text-center">${s+1}</td>
            <td class="signal-cell">${this.formatValue(e.name)}</td>
            <td class="signal-cell text-right">${this.formatValue(e.startBit)}</td>
            <td class="signal-cell text-right">${this.formatValue(e.length)}</td>
            <td class="signal-cell">${this.formatValue(e.byteOrder)}</td>
            <td class="signal-cell">${this.formatValue(e.type)}</td>
            <td class="signal-cell text-right">${this.formatValue(e.factor)}</td>
            <td class="signal-cell text-right">${this.formatValue(e.offset)}</td>
            <td class="signal-cell text-right">${this.formatValue(e.minimum)}</td>
            <td class="signal-cell text-right">${this.formatValue(e.maximum)}</td>
            <td class="signal-cell">${this.formatValue(e.unit)}</td>
            <td class="signal-cell values-cell" style="white-space: normal; line-height: 1.4;">
              ${this.formatValues(e.values)}
            </td>
          </tr>
        `).join("")}
      </tbody>
    `,this.container.innerHTML="",this.container.appendChild(t)}}class T{constructor(t,e){this.container=t,this.onMessageSelect=e,this.messages=[],this.selectedIndex=null}setMessages(t){this.messages=Array.isArray(t)?[...t]:[],this.selectedIndex=null,this.render()}selectMessage(t){if(!t)return;const e=this.messages.findIndex(s=>s.idDecimal===t.idDecimal);e!==-1&&(this.selectedIndex=e,this.render())}render(){const t=document.createElement("div");t.className="bg-gray-100 w-64 h-full overflow-y-auto",t.innerHTML=`
      <div class="p-2 font-bold border-b border-gray-300">Messages</div>
      ${this.messages.map((e,s)=>`
        <div class="p-2 hover:bg-blue-50 cursor-pointer ${this.selectedIndex===s?"bg-blue-100":""}" 
             data-index="${s}">
          ${e.name} (${e.idHex})
        </div>
      `).join("")}
    `,this.container.innerHTML="",this.container.appendChild(t),t.querySelectorAll("div[data-index]").forEach(e=>{e.addEventListener("click",()=>{const s=parseInt(e.dataset.index);this.messages[s]&&(this.selectedIndex=s,this.onMessageSelect&&this.onMessageSelect(this.messages[s]),this.render())})})}}function B(o){const t=new Map,e=/BO_ (\d+) (\w+) *: (\d+) (\w+)/g;let s;for(;(s=e.exec(o))!==null;)try{const a=parseInt(s[1]);if(isNaN(a)){console.warn(`Invalid message ID: ${s[1]}`);continue}t.set(a,{idDecimal:a,idHex:a.toString(16).toUpperCase().padStart(8,"0"),name:s[2]||"Unnamed",dlc:parseInt(s[3])||0,txNode:s[4]||"",frameFormat:a>2047?"Extended":"Standard",pgnDecimal:E(a),pgnHex:E(a).toString(16).toUpperCase().padStart(2,"0"),signals:[],comment:"",attributes:""})}catch(a){console.warn(`Failed to parse message: ${s[0]}`,a)}return t}function E(o){return o>2047?o>>8&131071:o}function N(o,t){let e=null;const s=o.split(`
`);for(let a=0;a<s.length;a++){const r=s[a].trim(),c=r.match(/^BO_ (\d+)/);if(c){e=parseInt(c[1]);continue}if(r.startsWith("SG_")&&e!==null){const g=r.match(/SG_ (\w+) *: *(\d+)\|(\d+)@([0-1])([+-]) \(([^,]*),([^)]*)\) \[([^|]*)\|([^]]*)\] "([^"]*)"/);if(g){const d=t.get(e);if(d){const n=F(g);d.signals.push(n),console.log(`Added signal ${n.name} to message ${d.name}:`,n)}}}}}function F(o){return{name:o[1],startBit:parseInt(o[2]),length:parseInt(o[3]),byteOrder:o[4]==="0"?"Intel":"Motorola",type:o[5]==="+"?"Unsigned":"Signed",factor:parseFloat(o[6])||1,offset:parseFloat(o[7])||0,minimum:parseFloat(o[8])||0,maximum:parseFloat(o[9])||0,unit:o[10],mode:"Signal",values:[],comment:""}}function U(o,t){const e=o.split(`
`);for(const s of e){const a=s.match(/VAL_ (\d+) (\w+)\s+(.*);/);if(a){const r=parseInt(a[1]),c=a[2],g=a[3],d=t.get(r);if(d){const n=d.signals.find(l=>l.name===c);n&&(n.values=A(g),console.log(`Parsed values for signal ${c}:`,n.values))}}}}function A(o){const t=[],e=/(\d+)\s+"([^"]*)"/g;let s;for(;(s=e.exec(o))!==null;)t.push({value:parseInt(s[1]),description:s[2].trim()});return t}class C{constructor(){this.data=null}async parse(t){if(!t)throw new Error("No file provided");if(!t.name.endsWith(".dbc"))throw new Error("Invalid file type. Please select a .dbc file");try{const e=await this.readFile(t);if(!e.trim())throw new Error("File is empty");const s=B(e);if(s.size===0)throw new Error("No valid messages found in the file");N(e,s),U(e,s);const a=Array.from(s.values());return console.log("Parsed messages:",a),{messages:a,signals:[]}}catch(e){throw console.error("Error parsing DBC file:",e.message),new Error(`Failed to parse DBC file: ${e.message}`)}}async readFile(t){return new Promise((e,s)=>{const a=new FileReader;a.onload=r=>e(r.target.result),a.onerror=()=>s(new Error("Failed to read file")),a.readAsText(t)})}}const b=[{name:"NAME",type:"C",size:30},{name:"ID_DEC",type:"N",size:10,decimals:0},{name:"ID_HEX",type:"C",size:8},{name:"PGN_DEC",type:"N",size:10,decimals:0},{name:"PGN_HEX",type:"C",size:8},{name:"FRAME_FMT",type:"C",size:10},{name:"DLC",type:"N",size:2,decimals:0},{name:"TX_NODE",type:"C",size:20},{name:"COMMENT",type:"C",size:254}];function $(o){const a=32+32*b.length+1,r=1+b.reduce((u,i)=>u+i.size,0),c=a+r*o.length+1,g=new ArrayBuffer(c),d=new DataView(g);let n=0;d.setUint8(n++,3);const l=new Date;return d.setUint8(n++,l.getFullYear()-1900),d.setUint8(n++,l.getMonth()+1),d.setUint8(n++,l.getDate()),d.setUint32(n,o.length,!0),n+=4,d.setUint16(n,a,!0),n+=2,d.setUint16(n,r,!0),n+=2,n+=20,b.forEach(u=>{const i=new TextEncoder().encode(u.name.padEnd(10,"\0"));for(let h=0;h<11;h++)d.setUint8(n++,h<i.length?i[h]:0);d.setUint8(n++,u.type.charCodeAt(0)),n+=4,d.setUint8(n++,u.size),d.setUint8(n++,u.decimals||0),n+=14}),d.setUint8(n++,13),o.forEach(u=>{d.setUint8(n++,32),b.forEach(i=>{const h=String(u[i.name]||"").padEnd(i.size," "),y=new TextEncoder().encode(h.slice(0,i.size));for(let m=0;m<i.size;m++)d.setUint8(n++,m<y.length?y[m]:32)})}),d.setUint8(n,26),g}function L(o){var t;return(t=o==null?void 0:o.messages)!=null&&t.length?o.messages.map(e=>{const s={};return b.forEach(a=>{switch(a.name){case"NAME":s[a.name]=String(e.name||"").slice(0,a.size);break;case"ID_DEC":s[a.name]=Number(e.idDecimal||0);break;case"ID_HEX":s[a.name]=String(e.idHex||"").slice(0,a.size);break;case"PGN_DEC":s[a.name]=Number(e.pgnDecimal||0);break;case"PGN_HEX":s[a.name]=String(e.pgnHex||"").slice(0,a.size);break;case"FRAME_FMT":s[a.name]=String(e.frameFormat||"").slice(0,a.size);break;case"DLC":s[a.name]=Number(e.dlc||0);break;case"TX_NODE":s[a.name]=String(e.txNode||"").slice(0,a.size);break;case"COMMENT":s[a.name]=String(e.comment||"").slice(0,a.size);break}}),s}):[]}class O{convertToDBF(t){try{const e=L(t);if(e.length===0)throw new Error("No data to convert");const s=$(e),a=new Blob([s],{type:"application/x-dbf"});x.saveAs(a,"converted.dbf")}catch(e){throw console.error("Error converting to DBF:",e),e}}}class R{constructor(){this.isDarkMode=localStorage.getItem("darkMode")==="true",this.init()}init(){this.isDarkMode&&document.documentElement.classList.add("dark")}toggleDarkMode(){this.isDarkMode=!this.isDarkMode,localStorage.setItem("darkMode",this.isDarkMode),document.documentElement.classList.toggle("dark")}}function H(o,t){const e=new R,s=new C,a=new O,r={toolbar:new D({onNew:()=>t.handleNew(),onOpen:c=>t.handleOpen(c),onSave:()=>t.handleSave(),onUndo:()=>t.handleUndo(),onRedo:()=>t.handleRedo(),onClear:()=>t.handleNew(),onThemeToggle:()=>e.toggleDarkMode()}),messageTable:new k(document.getElementById("message-table")),signalTable:new I(document.getElementById("signal-table")),sidebar:new T(document.getElementById("sidebar"),c=>t.handleMessageSelect(c)),dbcParser:s,dbfConverter:a,themeManager:e};r.messageTable.onRowSelect=c=>t.handleMessageSelect(c),o.setComponents(r)}class z{constructor(){this.currentData={messages:[],signals:[]},this.undoStack=[],this.redoStack=[],this.selectedMessage=null,this.components={}}setComponents(t){this.components=t}pushToUndoStack(){this.currentData&&(this.undoStack.push(JSON.parse(JSON.stringify(this.currentData))),this.undoStack.length>50&&this.undoStack.shift())}}class _{constructor(t){this.state=t}async handleOpen(t){try{const e=document.getElementById("status-bar");e.textContent="Loading file...";const s=await this.state.components.dbcParser.parse(t);console.log("App - Parsed file data:",s),this.state.pushToUndoStack(),this.state.currentData=s,this.state.selectedMessage=null,this.state.redoStack=[],this.updateUI(),e.textContent=`Loaded ${t.name}`}catch(e){console.error("Error processing file:",e),document.getElementById("status-bar").textContent=`Error: ${e.message}`}}handleMessageSelect(t){if(!t)return;console.log("App - Handling message selection:",t);const e=this.state.currentData.messages.find(s=>s.idDecimal===t.idDecimal);e&&(this.state.selectedMessage=e,Array.isArray(e.signals)?(console.log("App - Setting signals for selected message:",e.signals),this.state.components.signalTable.setSignals(e.signals),this.state.components.messageTable.selectMessage(e),this.state.components.sidebar.selectMessage(e)):(console.warn("Selected message has no signals array:",e),this.state.components.signalTable.setSignals([])))}handleNew(){this.state.pushToUndoStack(),this.state.currentData={messages:[],signals:[]},this.state.selectedMessage=null,this.state.redoStack=[],this.updateUI(),document.getElementById("status-bar").textContent="New file created"}handleSave(){var t,e;try{if(!((e=(t=this.state.currentData)==null?void 0:t.messages)!=null&&e.length))throw new Error("No data to save");this.state.components.dbfConverter.convertToDBF(this.state.currentData),document.getElementById("status-bar").textContent="File saved successfully"}catch(s){console.error("Error saving file:",s),document.getElementById("status-bar").textContent=`Error: ${s.message}`}}handleUndo(){this.state.undoStack.length>0&&(this.state.redoStack.push(JSON.parse(JSON.stringify(this.state.currentData))),this.state.currentData=this.state.undoStack.pop(),this.state.selectedMessage=null,this.updateUI(),document.getElementById("status-bar").textContent="Undo successful")}handleRedo(){this.state.redoStack.length>0&&(this.state.pushToUndoStack(),this.state.currentData=this.state.redoStack.pop(),this.state.selectedMessage=null,this.updateUI(),document.getElementById("status-bar").textContent="Redo successful")}updateUI(){if(console.log("App - Updating UI with data:",this.state.currentData),this.state.components.messageTable.setMessages(this.state.currentData.messages),this.state.components.sidebar.setMessages(this.state.currentData.messages),this.state.selectedMessage){const t=this.state.currentData.messages.find(e=>e.idDecimal===this.state.selectedMessage.idDecimal);t?(console.log("App - Selected message signals:",t.signals),this.state.components.signalTable.setSignals(t.signals||[]),this.state.components.messageTable.selectMessage(t),this.state.components.sidebar.selectMessage(t)):(this.state.components.signalTable.setSignals([]),this.state.selectedMessage=null)}else this.state.components.signalTable.setSignals([])}}class P{constructor(){this.state=new z,this.handlers=new _(this.state),H(this.state,this.handlers)}}new P;
