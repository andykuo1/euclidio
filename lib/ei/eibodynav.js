function isActiveFile(link)
{
	var path = location.pathname;
	var filedir = path.substring(0, path.lastIndexOf('/'));
	filedir = filedir.substring(filedir.lastIndexOf('/') + 1);

	var linkdir = link.substring(0, link.lastIndexOf('/'));
	linkdir = linkdir.substring(linkdir.lastIndexOf('/') + 1);

	return filedir == linkdir;
}

function createListItemHead(text) {
	var listitem = document.createElement('li');
	listitem.innerHTML = "<h1>" + text + "</h1>";
	return listitem;
}

function createListItemLink(text, link, canactive) {
	var listitem = document.createElement('li');

	if (canactive && isActiveFile(link))
	{
		listitem.className = "ei-active";
	}

	listitem.innerHTML = "<a href='" + link + "'" + ">" + text + "</a>";
	return listitem;
}

function createListItemHeadLink(text, link, canactive) {
	var listitem = document.createElement('li');

	if (canactive && isActiveFile(link))
	{
		listitem.className = "ei-active";
	}

	listitem.innerHTML = "<h2><a href='" + link + "'" + ">" + text + "</a></h2>";
	return listitem;
}

function toggleSideBar(element)
{
	toggleHamburger(element);
	var sidebar = document.getElementById('sidebar');
	var main = document.getElementById('main');
	var info = document.getElementById('info');

	if (element.classList.toggle('ei-sidebar-state'))
	{
		sidebar.style.visibility = 'visible';
		sidebar.style.left = '0';

		main.style.marginLeft = '250px';
		main.style.transition = 'margin-left 0.4s';

		info.style.marginLeft = '250px';
		info.style.transition = 'margin-left 0.4s';
	}
	else
	{
		sidebar.style.visibility = 'hidden';
		sidebar.style.left = '-250px';

		main.style.marginLeft = '0';
		main.style.transition = 'margin-left 0.4s';

		info.style.marginLeft = '0';
		info.style.transition = 'margin-left 0.4s';
	}
}

function onScroll() {
	var title = document.getElementById("title");

	var navbar = document.getElementById("navbar");
	var sidebar = document.getElementById("sidebar");
	var sidebar_content = document.getElementById("sidebar-content");
	var main = document.getElementById("main");

	var titleHeight = title.offsetHeight + 80;
	var navbarHeight = navbar.offsetHeight + 30;
	var scroll = document.body.scrollTop + document.documentElement.scrollTop;

	if (scroll > titleHeight) {
		navbar.style.position = "fixed";
		navbar.style.top = "0";

		sidebar.style.top = "0";
		sidebar_content.style.bottom = "0";

		main.style.paddingTop = (navbarHeight) + "px";
	} else {
		navbar.style.position = "relative";

		sidebar.style.top = (titleHeight - scroll) + "px";
		sidebar_content.style.bottom = (titleHeight - scroll) + "px";

		main.style.paddingTop = (20) + "px";
	}
}

addListener('scroll', window, onScroll);