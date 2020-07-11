var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var tick = setInterval(frame, 16);
var i = 4.6;
var j = -0.5;
var l = 0;
const gpu = new GPU();

const gen_torus = gpu.createKernel(function(width, height, i, j,l) {
    var space = height/6;
    
    if (width < height)
	space = width/6;
    
    var t = this.thread.x/20;

    var x = space*((1+Math.pow(Math.sin(t/i+l),2))*cos(t)+cos(j*t+.75-l));
    var y = space*((1+Math.pow(Math.sin(t/i+l),2))*sin(t)+sin(j*t+.75+l));

    x += (width/2);
    y += (height/2);
    
    return 4*(Math.trunc(x)+Math.trunc(y)*width);
})
      .setOutput([15000])

function frame() {
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    imageData = context.createImageData(canvas.width, canvas.height);
    
    var torus = gen_torus(canvas.width, canvas.height, i, j, l);
    
    for (var location = 0; location < torus.length; location++)
	imageData.data.set([0, 0, 0, 225], torus[location]);

    j += 0;
    l += 0.005;
    
    context.putImageData(imageData, 0,0);
}
