/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var F="sap.ui.fl.change";var a="sap.ui.fl.variant";return{forEachChangeInStorage:function(p,P){var r=p.storage.getItems&&p.storage.getItems()||p.storage;var k=Object.keys(r);k.forEach(function(K){var i=K.includes(F)||K.includes(a);if(!i){return;}var f=JSON.parse(r[K]);var s=true;if(p.reference){s=f.reference===p.reference||f.reference+".Component"===p.reference;}var S=true;if(p.layer){S=f.layer===p.layer;}if(!s||!S){return;}P({changeDefinition:f,key:K});});},getAllFlexObjects:function(p){var f=[];this.forEachChangeInStorage(p,function(m){f.push(m);});return f;},createChangeKey:function(i){if(i){return F+"."+i;}},createVariantKey:function(i){if(i){return a+"."+i;}},createFlexObjectKey:function(f){if(f.fileType==="ctrl_variant"&&f.variantManagementReference){return this.createVariantKey(f.fileName);}return this.createChangeKey(f.fileName);},sortGroupedFlexObjects:function(r){function b(c,C){return new Date(c.creation)-new Date(C.creation);}["changes","variantChanges","variants","variantDependentControlChanges","variantManagementChanges"].forEach(function(s){r[s]=r[s].sort(b);});return r;}};});
