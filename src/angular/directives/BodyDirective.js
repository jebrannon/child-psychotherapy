'use strict';

var BodyDirective = function ($window, $sce) {
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			var transitionEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';

			var handleEvent = function (e, data) {
				var eventType = e.type ? e.type : e.name;
				switch(eventType) {
					case 'click':
						handleClickEvents(e);
						break;
					case 'webkitTransitionEnd':
					case 'transitionend':
					case 'msTransitionEnd':
					case 'oTransitionEnd':
						handleAnimationEvents(e);
						break;
				}
			};
			var handleClickEvents = function(e) {
				var action = $(e.target).attr('data-app-action');
				console.log(e.target);
				switch(action) {
					case 'OpenNavigation':
						if (!elem.hasClass('is-nav')) {
							elem.addClass('prevent-scroll');
						}
						elem.toggleClass('is-nav');
						break;
				}
			}
			var handleAnimationEvents = function (e) {
				var transition = $(e.target).attr('data-app-transition');
				switch(transition) {
					case 'Navigation':
						if (!elem.hasClass('is-nav')) {
							elem.removeClass('prevent-scroll');
						}
						break;
				}
			}

			
			var init = function () {
				elem.on('click', handleEvent);
				elem.on(transitionEnd, handleEvent);
			}

			init();
		}
	};
};
module.exports = BodyDirective;