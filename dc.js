// initial variables
var wW,
    wH,
    d,
    celld,
    size = 31, //according to taste
    cellsNum = size*size,
    cells,
    uM = 0, //margin-top in case portrait
    li = '',
    appendHtml = '',
    rT, //rT is resize timeout
    fPos, //first Pos
    cPos, //current Pos
    nPos; //new Pos

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
fPos = ((Math.round(size/2))*size)-(Math.floor(size/2))
$('.c'+fPos).attr('id','p');
cPos = fPos

// moving the character
function move(k) {
  $('.c'+cPos).removeAttr('id');

  switch (k.keyCode) {
    case 40:
    case 74:
      //console.log('down');
      if (cPos<(cellsNum+1-size)) {
        cPos = cPos + size;
      }
      break;

    case 38:
    case 75:
      //console.log('up');
      if (cPos>size) {
        cPos = cPos - size;
      }
      break;

    case 39:
    case 76:
      //console.log('right');
      if (cPos % size != 0) {
        cPos++;
      }
      break;

    case 37:
    case 72:
      //console.log('left');
      if (cPos % size != 1) {
        cPos--;
      }
      break;
  }
  $('.c'+cPos).attr('id', 'p');
}

$(document).keydown(function(k){move(k)});
