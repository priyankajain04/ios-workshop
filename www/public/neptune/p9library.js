﻿function _convertFlatToNested(e,t,n){for(var r,o,a,c=[],i={},l=0,u=e.length;l<u;l++)o=(r=e[l])[t],a=r[n]||0,i[o]=i[o]||[],r.children=i[o],0!==a?(i[a]=i[a]||[],i[a].push(r)):c.push(r);return c}function _convertNestedToFlat(e){var n=[],r=function(e){$.each(e,function(e,t){t.children&&(r(t.children),delete t.children),n.push(t)})};return r(JSON.parse(JSON.stringify(e.children))),n}var ModelData=function(){function l(e,t,n,r,o){var a=e;y(e)&&(a=e.source,t=e.keys,n=e.values,r=e.operators,o=e.fnCallback,e.fnCallback=null);var c=v(a,t,n,r),i=!1;return 0<c.length&&(i=c[0]),i&&"function"==typeof o&&o(i),i}function r(e){return 0<e.search("/")}function o(e){return e.split("/")}function a(e){return e.join("/")}function s(e,t,n,r){return function(t,n,r){if(Array.isArray(t)&&"object"==typeof n&&0<Object.keys(n).length){var o=!1;return Object.keys(n).forEach(function(e){o=o||0<ModelData.Find(t,e,n[e],r).length}),o}if(Array.isArray(t)){o=!1;return t.forEach(function(e){o=o||c(e,n,r)}),o}if("object"==typeof t&&"object"==typeof n&&0<Object.keys(n).length){o=!0;return Object.keys(n).forEach(function(e){o=o&&c(t[e],n[e],r)}),o}return c(t,n,r)}(u(e,t),n,r)}function d(r,e,o,a){var c=!0;return e.forEach(function(e,t,n){c=c&&s(r,e,o[t],a[t])}),c}var e={version:"5.0.0",lastChanged:"2018-12-07",authors:"Neptune Software, Max Schaufler"},c=function(e,t,n){var r=!1;switch(n){case"Contains":r=-1!=e.indexOf(t);break;case"NE":r=e!=t;break;case"GT":r=t<e;break;case"GE":r=t<=e;break;case"LT":r=e<t;break;case"LE":r=e<=t;break;case"BT":Array.isArray(t)&&2==t.length&&(r=e>=t[0]&&e<=t[1]);break;case"StartsWith":r=t.toString().length<=e.toString().length&&t.toString()==e.toString().substr(0,t.toString().length);break;case"EndsWith":r=t.toString().length<=e.toString().length&&t.toString()==e.toString().substr(e.toString().length-t.toString().length,t.toString().length);break;default:r=e==t}return r},u=function(e,t){return r(t)?(pathArray=o(t),firstPart=pathArray.shift(),"object"==typeof e[firstPart]?u(e[firstPart],a(pathArray)):e[firstPart]):e[t]},p=function(e,t,n){r(t)?(pathArray=o(t),firstPart=pathArray.shift(),"object"==typeof e[firstPart]?p(e[firstPart],a(pathArray),n):e[firstPart]=n):e[t]=n},f=function(e){var t=e.getModel();return t&&void 0!==t.oData&&void 0===t.oData.length&&(t.oData=[]),t&&void 0===t.oData&&(t.oData=[]),t};function h(e){var t="array",n="control",r="model",o=[],a=null,c=null,i="";if(Array.isArray(e))i=t,o=e;else{if("function"!=typeof e.getMetadata)throw"ModelData: bad source / "+e;"sap.ui.model.json.JSONModel"==e.getMetadata()._sClassName?(i=r,c=e):(i=n,a=e)}return{getArray:function(){switch(i){case r:return c.getData();case n:return f(a).getData();case t:return o}throw"ModelData: bad type for source / "+this},updateData:function(e){switch(i){case r:c.setData(e);break;case n:a.getModel().setData(e)}}}}function g(e){return Array.isArray(e)||(e=void 0===e?[]:[e]),e}function S(e,t){var n="EQ";Array.isArray(e)||(n=e,e=[]);for(var r=e.length;r<t;r++)e[r]=n;return e}var y=function(e){var t=!1;return"object"==typeof e&&"function"!=typeof e.getMetadata&&void 0!==e.source&&(t=!0),t},v=function(e,t,n,r,o){var a=e;y(e)&&(a=e.source,t=e.keys,n=e.values,r=e.operators,o=e.fnCallback);var c=new h(a).getArray(),i=[];return Array.isArray(c)&&0!=c.length?(t=g(t),n=g(n),r=S(r,t.length),t.length!=n.length||t.length!=r.length||(i=0===t.length?c:c.filter(function(e){return d(e,t,n,r)}),"function"==typeof o&&o(i),c=null),i):i};return{Find:v,FindFirst:l,LookupValue:function(e,t,n,r,o,a){var c=e;y(e)&&(c=e.source,t=e.keys,n=e.values,r=e.lookupField,o=e.operators,a=e.fnCallback);var i=l(c,t,n,o,a);return i?u(i,r):n},FindDB:function(e,t,n,r,a){var c,i,o;void 0!==AppSync.db?(c=f(e),i=[],o=[],"string"==typeof r?o[0]=r:o=r,AppSync.db.transaction(function(e){e.executeSql("SELECT * FROM "+t+" WHERE "+n,o,function(e,t){for(var n=0;n<t.rows.length;n++){var r=t.rows.item(n);for(var o in r)"false"===r[o]&&(r[o]=!1),"true"===r[o]&&(r[o]=!0);i.push(r)}c.setData(i),"function"==typeof a&&a()},null)},function(e){"0"!==e.code&&(console.log(e.message),a())})):"function"==typeof a&&a()},Add:function(e,t){var n=e;y(e)&&(n=e.source,t=e.data);var r=new h(n),o=r.getArray();o.push(t),r.updateData(o)},AddArray:function(e,t){var n=e;y(e)&&(n=e.source,t=e.data);for(var r=new h(n),o=r.getArray(),a=0;a<t.length;a++)o.push(t[a]);r.updateData(o)},Update:function(e,t,n,r,o){var a=e;y(e)&&(a=e.source,t=e.keys,n=e.values,r=e.data,o=e.operators,callBack=e.fnCallback);var c=new h(a),i=c.getArray(),l=!1;if(t=g(t),n=g(n),o=S(o,t.length),t.length==n.length&&t.length==o.length){var u=[];if(0<t.length)for(var s=i.length;s--;)d(i[s],t,n,o)&&(i[s]=r,l=!0,u.push(i[s]));!0!==l&&i.push(r),c.updateData(i),"function"==typeof callBack&&callBack(u)}},UpdateArray:function(e,t,n,r){var o=e;y(e)&&(o=e.source,t=e.keys,n=e.data,r=e.operators,callBack=e.fnCallback);var a,c=new h(o),l=c.getArray(),u=!1;t=g(t),r=S(r,t.length),t.length==r.length&&(a=[],n.forEach(function(e){if(u=!1,0<t.length)for(i=0;i<l.length;i++)!function(r,e,o,a){var c=!0;return e.forEach(function(e,t,n){c=c&&s(r,e,o[e],a[t])}),c}(l[i],t,e,r)||(l[i]=e,u=!0,a.push(l[i]));!1===u&&l.push(e)}),c.updateData(l),"function"==typeof callBack&&callBack(a))},UpdateField:function(e,t,n,r,o,a){var c=e;y(e)&&(c=e.source,t=e.keys,n=e.values,r=e.updateKeys,o=e.updateValues,a=e.operators,callBack=e.fnCallback);var i=new h(c),l=i.getArray();if(void 0!==r&&(t=g(t),n=g(n),r=g(r),o=g(o),a=S(a,t.length),t.length==n.length&&t.length==a.length&&r.length==o.length)){for(var u=[],s=l.length;s--;)d(l[s],t,n,a)&&(r.forEach(function(e,t,n){p(l[s],e,o[t])}),u.push(l[s]));i.updateData(l),"function"==typeof callBack&&callBack(u)}},Delete:function(e,t,n,r){var o=e;y(e)&&(o=e.source,t=e.keys,n=e.values,r=e.operators,callBack=e.fnCallback);var a=new h(o),c=a.getArray();if(Array.isArray(c)&&0!=c.length&&(t=g(t),n=g(n),r=S(r,t.length),t.length==n.length&&t.length==r.length)){var i=[];if(0===t.length)c=[];else for(var l,u=c.length;u--;){d(c[u],t,n,r)&&(l=c.splice(u,1),i.push(l[0]))}a.updateData(c),"function"==typeof callBack&&callBack(i)}},getModel:f,genID:function(){var n=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=(n+16*Math.random())%16|0;return n=Math.floor(n/16),("x"==e?t:7&t|8).toString(16)})},versioninfo:e,version:e.version}}(),AppStorage={deviceID:"",useFallback:!1,Startup:function(){AppStorage.deviceID=localStorage.getItem("AppCacheID"),AppStorage.deviceID||(AppStorage.deviceID=ModelData.genID(),localStorage.setItem("AppCacheID",AppStorage.deviceID))}},p9Database=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB,p9Views=p9Database.open("p9View",1);p9Views.isOpen=!1;var p9Models=p9Database.open("p9Model",1);function _AppCache_GetCache(e,t,n,r,o,a,c){return("DB"!==n||AppStorage.useFallback?_AppCache_GetCache_LS:_AppCache_GetCache_DB)(e,t,r,o,c)}function _AppCache_SetCache(e,t,n,r,o,a){return("DB"!=n||AppStorage.useFallback?_AppCache_SetCache_LS:_AppCache_SetCache_DB)(e,t,r,a)}function _AppCache_GetCache_LS(id,model,online,event,encryption){return new Promise(function(resolve,reject){try{$.sap.require("jquery.sap.storage");var lStorage=$.sap.storage(jQuery.sap.storage.Type.local),modelJSON=lStorage.get(id),decrypted,modelJSON,modelData,modelData;if(online&&!modelJSON&&eval(online)(),!modelJSON)return"function"==typeof eval(event)&&eval(event)(),resolve();if(encryption)0!==modelJSON.indexOf("[")&&0!==modelJSON.indexOf("{")&&(decrypted=CryptoJS.AES.decrypt(modelJSON,AppStorage.deviceID),modelJSON=decrypted?decrypted.toString(CryptoJS.enc.Utf8):[]);else if("string"==typeof modelJSON&&0!==modelJSON.indexOf("[")&&0!==modelJSON.indexOf("{"))return resolve();modelData="string"==typeof modelJSON?JSON.parse(modelJSON):modelJSON,model.setData(modelData),"function"==typeof eval(event)&&eval(event)(),resolve()}catch(e){"function"==typeof eval(event)&&eval(event)(),model.setData(),console.log(e),resolve()}})}function _AppCache_SetCache_LS(o,a,c,i){return new Promise(function(e,t){try{$.sap.require("jquery.sap.storage");var n,r=$.sap.storage(jQuery.sap.storage.Type.local);n=c?JSON.stringify(c):a.getJSON(),i&&(n=CryptoJS.AES.encrypt(n,AppStorage.deviceID).toString()),r.remove(o),r.put(o,n),e()}catch(e){t(e)}})}function _AppCache_GetCache_DB(id,model,online,event,encryption){!function(){var tries=0;function check(){p9Models.isOpen?p9GetModel(id).then(function(value){var modelJSON=value,decrypted,modelJSON;if(encryption)0!==modelJSON.indexOf("[")&&0!==modelJSON.indexOf("{")&&(decrypted=CryptoJS.AES.decrypt(modelJSON,AppStorage.deviceID),modelJSON=decrypted?decrypted.toString(CryptoJS.enc.Utf8):[]);else if("string"==typeof modelJSON&&0!==modelJSON.indexOf("[")&&0!==modelJSON.indexOf("{"))return;var modelData=JSON.parse(modelJSON);model.setData(modelData),"function"==typeof eval(event)&&eval(event)(),online&&!model.oData.length&&eval(online)()}):(tries++,tries<200&&setTimeout(check,50))}check()}()}function _AppCache_SetCache_DB(t,e,n,r){var o,a,c;o=n?JSON.stringify(n):e.getJSON(),r&&(a=CryptoJS.AES.encrypt(o,AppStorage.deviceID),o=a.toString()),c=0,function e(){p9Models.isOpen?p9SaveModel(t,o):++c<200?setTimeout(e,50):_AppCache_Cache_Fallback()}()}function p9SaveModel(t,e){var n=p9Models.result.transaction("model","readwrite").objectStore("model").put({key:t,value:e});n.onerror=function(e){console.log("IndexedDB Error (p9SaveModel) Key "+t+n.error)}}function p9GetModel(r){return new Promise(function(e,t){var n=p9Models.result.transaction("model","readonly").objectStore("model").get(r);n.onsuccess=function(){n.result?e(n.result.value):e("{}")},n.onerror=function(){e("{}")}})}function p9SaveView(t,e){var n=p9Views.result.transaction("view","readwrite").objectStore("view").put({key:t,value:e});n.onerror=function(e){console.log("IndexedDB Error (p9SaveView) Key "+t+n.error)}}function p9GetView(r){return new Promise(function(e,t){var n=p9Views.result.transaction("view","readonly").objectStore("view").get(r);n.onsuccess=function(){n.result?e(n.result.value):e("{}")},n.onerror=function(){e("{}")}})}p9Models.isOpen=!1,p9Views.onupgradeneeded=function(e){e.target.result.createObjectStore("view",{keyPath:"key"})},p9Models.onupgradeneeded=function(e){e.target.result.createObjectStore("model",{keyPath:"key"})},p9Views.onerror=function(e){console.log("IndexedDB could not be opened. Using localStorage as Fallback"),_AppCache_GetCache_DB=_AppCache_GetCache_LS,_AppCache_SetCache_DB=_AppCache_SetCache_LS,p9Database=null},p9Models.onerror=function(e){console.log("IndexedDB could not be opened. Using localStorage as Fallback"),_AppCache_GetCache_DB=_AppCache_GetCache_LS,_AppCache_SetCache_DB=_AppCache_SetCache_LS,p9Database=null},p9Views.onsuccess=function(e){p9Views.isOpen=!0},p9Models.onsuccess=function(e){p9Models.isOpen=!0},p9Views.onclose=function(e){console.error("IndexedDB (p9Views) connection was closed unexpectedly")},p9Models.onclose=function(e){console.error("IndexedDB (p9Models) connection was closed unexpectedly")},AppStorage.Startup(),function(t){"use strict";var n,r=t.Base64;if("undefined"!=typeof module&&module.exports)try{n=require("buffer").Buffer}catch(e){}function o(e){if(e.length<2)return(t=e.charCodeAt(0))<128?e:t<2048?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t)}function a(e){return e.replace(g,o)}function c(e){var t=[0,2,1][e.length%3],n=e.charCodeAt(0)<<16|(1<e.length?e.charCodeAt(1):0)<<8|(2<e.length?e.charCodeAt(2):0);return[p.charAt(n>>>18),p.charAt(n>>>12&63),2<=t?"=":p.charAt(n>>>6&63),1<=t?"=":p.charAt(63&n)].join("")}function i(e,t){return t?y(String(e)).replace(/[+\/]/g,function(e){return"+"==e?"-":"_"}).replace(/=/g,""):y(String(e))}function l(e){switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return h(55296+(t>>>10))+h(56320+(1023&t));case 3:return h((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return h((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}}function u(e){return e.replace(v,l)}function s(e){var t=e.length,n=t%4,r=(0<t?f[e.charAt(0)]<<18:0)|(1<t?f[e.charAt(1)]<<12:0)|(2<t?f[e.charAt(2)]<<6:0)|(3<t?f[e.charAt(3)]:0),o=[h(r>>>16),h(r>>>8&255),h(255&r)];return o.length-=[0,0,2,1][n],o.join("")}function e(e){return b(String(e).replace(/[-_]/g,function(e){return"-"==e?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))}var d,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=function(e){for(var t={},n=0,r=e.length;n<r;n++)t[e.charAt(n)]=n;return t}(p),h=String.fromCharCode,g=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,S=t.btoa?function(e){return t.btoa(e)}:function(e){return e.replace(/[\s\S]{1,3}/g,c)},y=n?n.from&&n.from!==Uint8Array.from?function(e){return(e.constructor===n.constructor?e:n.from(e)).toString("base64")}:function(e){return(e.constructor===n.constructor?e:new n(e)).toString("base64")}:function(e){return S(a(e))},v=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),A=t.atob?function(e){return t.atob(e)}:function(e){return e.replace(/[\s\S]{1,4}/g,s)},b=n?n.from&&n.from!==Uint8Array.from?function(e){return(e.constructor===n.constructor?e:n.from(e,"base64")).toString()}:function(e){return(e.constructor===n.constructor?e:new n(e,"base64")).toString()}:function(e){return u(A(e))};t.Base64={VERSION:"2.3.2",atob:A,btoa:S,fromBase64:e,toBase64:i,utob:a,encode:i,encodeURI:function(e){return i(e,!0)},btou:u,decode:e,noConflict:function(){var e=t.Base64;return t.Base64=r,e}},"function"==typeof Object.defineProperty&&(d=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}},t.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",d(function(){return e(this)})),Object.defineProperty(String.prototype,"toBase64",d(function(e){return i(this,e)})),Object.defineProperty(String.prototype,"toBase64URI",d(function(){return i(this,!0)}))}),t.Meteor&&(Base64=t.Base64),"undefined"!=typeof module&&module.exports?module.exports.Base64=t.Base64:"function"==typeof define&&define.amd&&define([],function(){return t.Base64})}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:this),AppSync={sqlSplit:150,tableFields:{},dataQueue:[],processing:!1,enableLog:!1,initTable:function(o,e){var a=this;this.openDB();var t="CREATE TABLE IF NOT EXISTS "+o+" (",n="";for(i=0;i<e.length;i++)0===i?t+=e[i]+" VARCHAR PRIMARY KEY":t+=n+e[i]+" VARCHAR",n=",";t+=")";try{a.db.transaction(function(e){e.executeSql(t,[])})}catch(e){console.log("Error: Unable to create table "+e+".")}AppSync.tableFields[o]=e,a.db.transaction(function(e){e.executeSql('SELECT name, sql FROM sqlite_master WHERE type="table" AND name = ?',[o],function(e,t){var n=t.rows.item(0).sql.replace(/^[^\(]+\(([^\)]+)\)/g,"$1").split(","),r=[];for(i in n)"string"==typeof n[i]&&r.push(n[i].trim().split(" ")[0]);$.each(AppSync.tableFields[o],function(e,t){if(-1===r.indexOf(t)){var n="ALTER TABLE "+o+" ADD "+t+" VARCHAR;";try{a.db.transaction(function(e){e.executeSql(n,[]),console.log("Table: "+o+", added field: "+t)})}catch(e){console.log("Error: Unable to alter table "+e+".")}}})})})},openDB:function(){if(void 0===this.db)if(window.sqlitePlugin)try{this.db=window.sqlitePlugin.openDatabase({name:"p9Data",location:2})}catch(e){return void console.error("Error: Unable to open database "+e)}else if(window.openDatabase)try{this.db=window.openDatabase("p9Data","1.0","p9Data",62914560)}catch(e){return void console.error("Error: Unable to open database "+e)}else console.error("Error: Your browser do not support WebSQL")},log:function(e){AppSync.enableLog&&console.log(e)},error:function(e){console.error(e)},updateDB:function(e,t,n){this.dataQueue.push({name:t,data:e,callback:n}),this.processing||this._seqUpdate()},_seqUpdate:function(){var e,t,s,d,p,f;this.dataQueue.length&&(this.processing=!0,e=this.dataQueue.shift(),t=e.name,s=e.data,d=e.callback,p=AppSync.tableFields[t],f=this,console.log("Starting an insert. In queue: "+this.dataQueue.length),f.db.transaction(function(n){var r="INSERT OR REPLACE INTO "+t+" (",o="",a="",c=!1,l=0,u=0;r+=f._arrayToString(p,","),a=r+=") SELECT ",$.each(s,function(e,t){for(u===p.length&&(o="",c=!(u=0),++l===AppSync.sqlSplit?(f._executeSql(a,null,n),a=r,l=0,c=!1):a+=" UNION SELECT "),i=0;i<p.length;i++)a+=o+'"'+t[p[i]]+'"',o=",",u++}),c&&f._executeSql(a,null,n),console.log("Done with an insert. In queue: "+f.dataQueue.length),f.dataQueue.length?f._seqUpdate():f.processing=!1,d&&d()},function(e){console.error("Insert failed",e),f.processing=!1}))},_executeSql:function(t,n,e,r){var o=this;o.log("_executeSql: "+t+" with param "+n),r=r||o._defaultCallBack,e?o._executeSqlBridge(e,t,n,r,o._errorHandler):o.db.transaction(function(e){o._executeSqlBridge(e,t,n,r,o._errorHandler)})},_errorHandler:function(e,t){AppSync.error("Error : "+t.message+" (Code "+t.code+") Transaction.sql = "+e.sql)},_executeSqlBridge:function(t,e,n,r,o){var a;void 0!==this.db.dbPath?(a=[e].concat(n),t.executeSql(a,function(e){e.rows.item=function(e){return this[e]},r(t,e)},o)):t.executeSql(e,n,r,o)},_defaultCallBack:function(e,t){},_arrayToString:function(e,t){for(var n="",r=0;r<e.length;r++)n+=e[r],r<e.length-1&&(n+=t);return n}};