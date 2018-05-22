function openModal(id) {
	var modal = document.getElementById(id);
	modal.style.visibility = "visible";
	modal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";

	for (var i = 1; i < modal.childNodes.length; ++i) {
		var child = modal.childNodes[i];
		child.style.opacity = 1;
	}
}

function closeModal(id) {
	var modal = document.getElementById(id);
	modal.style.visibility = "hidden";
	modal.style.backgroundColor = "rgba(0, 0, 0, 0)";

	for (var i = 1; i < modal.childNodes.length; ++i) {
		var child = modal.childNodes[i];
		child.style.opacity = 0;
	}
}

function onClick(event)
{
	if (event.target.classList.contains('ei-modal'))
	{
		closeModal(event.target.getAttribute('id'));
	}
}

addListener('click', window, onClick);