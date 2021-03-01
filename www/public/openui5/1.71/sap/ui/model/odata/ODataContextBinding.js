/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/model/ContextBinding','sap/ui/model/ChangeReason'],function(C,a){"use strict";var O=C.extend("sap.ui.model.odata.ODataContextBinding",{constructor:function(m,p,c,P,e){C.call(this,m,p,c,P,e);}});O.prototype.initialize=function(){var t=this,r=this.oModel.resolve(this.sPath,this.oContext),d=this.oModel._getObject(this.sPath,this.oContext),R=this.oModel._isReloadNeeded(r,d,this.mParameters);if(this.oModel.oMetadata.isLoaded()){if(r&&R){this.fireDataRequested();}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(c){t.oElementContext=c;t._fireChange({reason:a.Context});if(r&&R){t.fireDataReceived();}},R);}};O.prototype.refresh=function(f,c){var t=this,k,s,b=false,r=this.oModel.resolve(this.sPath,this.oContext);if(c){s=this.oModel._getObject(this.sPath,this.oContext);if(s){k=this.oModel._getKey(s);if(k in c){b=true;}}}else{b=true;}if(f||b){if(r){this.fireDataRequested();}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(o){if(t.oElementContext===o){if(f){t._fireChange({reason:a.Context});}}else{t.oElementContext=o;t._fireChange({reason:a.Context});}if(r){t.fireDataReceived();}},true);}};O.prototype.setContext=function(c){var t=this,r,d,R;if(this.oContext!==c&&this.isRelative()){this.oContext=c;r=this.oModel.resolve(this.sPath,this.oContext);d=this.oModel._getObject(this.sPath,this.oContext);R=this.oModel._isReloadNeeded(r,d,this.mParameters);if(r&&R){this.fireDataRequested();}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(c){t.oElementContext=c;t._fireChange({reason:a.Context});if(r&&R){t.fireDataReceived();}},R);}};return O;});
