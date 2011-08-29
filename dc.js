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
    bPos, //break Pos
    rand, //random number
    pressed, //is the key pressed?
    dis, //distance of a border to the weapon
    look = 'd'; //where the character is looking at


// initial setting of cell count according to inital reading of size
if (wW > wH) {
  d = wH;
} else {
  d = wW;
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
  celld = Math.floor(d/size); // To standarize browser behaviour on subpixel cases
  d = celld*size;
  //calculating the distance of weapon container to the character for correct correlation
  dis = Math.round(celld*.625);
  // applies the size of container and cells
  $('style').remove();
  $('head').append('<style> li, .t { width: '+celld+'px; height:'+celld+'px; } #w { width:'+d+'px; margin-top:'+uM+'px; } .t { left:'+dis+'px; } </style>');

/*
  $('head').append('<style>
li,
.t {
  width: '+celld+'px;
  height:'+celld+'px;
}
#w {
  width:'+d+'px;
  margin-top:'+uM+'px;
}
.t {
  left:'+dis+'px;
}
</style>');
*/
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
        if(pressed){
          $('.u,.r,.d,.l').empty();
        }
        $('.c'+cPos).attr('class','c'+cPos);
        nPos = cPos + size;
        if (!$('.c'+nPos).hasClass('n')) {
          cPos = nPos;
        } 
      }
      $('.c'+cPos).attr('class','c'+cPos+' d');
      look = 'd';
      if(pressed){
        $('.u,.r,.d,.l').append('<div class="t"></div>')
      }
      break;

    case 'u':
      if (cPos>size) {
        if(pressed){
          $('.u,.r,.d,.l').empty();
        }
        $('.c'+cPos).attr('class','c'+cPos);
        nPos = cPos - size;
        if (!$('.c'+nPos).hasClass('n')) {
          cPos = nPos;
        } 
      }
      $('.c'+cPos).attr('class','c'+cPos+' u');
      look = 'u';
      if(pressed){
        $('.u,.r,.d,.l').append('<div class="t"></div>')
      }
      break;
      
    case 'r':
      if (cPos % size != 0) {
        if(pressed){
          $('.u,.r,.d,.l').empty();
        }
        $('.c'+cPos).attr('class','c'+cPos);
        nPos = cPos + 1;
        if (!$('.c'+nPos).hasClass('n')) {
          cPos = nPos;
        } 
      }
      $('.c'+cPos).attr('class','c'+cPos+' r');
      look = 'r';
      if(pressed){
        $('.u,.r,.d,.l').append('<div class="t"></div>')
      }
      break;

    case 'l':
      if (cPos % size != 1) {
        if(pressed){
          $('.u,.r,.d,.l').empty();
        }
        $('.c'+cPos).attr('class','c'+cPos);
        nPos = cPos - 1;
        if (!$('.c'+nPos).hasClass('n')) {
          cPos = nPos;
        } 
      }
      $('.c'+cPos).attr('class','c'+cPos+' l');
      look = 'l';
      if(pressed){
        $('.u,.r,.d,.l').append('<div class="t"></div>')
      }
      break;
  }
}

function action(e) {
  switch(e) {
    case 'b': //break, on pressing key
      if(!pressed){
        $('.u,.r,.d,.l').append('<div class="t"></div>')
        pressed = true;
      }
      switch(look) {
        case 'u':
          console.log('u');
          bPos = cPos - size;
          if ($('.c'+bPos).hasClass('n')) {
            $('.c'+nPos).hasClass('n')
          } 
          $('.c'+bPos).attr('class','c'+bPos);
          break
        case 'r':
          console.log('r');
          bPos = cPos + 1;
          if ($('.c'+bPos).hasClass('n')) {
            $('.c'+nPos).hasClass('n')
          } 
          $('.c'+bPos).attr('class','c'+bPos);
          break
        case 'd':
          console.log('d');
          bPos = cPos + size;
          if ($('.c'+bPos).hasClass('n')) {
            $('.c'+nPos).hasClass('n')
          } 
          $('.c'+bPos).attr('class','c'+bPos);
          break
        case 'l':
          console.log('l');
          bPos = cPos - 1;
          if ($('.c'+bPos).hasClass('n')) {
            $('.c'+nPos).hasClass('n')
          } 
          $('.c'+bPos).attr('class','c'+bPos);
          break
      }
      break;

    case 'r': //release breaking key
      $('.u,.r,.d,.l').empty();
      pressed = false;
      break;
  }
}

// keyboard triggering
function kDown(k) {

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

    case 32:
      action('b');
      break;
  }
}
function kUp(k) {

  switch (k.keyCode) {
    case 32:
      action('r');
      break;
  }
}

$(document).keydown(function(k){kDown(k)}).keyup(function(k){kUp(k)});

// giving onclick to iron for testing
$('.ir').click(function(){
  $(this).removeClass('ir n');
})
