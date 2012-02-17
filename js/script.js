(function() {
	var tree,
		points = [],
		state = 0,
		STATES = {
			'Tree': 0,
			'Info': 1,
		},
		typeColours = {
			'Personal': '#fac6cb',
			'Experience': '#d6cada',
			'Education':  '#d9f2f6',
			'Expertise': '#d93b78',
			'Media': '#fbd1cc',
			'Interests': '#c4e4e9',
			'Aspirations': '#e5d6e5'
		};

	// Animation functions
	function showInfo() {
		state = STATES['Info'];
		$('#Tree').animate({ top: '50%' }, 750);
		$('#Info').fadeIn();
	}

	function showTree() {
		state = STATES['Tree'];
		$('#Tree').animate({ top: '0%' }, 750);
		$('#Info').fadeOut();
	}

	function circlePath(x, y, r) {
		var s = "M" + x + "," + (y-r) + "A"+r+","+r+",0,1,1,"+(x-0.1)+","+(y-r)+" z";
		return s;
	}

	return (window.cv = {
		init: function() {
			var data = $.getJSON('js/someData.json');

			tree = Raphael('Tree', 960, '100%');

			data.success(cv.main);

		},
		main: function(data) {
			var i,
				radius = 100,
				n = 25,
				height = $('#Tree').height();
			for(i in data.Employment) {
				(function(item) {
					var circle;
					circle = tree.path(circlePath(480, height / 2, n));
					n += 80;
					circle.attr({
						'stroke-width': '6px',
						'stroke': '#e5e5e5'
					});

					var test = 10,
						angle = Math.PI * 2 / (test - 1);
					while(--test) {
						(function() {
						var dot,
							x = Math.sin(angle * test) * (n + .5),
							y = Math.cos(angle * test) * (n + .5),
							normalColor = typeColours[item.Type],
							hoverColor = Raphael.rgb2hsl(normalColor);

						hoverColor.l -= 0.2;

						hoverColor = Raphael.hsl2rgb(hoverColor);

						x += 480;
						y += height / 2;
						dot = tree.circle(x, y, 14).attr({
							'fill': typeColours[item.Type],
							'stroke': 0
						}).data('n', test);
						$(dot.node).bind({
							'click': function() {
								if(state == STATES['Tree']) {
									showInfo();
								}
								$('#Info').text(item.Employer + ' ' + item.Responsibilities.join(' '));
							},
							'mouseover': function() {
								dot.animate({ fill: hoverColor }, 200);
								$(circle.node).trigger('mouseover');
							},
							'mouseout': function() {
								dot.animate({ fill: normalColor }, 200);
								$(circle.node).trigger('mouseout');
							}
						});
						points.push(dot);
						}());
					}

					$(circle.node).bind({
						'mouseover': function(ev) {
							circle.animate({
								'stroke': '#ccc'
							}, 200, '<>');
						},
						'mouseout': function(ev) {
							circle.animate({
								'stroke': '#e5e5e5'
							}, 200, '<>');
						}
					});
				}(data.Employment[i]));
			}
		}
	});
}());
