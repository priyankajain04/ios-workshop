/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Popup","sap/ui/core/BusyIndicator","sap/base/Log","sap/ui/dt/Util","sap/m/InstanceManager","sap/base/util/includes","sap/base/util/restricted/_max","sap/base/util/restricted/_min"],function(P,B,L,U,I,i,_,a){"use strict";var Z=10;var b=3;var A=[];var c=[];function g(){return I.getOpenDialogs().concat(I.getOpenPopovers(),B.oPopup&&B.oPopup.isOpen()?[B.oPopup]:[]);}function d(C,m,E){if(++C<=m){if(i(E,C)){return d(C,m,E);}return C;}L.error('sap.ui.dt.util.ZIndexManager: z-index limit has been exceeded, therefore all following calls receive the same z-Index = '+m);return m;}function e(p){return p.map(function(o){return o._iZIndex||o.oPopup._iZIndex;});}var f={getNextZIndex:function(){var h=g();var v=[];var j=[];h.forEach(function(o){var V=c.every(function(F){return F(o);});V&&c.length>0?v.push(o):j.push(o);});var m=v.length>0?_(e(v)):-1;var M=j.length>0?a(e(j)):-1;if(m<M){return this._getNextMinZIndex(M);}return P.getNextZIndex();},getZIndexBelowPopups:function(){var o=g();var l;if(o.length>0){l=Math.min.apply(null,e(o));}if(!U.isInteger(l)){return P.getNextZIndex();}return this._getNextMinZIndex(l);},addPopupFilter:function(F){if(typeof F==="function"){c=c.concat([F]);}},removePopupFilter:function(F){c=c.filter(function(E){return E===F;});},_getNextMinZIndex:function(C){var m=C-b;var M=C-Z;var n=d(M,m,A);A.push(n);return n;}};return f;});
