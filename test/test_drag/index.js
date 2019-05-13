var ul = document.getElementById('piclist');

ul.addEventListener('slip:beforereorder', function(e){
  if (/demo-no-reorder/.test(e.target.className)) {
    e.preventDefault();
  }
}, false);

ul.addEventListener('slip:beforeswipe', function(e){
  if (e.target.nodeName == 'INPUT' || /no-swipe/.test(e.target.className)) {
    e.preventDefault();
  }
}, false);

ul.addEventListener('slip:beforewait', function(e){
  if (e.target.className.indexOf('instant') > -1) e.preventDefault();
}, false);

/*ul.addEventListener('slip:afterswipe', function(e){
  e.target.parentNode.appendChild(e.target);
}, false);*/

ul.addEventListener('slip:reorder', function(e){
  e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
  return false;
}, false);

new Slip(ul);

var items = document.querySelectorAll(".handle");
for (var i=0; i < items.length; i++) {
  var item = items[i]
  item.addEventListener('mousedown', function(){
    this.style.cursor = "-webkit-grabbing";
    this.style.cursor = "-moz-grabbing";
  });
  item.addEventListener('mouseover', function(){
    this.style.cursor = "-webkit-grab";
    this.style.cursor = "-moz-grab";
  });
  item.addEventListener('mouseup', function(){
    this.style.cursor = "-webkit-grab";
    this.style.cursor = "-moz-grab";
  });
}