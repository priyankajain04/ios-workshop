/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseTreeModifier","sap/ui/base/ManagedObject","sap/base/util/merge","sap/ui/util/XMLHelper","sap/ui/core/mvc/EventHandlerResolver","sap/base/util/includes","sap/base/util/ObjectPath","sap/base/util/isPlainObject","sap/ui/core/Fragment"],function(B,M,m,X,E,a,O,b){"use strict";var c={targets:"xmlTree",setVisible:function(C,v){if(v){C.removeAttribute("visible");}else{C.setAttribute("visible",v);}},getVisible:function(C){return this.getProperty(C,"visible");},setStashed:function(C,s){if(!s){C.removeAttribute("stashed");}else{C.setAttribute("stashed",s);}this.setVisible(C,!s);},getStashed:function(C){return this.getProperty(C,"stashed");},bindProperty:function(C,p,v){C.setAttribute(p,"{"+v+"}");},unbindProperty:function(C,p){C.removeAttribute(p);},setProperty:function(C,p,P){var v=P;if(b(P)){v=JSON.stringify(P);}C.setAttribute(p,v);},getProperty:function(C,p){var P=C.getAttribute(p);var o=this.getControlMetadata(C).getProperty(p);if(o){var t=o.getType();if(P===null){P=o.getDefaultValue()||t.getDefaultValue();}else{var u=M.bindingParser(P,undefined,true);if(b(u)){if(u.path||u.parts){P=undefined;}else{P=u;}}else{P=t.parseValue(u||P);}}}return P;},isPropertyInitial:function(C,p){var P=C.getAttribute(p);return(P==null);},setPropertyBinding:function(C,p,P){if(typeof P!=="string"){throw new Error("For XML, only strings are supported to be set as property binding.");}C.setAttribute(p,P);},getPropertyBinding:function(C,p){var P=C.getAttribute(p);if(P){var u=M.bindingParser(P,undefined,true);if(u&&(u.path||u.parts)){return u;}}},createControl:function(C,A,v,s,S,d){var i,l,e;if(!this.bySelector(s,A,v)){var f=C.split('.');var n="";if(f.length>1){l=f.pop();n=f.join('.');}var N=v.ownerDocument.createElementNS(n,l);i=this.getControlIdBySelector(s,A);if(i){N.setAttribute("id",i);}if(S){this.applySettings(N,S);}return d?Promise.resolve(N):N;}else{e=new Error("Can't create a control with duplicated ID "+i);if(d){return Promise.reject(e);}throw e;}},applySettings:function(C,s){var o=this.getControlMetadata(C);var d=o.getJSONKeys();Object.keys(s).forEach(function(k){var K=d[k];var v=s[k];switch(K._iKind){case 0:this.setProperty(C,k,v);break;case 3:this.setAssociation(C,k,v);break;default:throw new Error("Unsupported in applySettings on XMLTreeModifier: "+k);}}.bind(this));},_byId:function(i,v){if(v){if(v.ownerDocument&&v.ownerDocument.getElementById&&v.ownerDocument.getElementById(i)){return v.ownerDocument.getElementById(i);}else{return v.querySelector("[id='"+i+"']");}}},getId:function(C){return C.getAttribute("id");},getParent:function(C){var p=C.parentNode;if(!this.getId(p)){p=p.parentNode;}return p;},_getLocalName:function(x){return x.localName||x.baseName||x.nodeName;},getControlType:function(C){return this._getControlTypeInXml(C);},setAssociation:function(p,n,i){if(typeof i!=="string"){i=this.getId(i);}p.setAttribute(n,i);},getAssociation:function(p,n){return p.getAttribute(n);},getAllAggregations:function(C){var o=this.getControlMetadata(C);return o.getAllAggregations();},getAggregation:function(p,n){var A=this._findAggregationNode(p,n);var s=this._isSingleValueAggregation(p,n);if(!A){if(s&&this._isAltTypeAggregation(p,n)){return this.getProperty(p,n);}return s?undefined:[];}var C=this._getControlsInAggregation(p,A);if(s){return C[0];}return C;},insertAggregation:function(p,n,o,i,v){var A=this._findAggregationNode(p,n);if(!A){var N=p.namespaceURI;A=this.createControl(N+"."+n,undefined,v);p.appendChild(A);}if(i>=A.childElementCount){A.appendChild(o);}else{var r=this._getControlsInAggregation(p,A)[i];A.insertBefore(o,r);}},removeAggregation:function(p,n,o){var A=this._findAggregationNode(p,n);A.removeChild(o);},removeAllAggregation:function(C,n){var A=this._findAggregationNode(C,n);if(C===A){var d=this._getControlsInAggregation(C,C);d.forEach(function(o){C.removeChild(o);});}else{C.removeChild(A);}},_findAggregationNode:function(p,n){var A;var C=this._children(p);for(var i=0;i<C.length;i++){var N=C[i];if(N.localName===n){A=N;break;}}if(!A&&this._isDefaultAggregation(p,n)){A=p;}return A;},_isDefaultAggregation:function(p,A){var C=this.getControlMetadata(p);var d=C.getDefaultAggregation();return d&&A===d.name;},_isNotNamedAggregationNode:function(p,C){var A=this.getAllAggregations(p);var o=A[C.localName];return p.namespaceURI!==C.namespaceURI||!o;},_isSingleValueAggregation:function(p,A){var d=this.getAllAggregations(p);var o=d[A];return!o.multiple;},_isAltTypeAggregation:function(p,A){var C=this.getControlMetadata(p);var o=C.getAllAggregations()[A];return!!o.altTypes;},getControlMetadata:function(C){return this._getControlMetadataInXml(C);},_getControlsInAggregation:function(p,A){var C=Array.prototype.slice.call(this._children(A));return C.filter(this._isNotNamedAggregationNode.bind(this,p));},_children:function(p){if(p.children){return p.children;}else{var C=[];for(var i=0;i<p.childNodes.length;i++){var n=p.childNodes[i];if(n.nodeType===n.ELEMENT_NODE){C.push(n);}}return C;}},getBindingTemplate:function(C,A){var o=this._findAggregationNode(C,A);if(o){var d=this._children(o);if(d.length===1){return d[0];}}},updateAggregation:function(C,A){},findIndexInParentAggregation:function(C){var p,A,d;p=this.getParent(C);if(!p){return-1;}A=this.getParentAggregationName(C,p);d=this.getAggregation(p,A);if(Array.isArray(d)){d=d.filter(function(C){return!this.getProperty(C,"stashed");}.bind(this));return d.indexOf(C);}else{return 0;}},getParentAggregationName:function(C,p){var n,A;if(!p.isSameNode(C.parentNode)){n=false;}else{n=this._isNotNamedAggregationNode(p,C);}if(n){A=this.getControlMetadata(p).getDefaultAggregationName();}else{A=this._getLocalName(C.parentNode);}return A;},findAggregation:function(C,A){var o=this.getControlMetadata(C);var d=o.getAllAggregations();if(d){return d[A];}},validateType:function(C,A,p,f,i){var t=A.type;if(A.multiple===false&&this.getAggregation(p,A.name)&&this.getAggregation(p,A.name).length>0){return false;}var d=sap.ui.xmlfragment({fragmentContent:f});if(!Array.isArray(d)){d=[d];}var r=this._isInstanceOf(d[i],t)||this._hasInterface(d[i],t);d.forEach(function(F){F.destroy();});return r;},instantiateFragment:function(f,n,v){var C;var F=X.parse(f);F=this._checkAndPrefixIdsInFragment(F,n);if(F.localName==="FragmentDefinition"){C=this._getElementNodeChildren(F);}else{C=[F];}C.forEach(function(N){if(this._byId(N.getAttribute("id"),v)){throw Error("The following ID is already in the view: "+N.getAttribute("id"));}}.bind(this));return C;},destroy:function(C){var p=C.parentNode;p.removeChild(C);},getChangeHandlerModulePath:function(C){if(!C){return undefined;}return C.getAttributeNS("sap.ui.fl","flexibility");},attachEvent:function(n,e,f,d){if(typeof O.get(f)!=="function"){throw new Error("Can't attach event because the event handler function is not found or not a function.");}var v=this.getProperty(n,e)||"";var g=E.parse(v);var s=f;var p=["$event"];if(d){p.push(JSON.stringify(d));}s+="("+p.join(",")+")";if(!a(g,s)){g.push(s);}n.setAttribute(e,g.join(";"));},detachEvent:function(n,e,f){if(typeof O.get(f)!=="function"){throw new Error("Can't attach event because the event handler function is not found or not a function.");}var v=this.getProperty(n,e)||"";var d=E.parse(v);var i=d.findIndex(function(s){return s.includes(f);});if(i>-1){d.splice(i,1);}if(d.length){n.setAttribute(e,d.join(";"));}else{n.removeAttribute(e);}},bindAggregation:function(n,A,v,V){this.bindProperty(n,A,v.path);this.insertAggregation(n,A,v.template,0,V);},unbindAggregation:function(n,A){if(n.hasAttribute(A)){n.removeAttribute(A);this.removeAllAggregation(n,A);}}};return m({},B,c);},true);
