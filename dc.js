// initial variables
var wW = $(window).width(),
    wH = $(window).height(),
    d,
    celld,
    size = 8, //according to taste
    cellsNum = size*size,
    cells,
    uM = 0, //margin-top in case portrait
    li = '<li></li>',
    appendHtml = '',
    rT; //rT is resize timeout


// function to set a the number to which all sizes are calculated according to landscape vs portrait length; using this, sets size for cells

// console.log('wW = '+wW+', wH = '+wH)

function sizeCells() {
  wW = $(window).width();
  wH = $(window).height();
  if (wW > wH) {
    d = wH;
    uM = 0;
  } else {
    d = wW;
    uM = (wH - wW)/2;
  }
  celld = d/size;
  //sets the size of the container and cells
  $('li').css({width:celld,height:celld});
  $('#w').css({width:d,marginTop:uM}); //+1 to avoid float falling - +1 was removed, only necessary for odd size
}

// appends cells according to size variable and does first draw

for (var i = 0; i < cellsNum; i++) {
  appendHtml += li;
}
$('#w').append(appendHtml)
sizeCells()

// cell redrawing/resizing on windows resize

$(window).resize(function(){
  clearTimeout(rT);
  rT = setTimeout(function(){
    sizeCells()
  }, 100)
});
