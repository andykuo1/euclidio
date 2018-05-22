function toggleHamburger(element) {
	return element.classList.toggle('ei-hamburger-state');
}

function onLoad()
{
	var hamburgers = document.getElementsByClassName('ei-hamburger');

	for(var i = 0; i < hamburgers.length; ++i)
	{
		var hamburger = hamburgers[i];
		var bar1 = document.createElement('div');
		var bar2 = document.createElement('div');
		var bar3 = document.createElement('div');
		bar1.className = 'ei-hamburger-bar-1';
		bar2.className = 'ei-hamburger-bar-2';
		bar3.className = 'ei-hamburger-bar-3';
		hamburger.appendChild(bar1);
		hamburger.appendChild(bar2);
		hamburger.appendChild(bar3);
	}
}

addListener('load', window, onLoad);