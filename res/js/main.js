addListener('load', window, function() {
	/**Refactor clearblock functions*/
	var list = document.querySelectorAll(".ei-clearblock[data-src], .ei-clearblock-parallax[data-src]");

	for (var i = 0; i < list.length; i++) {
		var url = list[i].getAttribute('data-src');
		list[i].style.backgroundImage = "url('" + url + "')";
	}

	/**Add website content*/
	var addr = "euclidio";
	var title = document.getElementById('title');
	var info = document.getElementById('info');

	if (title) {
		var e = document.createElement('h1');
		e.innerHTML = "Forever United Geometry Awesomeness";
		title.appendChild(e);
	}

	if (info) {
		var e = document.createElement('p');
		e.innerHTML = "Hello. I am copyrighted. Just ask my owner. :) Alright? Good. That should deter most of you. If you really want to know what is going on, please refer to Section 9 Article 2 for the proper legal notice on the official webpage of chubbycat.com. Thank you.";
		info.appendChild(e);
	}

	/**Add navigation bar content*/
	var navlist = document.getElementById('navbar-content');
	navlist.appendChild(createListItemLink('Proofs', addr + '/00_proofs/00_index.html', true));
	navlist.appendChild(createListItemLink('Neutral Geometry', addr + '/01_neutral_geometry/00_index.html', true));
	navlist.appendChild(createListItemLink('Euclidean Geometry', addr + '/02_euclidean_geometry/00_index.html', true));
	navlist.appendChild(createListItemLink('Analytic Geometry', addr + '/03_analytic_geometry/alt.html', true));
	navlist.appendChild(createListItemLink('Inversive Geometry', addr + '/04_inversive_geometry/alt.html', true));
	navlist.appendChild(createListItemLink('Hyperbolic Geometry', addr + '/05_hyperbolic_geometry/alt.html', true));


	var sidelist = document.getElementById('sidebar-content');
	sidelist.appendChild(createListItemHeadLink('Proofs', addr + '/00_proofs/00_index.html'));
	sidelist.appendChild(createListItemLink('Direct Proofs', addr + '/00_proofs/01_direct_proofs.html'));
	sidelist.appendChild(createListItemLink('Exhaustion', addr + '/00_proofs/02_exhaustion.html'));
	sidelist.appendChild(createListItemLink('Induction', addr + '/00_proofs/03_induction.html'));
	sidelist.appendChild(createListItemLink('Contradiction', addr + '/00_proofs/04_contradiction.html'));
	sidelist.appendChild(createListItemLink('Contrapositive', addr + '/00_proofs/05_contrapositive.html'));
	sidelist.appendChild(createListItemHeadLink('Neutral Geometry', addr + '/01_neutral_geometry/00_index.html'));
	sidelist.appendChild(createListItemLink('', addr + '/01_neutral_geometry/01_affine_axioms.html'));
	sidelist.appendChild(createListItemLink('Basic Theorems in Affine Geometry', addr + '/01_neutral_geometry/02_affine_theorems.html'));
	sidelist.appendChild(createListItemLink('Euclidean Postulates', addr + '/01_neutral_geometry/03_euclidean_postulates.html'));
	sidelist.appendChild(createListItemHeadLink('Triangles and Proportions(INDEV)', addr + '/'));
	sidelist.appendChild(createListItemHeadLink('Polygons(INDEV)', addr + '/'));
	sidelist.appendChild(createListItemHeadLink('Circles(INDEV)', addr + '/'));
	//sidelist.appendChild(createListItemHeadLink('Cartesian Plane', ''));
	//.appendChild(createListItemHeadLink('Trigonometric Functions', ''));
	//sidelist.appendChild(createListItemHeadLink('Trigonometric Laws', ''));
	//sidelist.appendChild(createListItemHeadLink('Hyperbolic Functions', ''));
	//sidelist.appendChild(createListItemHeadLink('Conic Sections', ''));
});
