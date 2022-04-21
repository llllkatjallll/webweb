var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

showColor ();
  
  function showColor (){
      
   
    const imgsrc='./images/200w_gewebemuster-19582.jpg';
    console.log(imgsrc);
    
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgsrc;
    //img.onerror = () => location.reload();
    img.onload = function() {
    console.log(img.width);

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //const imageData = ctx.getImageData(0, 0, 20, 30);
    const data = imageData.data;
    const colors = new Map();
    console.log(colors);
    for (var i = 0; i < data.length; i += 4) {
       // rgb(201, 76, 76)
       const color=Math. round(data[i]/10)*10 +','+Math.round(data[i+1]/10)*10+','+Math.round(data[i+2]/10)*10;
       console.log(color);
       if (colors.has(color)) {
            colors.set(color,colors.get(color)+1);
       }
         else {
          colors.set(color,1);
          //console.log(colors);
         }
      
    }
    console.log(colors);
    const mapSort1 = new Map([...colors.entries()].sort((a, b) => b[1] - a[1]));
    const hellDunkel= new Map([...colors.entries()].sort((a, b) => b[1] - a[1]));


    let list="";
    let min=255,minS,maxS;
    let max=0;
    mapSort1.forEach((value, key) => { 

        const sumrgb=key.split(',').reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
        if (sumrgb>max) {max=sumrgb;maxS='<li style="background-color: rgb('+key+')">max: '+value+' </li>';}
        if (sumrgb<min) {min=sumrgb;minS='<li style="background-color: rgb('+key+')">min: '+value+' </li>';}

        list+='<li style="background-color: rgb('+key+')">'+value+'</li>';
    
    } )
    document.getElementById("colors").innerHTML="<ul>"+minS+"   "+maxS+" "+list+"</ul>";
   // document.getElementById("colors").innerHTML+=;
    //console.log(list);
    }
        
  }
