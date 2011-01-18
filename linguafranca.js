/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */
/*global google: false, window: false */

(function () {
	"use strict";
	
	window.LinguaFranca = {
		init: function (s) {
			var all = document.body.getElementsByTagName('*'), lf = this, el = '', lang_from = '', i = 0, elover = '', elmove = '', elout = '';
			
			if (typeof s === 'object') {
				this.s = s;
				this.nativeTongue = s.nativeTongue;
			} else {
				this.s = {};
				this.setNativeTongue();
			}
			
			elover = function (event) {
				var input = this.innerHTML, lang_from = this.getAttribute('lang'), lang_to = lf.nativeTongue, x = '', y = '';
				
				if (!event) {
					x = window.event.clientX;
					y = window.event.clientY;
				} else {
					x = event.clientX;
					y = event.clientY;
				}

				google.language.translate(input, lang_from, lang_to, function (result) {
					var output = '';
					
					if (!result.error) {
						output = result.translation;
					} else {
						output = input;
					}
					
					lf.createBox(output, this, x, y);
				});
			};
			elmove = function (event) {
				var x = '', y = '';
				
				if (!event) {
					x = window.event.clientX;
					y = window.event.clientY;
				} else {
					x = event.clientX;
					y = event.clientY;
				}
				
				lf.moveBox(x, y);
			};
			elout = function () {
				lf.destroyBox(this);
			};
			
			for (i = 0; i < all.length; i = i + 1) {
				el = all[i];
				lang_from = el.getAttribute('lang');
				
				if (lang_from !== null && lang_from !== '') {
					this.addClass(el, 'lf_translate');

					el.onmouseover = elover;
					el.onmousemove = elmove;
					el.onmouseout = elout;
				}
			}
		},
		createBox: function (text, el, x, y) {
			var bId = 'lf_translation_box', bTop = (y + 15) + 'px', bLeft = x + 'px', bWidth = 'auto', box = document.getElementById(bId);
			
			if (!box) {
				box = document.createElement('DIV');
				box.id = bId;
			}
			box.style.top = bTop;
			box.style.left = bLeft;
			box.style.width = bWidth;
			
			box.style.position = 'absolute';
			box.style.display = 'block';
			
			this.addClass(box, 'lf_translation');
			box.innerHTML = text;

			document.body.appendChild(box);
		},
		
		moveBox: function (x, y) {
			var bId = 'lf_translation_box', box = document.getElementById(bId), bTop = (y + 15) + 'px', bLeft = x + 'px';
			
			if (box) {
				box.style.top = bTop;
				box.style.left = bLeft;
			}
		},
		
		destroyBox: function (el) {
			var bId = 'lf_translation_box', box = document.getElementById(bId);
			
			if (box) {
				document.body.removeChild(box);
			}
		},
		
		setNativeTongue: function () {
			var nTongue = document.getElementsByTagName('html')[0].getAttribute('lang'), text = '', lf = this;

			if (!nTongue || nTongue === '') {
				text = document.getElementsByTagName('p')[0].innerHTML;
				google.language.detect(text, function (result) {
					if (!result.error) {
						lf.nativeTongue = result.language;
					}
				});
			} else {
				this.nativeTongue = nTongue;
			}
		},
		
		hasClass: function (el, name) {
			var search = new RegExp('(\\s|^)' + name + '(\\s|$)');
			
			return el.className.match(search);
		},
		
		addClass: function (el, name) {		
			var classes = el.className;
			
			if (classes === null) {
				classes = '';
			} else {
				classes += ' ';
			}

			if (!this.hasClass(el, name)) {
				el.className =  classes + name;
			}
		},
		
		removeClass: function (el, name) {
			var search = new RegExp('(\\s|^)' + name + '(\\s|$)');
			
			if (this.hasClass(el, name)) {
				el.className = el.className.replace(search, '');
			}
		}
	};
	
	window.LinguaFranca.init();
}());
