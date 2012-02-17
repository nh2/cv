<<<<<<< HEAD
/* Author:

*/





=======
(function() {
	var tree,
		points = [];

	// Animation functions
	function showInfo() {
		$('#Tree').animate({ top: '50%' }, 750);
		$('#Info').fadeIn();
	}

	function showTree() {
		$('#Tree').animate({ top: '0%' }, 750);
		$('#Info').fadeOut();
	}

	$('#collapse').bind('click', function(ev) {
		var link = $(this);
		link.toggleClass('active');
		if(link.hasClass('active')) {
			showInfo();
		}
		else {
			showTree();
		}
	});
	return (window.cv = {
		init: function() {
			var data = $.getJSON('js/someData.json');

			tree = Raphael('Tree', 960, '100%');

			tree.customAttributes.arc = function (xloc, yloc, value, total, R) {
				var alpha = 360 / total * value,
					a = (90 - alpha) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc - R * Math.sin(a),
					path;
				if (total == value) {
					path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
					];
				} else {
					path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, +(alpha > 180), 1, x, y]
					];
				}
				return {
					path: path
				};
			};

			data.success(cv.main);

		},
		main: function(data) {
			var i,
				radius = 100,
				n = 25,
				height = $('#Tree').height();
			for(i in data.Employment) {
				(function() {
					var circle;
					circle = tree.path();
					n += 80;
					circle.attr({
						'fill': '#ff0',
						'stroke-width': '1px',
						'stroke': '#000',
						'arc': [480, height / 2, 10, 10, n]
					}).toBack();

					var test = 10,
						angle = Math.PI * 2 / (test - 1),
						dot;
					while(--test) {
						var x = Math.sin(angle * test) * (n + .5),
							y = Math.cos(angle * test) * (n + .5);
						x += 480;
						y += height / 2;
						dot = tree.circle(x, y, 5).attr('fill', '#00f').data('n', test);
						$(dot.node).bind({
							'click': function() {
								alert('you clicked moi');
							}
						});
						points.push(dot);
					}

					$(circle.node).bind({
						'mouseover': function(ev) {
							circle.animate({
								'fill': '#f00'
							}, 200);
						},
						'mouseout': function(ev) {
							circle.animate({
								'fill': '#ff0'
							}, 200);
						}
					});
				}());
			}
		}
	});
}());
>>>>>>> d04bd4617c7e33b0aa2e20871970c3bdb6b586c1
