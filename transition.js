var tick = setInterval(frame, 1000);

var getComputedValue = function (container, cssProp) {
    return parseInt(window.getComputedStyle(container, null).getPropertyValue(cssProp).split('px')[0]);
};

function frame() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    var sidebar_width = getComputedValue(sidebar, 'width');
    var content_width = getComputedValue(content, 'width');

    if (sidebar_width == content_width) {
	console.log('1 column');
    }
}
