/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dt/enablement/Test","sap/ui/dt/enablement/ElementEnablementTest"],function(T,E){"use strict";var L=T.extend("sap.ui.dt.enablement.report.LibraryReport",{metadata:{library:"sap.ui.dt",properties:{libraryName:{type:"string"},testData:{type:"object"}}}});L.prototype.run=function(){this._aResult=[];var t=this.getTestData()||{};var l=this.getLibraryName();var e=[];var o=sap.ui.getCore().getLoadedLibraries()[l];if(o){var a=o.controls;a.forEach(function(s){var b=t[s];if(!b&&b!==false){b={};}if(b!==false){b.type=s;var c=null;if(b.create){c=Object.assign({},b);delete c.create;b.groupPostfix="with create method";}e.push(new E(b));if(c){e.push(new E(c));}}});}var r=[];var i=function(R){if(R){r.push(R);}var b=e.shift();if(b){return b.run().then(function(R){b.destroy();return i(R);});}return Promise.resolve(r);};return i().then(function(r){var R=this.createSuite("Library Enablement Test");r.forEach(function(m){var c=m.children[0];var p=R.children[R.children.length-1];if(p&&c.name===p.name){p.children=p.children.concat(c.children);}else{R.children.push(c);}});R=this.aggregate(R);return R;}.bind(this));};return L;});