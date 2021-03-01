/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/core/XMLCompositeMetadata','sap/ui/model/base/ManagedObjectModel','sap/ui/model/json/JSONModel','sap/ui/core/Fragment','sap/ui/base/ManagedObject','sap/ui/base/DataType','sap/ui/model/resource/ResourceModel','sap/base/Log','sap/ui/performance/Measurement'],function(C,X,M,J,F,a,D,R,L,b){"use strict";var x="sap.ui.core.XMLComposite";var c=C.extend("sap.ui.core.XMLComposite",{metadata:{interfaces:["sap.ui.core.IDScope"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%',invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},displayBlock:{type:"boolean",group:"Appearance",defaultValue:true,invalidate:true}},aggregations:{_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden",invalidate:true}}},constructor:function(){this._bIsCreating=true;C.apply(this,arguments);delete this._bIsCreating;},renderer:function(r,o){L.debug("Start rendering '"+o.sId,x);b.start(o.getId()+"---renderControl","Rendering of "+o.getMetadata().getName(),["rendering","control"]);r.write("<div");r.writeControlData(o);r.writeAccessibilityState(o);if(!o.getDisplayBlock()&&(o.getWidth()!=="100%"||o.getHeight()!=="100%")){r.addStyle("display","inline-block");}r.writeClasses();if(o.getHeight()){r.addStyle("height",o.getHeight());}if(o.getWidth()){r.addStyle("width",o.getWidth());}r.writeStyles();r.write(">");var d=o._renderingContent?o._renderingContent():o._getCompositeAggregation();if(d){r.renderControl(d);}r.write("</div>");b.end(o.getId()+"---renderControl");L.debug("Stop rendering '"+o.sId,x);}},X);c.prototype.byId=function(i){return sap.ui.getCore().byId(F.createId(this.getId(),i));};c.prototype._getManagedObjectModel=function(){if(!this._oManagedObjectModel){this._oManagedObjectModel=new M(this);}return this._oManagedObjectModel;};c.prototype.getSuppressInvalidateAggregation=function(n,s){var m=this.getMetadata(),A=m.getAggregation(n)||m.getAllPrivateAggregations()[n];if(!A){return true;}s=m._suppressInvalidate(A,s);return s;};c.prototype.setProperty=function(n,v,s){var m=this.getMetadata(),p=m.getManagedProperty(n);if(!p){return this;}s=m._suppressInvalidate(p,s);return C.prototype.setProperty.apply(this,[n,v,s]);};c.prototype.setAggregation=function(n,o,s){return C.prototype.setAggregation.apply(this,[n,o,this.getSuppressInvalidateAggregation(n,s)]);};c.prototype.addAggregation=function(n,o,s){return C.prototype.addAggregation.apply(this,[n,o,this.getSuppressInvalidateAggregation(n,s)]);};c.prototype.insertAggregation=function(n,o,i,s){return C.prototype.insertAggregation.apply(this,[n,o,i,this.getSuppressInvalidateAggregation(n,s)]);};c.prototype.removeAggregation=function(n,o,s){return C.prototype.removeAggregation.apply(this,[n,o,this.getSuppressInvalidateAggregation(n,s)]);};c.prototype.removeAllAggregation=function(n,s){return C.prototype.removeAllAggregation.apply(this,[n,this.getSuppressInvalidateAggregation(n,s)]);};c.prototype.destroyAggregation=function(n,s){return C.prototype.destroyAggregation.apply(this,[n,this.getSuppressInvalidateAggregation(n,s)]);};c.prototype.updateAggregation=function(n,s){var A=this.getMetadata().getAggregation(n);if(A&&A.type==="TemplateMetadataContext"){this.invalidate();return;}C.prototype.updateAggregation.apply(this,arguments);};c.prototype.setVisible=function(v){this.setProperty("visible",v);if(this.getParent()){this.getParent().invalidate();}return this;};c.prototype._destroyCompositeAggregation=function(){var o=this._getCompositeAggregation();if(o){o.destroy("KeepDom");}return this;};c.prototype.updateBindings=function(){if(this._bIsCreating){return;}var r=C.prototype.updateBindings.apply(this,arguments);for(var n in this.mBindingInfos){var A=this.getMetadata().getAggregation(n);if(A&&A.multiple&&!A._doesNotRequireFactory&&this.isBound(n)&&!this.getBinding(n)){this[A._sDestructor]();}}return r;};c.prototype._getCompositeAggregation=function(){var s=this.getMetadata().getCompositeAggregationName();return this.getAggregation(s);};c.prototype._setCompositeAggregation=function(n){var s=this.getMetadata().getCompositeAggregationName();this._destroyCompositeAggregation();if(!this._oManagedObjectModel){this._getManagedObjectModel();}if(Array.isArray(n)){this.setAggregation(s,null);return;}if(n){if(!n.enhanceAccessibilityState){n.enhanceAccessibilityState=function(e,A){this.enhanceAccessibilityState(e,A);}.bind(this);}n.bindObject("$"+this.alias+">/");n.setModel(this._oManagedObjectModel,"$"+this.alias);if(this.bUsesI18n){var r=this._getResourceModel();if(r){n.setModel(r,"$"+this.alias+".i18n");}}}this.setAggregation(s,n);};c.mResourceModels={};c.getLibraryResourceModel=function(l){var o=c.mResourceModels[l];if(!o){o=new R({bundleName:l+".messagebundle",async:true});c.mResourceModels[l]=o;}return o;};c.prototype._getResourceModel=function(){if(this.resourceModel){return this.resourceModel;}if(this.messageBundle){this.resourceModel=new R({bundleName:this.messageBundle,async:true});return this.resourceModel;}else{this.sLibraryName=this.sLibraryName||this.getMetadata().getLibraryName();if(this.sLibraryName){return c.getLibraryResourceModel(this.sLibraryName);}}};c.prototype.getResourceBundle=function(){var r=this._getResourceModel();return r?r.getResourceBundle():null;};c.prototype.destroy=function(){C.prototype.destroy.apply(this,arguments);if(this.resourceModel){this.resourceModel.destroy();}if(this._oManagedObjectModel){this._oManagedObjectModel.destroy();}};c.prototype._initCompositeSupport=function(s){var m=this.getMetadata(),f=m._fragment,A=m.getCompositeAggregationName();this._destroyCompositeAggregation();if(s&&A&&s[A]){var n=s[A];if(n.localName==="FragmentDefinition"){f=n;delete s[A];}}var d=f?(new XMLSerializer()).serializeToString(f):undefined;this.bUsesI18n=d?(d.indexOf("$"+this.alias+".i18n")!=-1):true;this._setCompositeAggregation(sap.ui.xmlfragment({sId:this.getId(),fragmentContent:f,oController:this}));this._bIsInitialized=true;};c.prototype.enhanceAccessibilityState=function(e,A){var p=this.getParent();if(p&&p.enhanceAccessibilityState){return p.enhanceAccessibilityState(this,A);}return A;};c.prototype.getFocusDomRef=function(){var o=this._renderingContent?this._renderingContent():this._getCompositeAggregation();return o.getFocusDomRef();};c.prototype.getFocusInfo=function(){var o=this._renderingContent?this._renderingContent():this._getCompositeAggregation();return o.getFocusInfo();};c.prototype.getIdForLabel=function(){var o=this._renderingContent?this._renderingContent():this._getCompositeAggregation();return o.getIdForLabel();};return c;});
