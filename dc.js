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
for (var i = 1; i <= cellsNum; i++) {
  appendHtml += "<li class='c"+i+"'></li>";
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

// First drawing of the character in the middle
cPos = ((Math.round(size/2))*size)-(Math.floor(size/2))
$('.c'+cPos).addClass('d');

// generic movement function
function move(e) {
  switch (e) {
    case 'd':
      if (cPos<(cellsNum+1-size)) {
        $('.c'+cPos).attr('class','c'+cPos);
        cPos = cPos + size;
      }
      $('.c'+cPos).attr('class','c'+cPos+' d');
      break;

    case 'u':
      if (cPos>size) {
        $('.c'+cPos).attr('class','c'+cPos);
        cPos = cPos - size;
      }
      $('.c'+cPos).attr('class','c'+cPos+' u');
      break;
      
    case 'r':
      if (cPos % size != 0) {
        $('.c'+cPos).attr('class','c'+cPos);
        cPos++;
      }
      $('.c'+cPos).attr('class','c'+cPos+' r');
      break;

    case 'l':
      if (cPos % size != 1) {
        $('.c'+cPos).attr('class','c'+cPos);
        cPos--;
      }
      $('.c'+cPos).attr('class','c'+cPos+' l');
      break;
  }
}

// keyboard triggering
function moveKey(k) {

  switch (k.keyCode) {
    case 40:
    case 74:
      //console.log('down');
      move('d');
      break;

    case 38:
    case 75:
      //console.log('up');
      move('u');
      break;

    case 39:
    case 76:
      //console.log('right');
      move('r');
      break;

    case 37:
    case 72:
      //console.log('left');
      move('l');
      break;
  }
}

$(document).keydown(function(k){moveKey(k)});
