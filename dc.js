// initial variables
var wW,
    wH,
    d,
    celld,
    size = 8, //according to taste
    cellsNum = size*size,
    cells,
    uM = 0, //margin-top in case portrait
    li = '',
    appendHtml = '',
    rT, //rT is resize timeout
    firstPos;

// function to set a the number to which all sizes are calculated according to landscape vs portrait length; using this, sets size for cells
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
  $('#w').css({width:d+1,marginTop:uM}); //+1 to avoid float falling - +1 was removed, only necessary for odd size
}

// appends cells according to size variable and does first draw
for (var i = 0; i < cellsNum; i++) {
  appendHtml += "<li class='c"+(i+1)+"'></li>";
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

// Drawing of the character
// firstPos = (cellsNum/2)+((size/2)+1);
firstPos = ((Math.round(size/2))*size)-(Math.floor(size/2))
$('.c'+firstPos).attr('id','p');

