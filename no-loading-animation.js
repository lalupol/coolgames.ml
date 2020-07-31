;(function(){
  var c = document.getElementById('loadNoAnim');
  function addAnim() {
      c.classList.add('animated')
      // remove the listener, no longer needed
      c.removeEventListener('mouseover', addAnim);
  };

  // listen to mouseover for the container
  c.addEventListener('mouseover', addAnim);
})();