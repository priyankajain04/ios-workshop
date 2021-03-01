/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dt/Plugin","sap/ui/dt/Overlay","sap/ui/dt/OverlayRegistry","sap/ui/dom/jquery/Selectors"],function(q,P,O,a){"use strict";var T=P.extend("sap.ui.dt.plugin.TabHandling",{metadata:{library:"sap.ui.dt",properties:{},associations:{},events:{}}});T.prototype.registerElementOverlay=function(o){if(o.isRoot()){this.removeTabIndex();}};T.prototype.deregisterElementOverlay=function(o){if(o.isRoot()){this.restoreTabIndex();}};T.prototype.setDesignTime=function(d){P.prototype.setDesignTime.apply(this,arguments);if(d){if(!this._oMutationObserver){this._oMutationObserver=O.getMutationObserver();this._oMutationObserver.attachDomChanged(this._onDomChanged,this);}}else{this._oMutationObserver.detachDomChanged(this._onDomChanged,this);delete this._oMutationObserver;this.restoreTabIndex();}};T.prototype.removeTabIndex=function(){var d=this.getDesignTime();var r=d.getRootElements();r.forEach(function(R){var o=a.getOverlay(R);var $=o&&o.getAssociatedDomRef();if($){$.find(":focusable:not([tabIndex=-1], #overlay-container *)").each(function(i,n){n.setAttribute("data-sap-ui-dt-tabindex",n.tabIndex);n.setAttribute("tabindex",-1);});}});};T.prototype.restoreTabIndex=function(){q("[data-sap-ui-dt-tabindex]").each(function(i,n){n.setAttribute("tabindex",n.getAttribute("data-sap-ui-dt-tabindex"));n.removeAttribute("data-sap-ui-dt-tabindex");});};T.prototype._onDomChanged=function(){if(this.getDesignTime().getEnabled()){this.removeTabIndex();}};return T;});
