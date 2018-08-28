window.onscroll = function() {stickyOnTop()};

var header = document.getElementById("entire-website-header");
var sticky = header.offsetTop;

function stickyOnTop() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
