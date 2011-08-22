// initial variables
var wW = $(window).width(),
    wH = $(window).height(),
    d,
    celld,
    size,
    cellsNum,
    cells,
    uM, //margin-top in case portrait
    li,
    appendHtml = '',
    rT, //rT is resize timeout
    cPos, //current Pos
    nPos, //new Pos
    rand; //random number


// initial setting of cell count according to inital reading of size
if (wW > wH) {
  d = wH;
  //console.log(wH);
} else {
  d = wW;
  //console.log(wH);
}

// size set assuming that a 64px cell looks good (browsers antialias the pixels)
if (d < 576) {
  size = 8;

} else if (d < 704) {
  size = 10;

} else if (d < 832) {
  size = 12;

} else if (d < 960) {
  size = 14;

} else if (d < 1088) {
  size = 16;

} else if (d < 1216) {
  size = 18;

} else {
  size = 20;
}
//console.log(size);
cellsNum = size*size;


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
  celld = Math.round(d/size); // To standarize browser behaviour on subpixel cases
  d = celld*size;
  // applies the size of container and cells
  $('li').css({width:celld,height:celld});
  $('#w').css({width:d,marginTop:uM});
}

// appends cells according to size variable and does first draw
for (var i = 1; i <= cellsNum; i++) {
  rand = Math.random();
  if (rand > .9) {
    appendHtml += "<li class='c"+i+" n ir'></li>";
  } else if (rand > .2) {
    appendHtml += "<li class='c"+i+" n ro'></li>";
  } else {
    appendHtml += "<li class='c"+i+"'></li>";
  }
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
        cNew = cPos + size;
        if (!$('.c'+cNew).hasClass('n')) {
          cPos = cNew;
        } 
      }
      $('.c'+cPos).attr('class','c'+cPos+' d');
      break;

    case 'u':
      if (cPos>size) {
        $('.c'+cPos).attr('class','c'+cPos);
        cNew = cPos - size;
        if (!$('.c'+cNew).hasClass('n')) {
          cPos = cNew;
        } 
      }
      $('.c'+cPos).attr('class','c'+cPos+' u');
      break;
      
    case 'r':
      if (cPos % size != 0) {
        $('.c'+cPos).attr('class','c'+cPos);
        cNew = cPos + 1;
        if (!$('.c'+cNew).hasClass('n')) {
          cPos = cNew;
        } 
      }
      $('.c'+cPos).attr('class','c'+cPos+' r');
      break;

    case 'l':
      if (cPos % size != 1) {
        $('.c'+cPos).attr('class','c'+cPos);
        cNew = cPos - 1;
        if (!$('.c'+cNew).hasClass('n')) {
          cPos = cNew;
        } 
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
