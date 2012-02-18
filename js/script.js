(function() {
	var tree,
		treeStructure,
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
			'Interest': '#c4e4e9',
			'Aspiration': '#e5d6e5'
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

	function showTooltip(entry, ev) {
		var tt, i, html = '<div class="tooltip type-' + entry.Type.toLowerCase() + '"><dl>';
		for(i in entry) {
			if(i == 'Media' || i == 'Dot' || entry[i] == '') continue;
			html += '<dt>' + i + '</dt><dd>' + entry[i] + '</dd>';
		}
		html += '</dl></div>';
		tt = $(html);
		tt.css({
			left: ev.pageX + 20,
			top: ev.pageY - 100
		});
		return tt.hide().appendTo(document.body).fadeIn();
	}

	function circlePath(x, y, r) {
		var s = "M" + x + "," + (y-r) + "A"+r+","+r+",0,1,1,"+(x-0.1)+","+(y-r)+" z";
		return s;
	}

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
				height = $('#Tree').height(),
				years = {};

			treeStructure = data;

			// Get different years from the structure
			for(i in data.Cloud) {
				var item = data.Cloud[i],
					start = item.StartDate,
					year = start.split('-')[0];

				if(item.Type == 'Personal') {
					year = -1;
				}
				else if(item.Type == 'Aspiration') {
					year = Infinity;
				}
				else {
					year = +year;
				}

				if(!years[year]) {
					years[year] = [item]
				}
				else {
					years[year].push(item);
				}

			}

			// Sort years in a horrible fashion:
			var sortArr = [], newYears = {};
			for(i in years) {
				sortArr.push(i);
			}

			sortArr = sortArr.sort(function(a, b) { return +a > +b; });

			for(i in sortArr) {
				(function(year) {
					var circle;
					circle = tree.path().toFront();
					n += 44;
					circle.attr({
						'stroke-width': '8px',
						'stroke': '#e5e5e5',
						'arc': [480, height / 2, 10, 10, n]
					});
					if(sortArr[i] == Infinity) {
						circle.attr({
							'opacity': 0
						});
					}

					var imgDim = 130;
					tree.image('img/umadbro.png', 480 - imgDim / 2, height / 2 - imgDim / 2, imgDim, imgDim).toBack();

					var rand = Math.random();
					var angle = (Math.PI / 2 + Math.PI * rand) / year.length,
						k = 1, j;
					for(j in year) {
						(function(entry) {
						var dot,
							x = Math.sin(angle * k) * (n) + (480),
							y = Math.cos(angle * k) * (n) + (height / 2),
							normalColor = typeColours[entry.Type],
							hoverColor = Raphael.rgb2hsl(normalColor);

						hoverColor.l -= 0.3;
						hoverColor = Raphael.hsl2rgb(hoverColor);

						// Create the dot
						dot = tree.circle(x, y, 14).attr({
							'fill': typeColours[entry.Type],
							'stroke': 0
						});

						// Bind click, mouseover, mouseout etc.
						var tooltip;
						$(dot.node).bind({
							'click': function(ev) {
								if(state == STATES['Tree']) {
									showInfo();
								}
								$('#Info').text(entry.Employer + ' ' + entry.Responsibilities.join(' '));
							},
							'mouseover': function(ev) {
								tooltip = showTooltip(entry, ev);
								dot.animate({ fill: hoverColor }, 200);
								$(circle.node).trigger('mouseover');
							},
							'mouseout': function(ev) {
								tooltip.hide();
								dot.animate({ fill: normalColor }, 200);
								$(circle.node).trigger('mouseout');
							}
						});

						points.push(dot);

						dot.toFront();

						year[j].Dot = dot;

						++k;

						}(year[j]));
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
				}(years[sortArr[i]]));

			}

			var activeFilter;

			$('nav').delegate('a', 'click', function(ev) {
				ev.preventDefault();

				var i, link = $(this),
					filtered = cv.filter(link.attr('data-column'), link.attr('data-filter'), { includeFalse: 1 }),
					matched = filtered.match,
					nomatch = filtered.nomatch;

				for(i in matched) {
					matched[i].Dot.animate({ opacity: 1 }, 250);
				}
				for(i in nomatch) {
					nomatch[i].Dot.animate({ opacity: 0 }, 250);
				}

				if(activeFilter) {
					activeFilter.removeClass('active');
					if(activeFilter[0] == link[0]) {
						for(i in treeStructure.Cloud) {
							treeStructure.Cloud[i].Dot.animate({ opacity: 1 }, 250);
						}
						activeFilter = null;
						return;
					}
				}

				$('#NotificationArea').show().text('Now filtering by ' + link.attr('data-filter'));

				setTimeout(function() {
					$('#NotificationArea').fadeOut();
				}, 5000);

				activeFilter = link.addClass('active');


			});

		},
		filter: function(column, value, settings) {
			settings = settings || {};
			var i, item, results = [], nomatch = [];
			for(i in treeStructure.Cloud) {
				item = treeStructure.Cloud[i],
				test = settings.invert ? item[column] != value : item[column] == value;

				if(test) {
					results.push(item);
				}
				else if(settings.includeFalse) {
					nomatch.push(item);
				}

			}
			if(settings.includeFalse) {
				return {
					match: results,
					nomatch: nomatch
				}
			}
			return results;
		}
	});
}());
