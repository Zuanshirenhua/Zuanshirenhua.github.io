/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);


$(document).ready(function () {
	$('#openBook').on('click', function () {
		$('#bookModal').fadeIn(() => {
			if (!$('.book').data('done')) {

				// 清空旧内容（防止多次打开重复）
				$('.book').empty();

				// 添加封面
				$('.book').append('<div class="page cover"><img src="images/coverpage.png" /></div>');

				// 添加多个空白页（每次两页）
				for (let i = 0; i < 5; i++) {
					$('.book').append(`
						<div class="page double"><img src="images/emptyleft.png" /></div>
						<div class="page double"><img src="images/emptyright.png" /></div>
					`);
				}

				// 添加固定的最后一页
				$('.book').append('<div class="page end"><img src="images/endpage.png" /></div>');

				// ✅ turn.js 初始化 + 添加翻页事件监听
				$('.book').turn({
					width: 900,
					height: 600,
					autoCenter: true,
					display: 'double',
					gradients: true,
					acceleration: true,
					when: {
						turned: function (event, page, view) {
							const totalPages = $(this).turn('pages');

							// 左箭头：第一页时隐藏
							if (page === 1) {
								$('#prevPage').hide();
							} else {
								$('#prevPage').show();
							}

							// 右箭头：最后一页时隐藏
							if (page === totalPages) {
								$('#nextPage').hide();
							} else {
								$('#nextPage').show();
							}
						}
					}
				});

				// ✅ 初始页设为第一页 & 触发一次箭头状态刷新
				$('.book').turn('page', 1);
				$('#prevPage').hide(); // 因为第一页不显示左箭头
				$('#nextPage').show();

				$('.book').data('done', true);
			}
		});
	});

	$('#closeBook').on('click', function () {
		$('#bookModal').fadeOut();
	});

	$('#prevPage').on('click', function () {
		$('.book').turn('previous');
	});

	$('#nextPage').on('click', function () {
		$('.book').turn('next');
	});
});


function typeText(elementId, text, delay = 100, callback = null) {
	const el = document.getElementById(elementId);
	el.style.display = 'block'; // 显现元素
	el.innerHTML = '';
	let i = 0;
	const interval = setInterval(() => {
		if (i < text.length) {
			el.innerHTML += text.charAt(i);
			i++;
		} else {
			clearInterval(interval);
			if (callback) callback();
		}
	}, delay);
}

window.addEventListener('DOMContentLoaded', () => {
	typeText("typing-cn", "这里是YRY的乌托邦", 120, () => {
		typeText("typing-en", "HIYA, I'M RUYAN YU", 120, () => {
			typeText("typing-sub", "欢迎光临，我的世界。", 100);
		});
	});
});
