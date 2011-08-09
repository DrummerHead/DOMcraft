// initial variables

var wW = $(window).width(),
    wH = $(window).height(),
    d,
    celld,
    size = 7, //according to taste
    cellsNum = size*size,
    cells,
    uM = 0, //margin-top in case portrait
    li = '<li></li>',
    appendHtml = '';


// sets a the number to which all sizes are calculated according to landscape vs portrait length; using this, sets size for cells

console.log('wW = '+wW+', wH = '+wH)

if (wW > wH) {
  d = wH;
} else {
  d = wW;
  uM = (wH - wW)/2;
}

//celld = Math.floor(d/size);
celld = d/size;
console.log('celld = '+celld);


// appends cells according to size variable

for (var i = 0; i < cellsNum; i++) {
  appendHtml += li;
}
console.log('appendHtml = '+appendHtml )

$('#w').append(appendHtml )

console.log('d = '+d);


//sets the size of the container and cells

$('li').css({width:celld,height:celld});
$('#w').css({width:d+1,marginTop:uM}); //+1 to avoid float falling
