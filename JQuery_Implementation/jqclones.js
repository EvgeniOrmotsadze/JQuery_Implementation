/**
 * Created by evgeni on 12/14/2014.
 */
(function(e,t){function i(e){var t={};return e&&t.toString.call(e)==="[object Function]"}function s(e,t){e.request=null;if(t!=undefined){if(t instanceof Object){if(t.url!=null){var n=o(t.type);var r=null;if(t.data!=undefined){for(var i in t.data){r+=i+"="+encodeURIComponent(t.data[i])}}e.request=new XMLHttpRequest;e.request.open(n,t.type,true);e.request.setRequestHeader("Content-type","application/x-www-form-urlencoded");e.request.send(r)}}else{e.request=new XMLHttpRequest;e.request.open("GET",t,true);e.request.setRequestHeader("Content-type","application/x-www-form-urlencoded");e.send()}}e.done=function(t){e.request.addEventListener("load",t(e.response));return this};e.error=function(t){e.request.addEventListener("fail",t(e.responseText));return this}}function o(e){if(e==="GET"){return"GET"}else{return"POST"}}var n=function(e,t){return new r(e,t)};var r=function(e,n){var r;if(n!=undefined)r=n;else r=t;var i=r.querySelectorAll(e);for(var s=0;s<i.length;s++){this.push(i[s])}};r.prototype=Array.prototype;r.prototype.first=function(){var e=new r;e.push(this[0]);return e};r.prototype.last=function(){var e=new r;e.push(this[this.length-1]);return e};r.prototype.each=function(e){for(var t=0;t<this.length;t++){e(this[t],t)}};r.prototype.find=function(e){var t=new r;for(var n=0;n<this.length;n++){var i=this[n].querySelectorAll(e);for(var s=0;s<i.length;s++){t.push(i[s])}}return t};r.prototype.hasClass=function(e){return(" "+this[0].className+" ").indexOf(" "+e+" ")>-1};r.prototype.addClass=function(e){var n=e.split(" ");if(t.body.classList){for(var r=0;r<this.length;r++){for(var i=0;i<n.length;i++){this[r].classList.add(n[i])}}}else{for(var r=0;r<this.length;r++){if(this[r].className.length>0){e=" "+e}this[r].className+=e}}return this};r.prototype.removeClass=function(e){var n=e.split(" ");if(t.body.classList){for(var r=0;r<this.length;r++){for(var i=0;i<n.length;i++){if(this[r].classList.contains(n[i])){this[r].classList.remove(n[i])}}}}else{for(var r=0;r<this.length;r++){this[r].className=this[r].className+" ";for(var i=0;i<n.length;i++){if((" "+this[r].className).indexOf(" "+n[i]+" ")>-1){this[r].className=this[r].className.replace(n[i]+" ","")}}if(this[r].className.lastIndexOf(" ")>-1)this[r].className=this[r].className.substr(0,this[r].className.length-1)}}return this};r.prototype.toggleClass=function(e){var n=e.split(" ");if(t.body.classList){for(var r=0;r<this.length;r++){for(var i=0;i<n.length;i++){if(this[r].classList.contains(n[i])){this[r].classList.remove(n[i])}else{this[r].classList.add(n[i])}}}}else{for(var r=0;r<this.length;r++){for(var i=0;i<n.length;i++){if((" "+this[0].className+" ").indexOf(" "+n[i]+" ")>-1){this[r].className=this[r].className+" ";this[r].className=this[r].className.replace(n[i]+" ","");if(this[r].className.lastIndexOf(" ")>-1)this[r].className=this[r].className.substr(0,this[r].className.length-1)}else{if(this[r].className.length>0){this[r].className+=" "+n[i]}else{this[r].className+=n[i]}}}}}return this};r.prototype.attr=function(e,t){if(e instanceof Object){for(var n in e){this[0].setAttribute(n,e[n])}return this}else{var s=this[0].getAttribute(e);if(t!=undefined){if(i(t)){this.each(function(n,r){var i=t.call(n,r,n.getAttribute(e));this.setAttribute(e,i)})}else{this[0].setAttribute(e,t);return this}}else{var o=new r;o.push(s);return o}}return this};r.prototype.css=function(t,n){if(n!=undefined){for(var r=0;r<this.length;r++){var i=this[r].getAttribute("style");if(i!=null){i+=t+":"+n+";";console.log(i);this[r].setAttribute("style",i)}else{var s=t+":"+n+";";this[r].setAttribute("style",s)}}}else{if(t instanceof Object){for(var r=0;r<this.length;r++){var o=this[r].getAttribute("style");if(o!=null){for(var u in t){o+=u+":"+t[u]+";"}this[r].setAttribute("style",o)}else{var a=new String;for(var u in t){a+=u+":"+t[u]+";"}this[r].setAttribute("style",a)}}}else{return e.getComputedStyle(this[0],null).getPropertyValue(t)}}};r.prototype.data=function(e,n){if(t.body.dataset){if(e==undefined&&n==undefined){return this[0].dataset}if(n==undefined){if(e instanceof Object){for(var i in e){this[0].setAttribute("data-"+i,e[i])}}else{for(var s in this[0].dataset){if(s==e)return this[0].dataset[s]}}}else{this[0].setAttribute("data-"+e,n)}}else{if(e==undefined&&n==undefined){var o=new r;for(var u=0;u<this[0].attributes.length;u++){if("data-"==this[0].attributes[u].nodeName.substring(0,5)){o.push(this[0].attributes[u].value)}}return o}if(n==undefined){if(e instanceof Object){for(var i in e){this[0].setAttribute("data-"+i,e[i])}}else{for(var u=0;u<this[0].attributes.length;u++){if("data-"==this[0].attributes[u].nodeName.substring(0,5)){if(this[0].attributes[u].nodeName=="data-"+e){return this[0].attributes[u].value}}}}}else{this[0].setAttribute("data-"+e,n)}}};r.prototype.on=function(e,t,n){var r=n;if(r==undefined)r=false;for(var i=0;i<this.length;i++){this[i].addEventListener(e,t,r)}};r.prototype.html=function(e){if(e==null)return this[0].outerHTML;this[0].innerHTML=e};r.prototype.append=function(e){this[0].insertAdjacentHTML("beforeend",e)};r.prototype.prepend=function(e){this[0].insertAdjacentHTML("afterbegin",e)};r.prototype.empty=function(){for(var e=0;e<this.length;e++){while(this[e].firstChild){this[e].removeChild(this[e].firstChild)}}};e.$.ajax=function(e){s(this,e)};e.jQClone=n;e.$=e.jQClone})(window,document);