document.onscroll = function() {
    var topbar  = document.querySelector(".topbar");
    var firstPage = document.querySelector(".firstPage");
    var topbarPosition = topbar.getBoundingClientRect();
    var firstPagePosition = firstPage.getBoundingClientRect();
    var firstPageHeight = firstPage.offsetHeight;
    console.log(firstPagePosition.y);
    if (topbarPosition.y <= 0) {
        topbar.classList.add("fixed");
    }

    if(firstPagePosition.y >= -firstPageHeight ) {
        topbar.classList.remove("fixed");
    }

}