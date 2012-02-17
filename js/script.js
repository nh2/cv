<<<<<<< HEAD
/* Author:

*/





=======
(function() {
	var tree;
	return (window.cv = {
		init: function() {
			var data = $.getJSON('js/someData.json');

			tree = Raphael('Tree', 960, 960);

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
			var i, radius = 100, n = 25;
			for(i in data.Employment) {
				(function() {
					var circle;
					circle = tree.path();
					n += 100;
					circle.attr({
						'fill': '#ff0',
						'stroke-width': '1px',
						'stroke': '#000',
						'arc': [480, 480, n, n, n]
					}).toBack();

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
