
        let webstuhl = document.getElementById('webstuhl');
        let ctx = webstuhl.getContext('2d');
        let zelleh=(webstuhl.height-50)/24;
        let zelleb=(webstuhl.width)/24;
        let schuss = 40;
        let label=30; // offset für Label
        let level=1;

        let message = document.getElementById('message');
       
        let schuss_fertig=false;
        let kettfaedeneinlegen_manuell=true;
        let schaltery=1;
        let Garn={Schussfaden:'#F19D0E', Kettfaden:'#FDBC22'};
        let lochkarten=["010101010101010101010101",
                        "101010101010101010101010"];
        let LochkartenLager=[
            {bindung: "Leinwandbindung",LochkartenStapel:        ["010101010101010101010101",
                                                                 "101010101010101010101010"]},
            {bindung: "Glatter Panama",LochkartenStapel:         ["110011001100110011001100",
                                                                 "110011001100110011001100",
                                                                 "001100110011001100110011",
                                                                 "001100110011001100110011"]},
            {bindung: "Gemischter Panama b",LochkartenStapel:    ["100010001000100010001000",
                                                                 "0111011101110111011101110",
                                                                 "0111011101110111011101110",
                                                                 "0111011101110111011101110"]},
            {bindung: "Gemischter Panama c",LochkartenStapel:    ["1110100011101000111010001",
                                                                 "1110100011101000111010001",
                                                                 "1110100011101000111010001",
                                                                 "0001011100010111000101110",
                                                                 "1110100011101000111010001",
                                                                 "0001011100010111000101110",
                                                                 "0001011100010111000101110",
                                                                 "0001011100010111000101110"]},                                                     
            {bindung: "Kettköper mit Z-Grat",LochkartenStapel:   ["0110110110110110110110110",
                                                                 "1101101101101101101101101",
                                                                 "1011011011011011011011011"]},
            {bindung: "Querzickzackköper",LochkartenStapel:      ["010111010101110101011101",
                                                                 "001010100010101000101010",
                                                                 "100101001001010010010100",
                                                                 "010010010100100101001001",
                                                                 "101000101010001010100010",
                                                                 "110101011101010111010101",
                                                                 "011010110110101101101011",
                                                                 "101101101011011010110110"]}                                                 
        ];
         //bilder_links hinzufügen
        let MusterLager=[
              {bezeichnung:"Gewebemuster 3034",Kettfaden:'#FDBC22',Schussfaden:'#F19D0E',muster:'gewebemuster-3034-30101.jpg',aktiv:'active'},  
              {bezeichnung:"Gewebemuster 4309",Kettfaden:'#B2050B',Schussfaden:'#5E0302',muster:'gewebemuster-4309-28010.jpg',aktiv:''},
              {bezeichnung:"Gewebemuster Donnar 18",Kettfaden:'#8A693E',Schussfaden:'#612C24',muster:'gewebemuster-donnar-18-34145.jpg',aktiv:''},
              {bezeichnung:"Gewebemuster Dohna 3, 4397 A",Kettfaden:'#310400',Schussfaden:'#8D0400',muster:'gewebemuster-dohna-3-4397-a-33469.jpg',aktiv:''},
              {bezeichnung:"Gewebemuster Putbus 3, 4537 B",Kettfaden:'#561C0E',Schussfaden:'#A78349',muster:'gewebemuster-putbus-3-4537-b-33457.jpg',aktiv:''}        
        ]

        
        
        let Musterlager = document.getElementById('Musterlager');
        let i=0;
        Musterlager.innerHTML = MusterLager.map(function(v){
            return '   <div id="'+i++ +'" class="carousel-item '+v.aktiv+'">'
                   +'     <h2>'+v.bezeichnung+'</h2>'
                   +'     <div class="row" style="height:50px; background-image: url(images/'+v.muster+')">'
                   +'     </div>'
                   +'    <div class="row">'
                   +'             <div class="col farbwahl " style="background-color:'+v.Kettfaden+';height: 30px;margin:5px 5px 0 0"> </div>'
                   +'             <div class="col farbwahl " style="background-color:'+v.Schussfaden+';height: 30px;margin:5px 0 0 0"> </div>'
                   +'     </div>'
                   +' </div>';
        }).join('');
       
       
        let Lochkartenlager = document.getElementById('Lochkartenlager');
        let n=0;
        Lochkartenlager.innerHTML = LochkartenLager.map(function(v){
            return '   <div id="LK'+n++ +'" class="carousel-item ">'
                   +'     <h2>'+v.bindung+'</h2>'
                   +' </div>';
        }).join('');
        document.getElementById('LK0').classList.add("active"); 

        document.getElementById('farbwahl').addEventListener('slid.bs.carousel',function (){Farbwechsel()},false);
        function Farbwechsel(){
            const aktiv=  Musterlager.getElementsByClassName('active')[0].id;
            if (aktiv<MusterLager.length)
           {
                    Garn.Kettfaden=MusterLager[Musterlager.getElementsByClassName('active')[0].id].Kettfaden;
                    Garn.Schussfaden=MusterLager[Musterlager.getElementsByClassName('active')[0].id].Schussfaden;
            }
            else{
                //Farbe selber gewählt
                farbwahl('Kettfaden');
                farbwahl('Schussfaden');
            }
        };
    
        document.getElementById('bindung').addEventListener('slid.bs.carousel',function (){tauscheLochkarten()},false);
        
        function tauscheLochkarten(){
            const LKID=Lochkartenlager.getElementsByClassName('active')[0].id.replace('LK','');
           if (LKID<LochkartenLager.length)
                    lochkarten=LochkartenLager[LKID].LochkartenStapel;
        }

        let aktiveLochkarte=0;
        let accelerationX =0;
        let accY=0;
        //screen.orientation.lock("portrait");
        

function freigabe() {  // bei mir (android) richtet der code keine Schaden an. bei ios soll der user vorher aktiv sein. Benötigen wir offenbar 
// doch einen Startbutton - das kann ich aber nicht testen...

document.getElementById('freigabe').style.setProperty('display', 'none', 'important');
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
              .then(permissionState => {
                if (permissionState === 'granted') {
                  window.addEventListener('devicemotion', (event) => {
                      let accelerationX = event.accelerationIncludingGravity.x;   
                    bewege_schuetze(accelerationX);
                    accY = event.accelerationIncludingGravity.y;   console.log(accelerationX);});
                }
              })
              .catch(console.error);
          } else {
            // handle regular non iOS 13+ devices
            window.ondevicemotion = function(event) {   
            let accelerationX = event.accelerationIncludingGravity.x;   
            bewege_schuetze(accelerationX);
            accY = event.accelerationIncludingGravity.y;   console.log(accelerationX);
            }
          }
}

        ctx.fillStyle = '#eee';
        ctx.fillRect(0, 0, webstuhl.width, webstuhl.height-label);

        kettfaedeneinlegen();
        document.getElementById('versandb').addEventListener('click',function(){shareCanvas()}, false);
        document.getElementById('next-level').addEventListener('click',function(){kettfaedeneinlegen()}, false);
        document.getElementById('neustart').addEventListener('click',function(){kettfaedeneinlegen()}, false);
  
         
        function farbwahl(faden){ // aus colorpicker
            const Garnfarbe=document.getElementById('Farbregal'+faden).value;
            Garn[faden]=Garnfarbe;
         //   document.getElementById('level').innerHTML='<h1>TEST '+Garnfarbe+' </h1>';
        }
       
        async function kettfaedeneinlegen() {
           document.getElementById('level-state').innerHTML='<h1>Level '+level+' </h1>';
           schuss_fertig=false;//eigentlich Kettfertig =false
           document.getElementById("versandb").style.visibility="hidden";
           //message verstecken
           hideMessage();
           ctx.fillStyle = "rgba(224,223,221,1)"; //label abschneiden
           ctx.fillRect(webstuhl.width-50,webstuhl.height-label,24,label);
           ctx.fillStyle = '#ccc';
           ctx.fillRect(0, 0, webstuhl.width, webstuhl.height-label);
           schuss = 40;
           //Kettfäden 
           for(let x=0;x<webstuhl.width;x+=zelleb){ 
               await Sleep(20);
                    if (kettfaedeneinlegen_manuell && accY){    
                        schaltery=true;
                        let yy=accY;
                        while (schaltery) {
                            await Sleep(20);
                            if ((Math.abs(yy-accY))>2)   schaltery=false;
                        }
                    }
                    for(let y=0;y<webstuhl.height-label;y+=zelleh){
                            ctx.fillStyle = Garn['Kettfaden'];
                            ctx.fillRect(x,y,zelleb-1,zelleh);
                    }
           }
           schuss_fertig=true;
           fertig('Kettfaeden einlegen');
        }
        


        function zieheLochkarte(){
            let lochkarte=lochkarten[aktiveLochkarte];
            if (aktiveLochkarte<lochkarten.length-1) aktiveLochkarte++;
              else aktiveLochkarte=0;
              
            return lochkarte;
        }
        async function schuss_links(farbe){
            
            if (schuss_fertig && (((schuss/10) % 2===0) )){
                schuss_fertig=false;
                lochkarte=zieheLochkarte();
                y=webstuhl.height-schuss;
                schuss+=zelleh;
                for(let x=0;x<webstuhl.width;x+=zelleh){
                    await Sleep(20);
                    if (lochkarte[x/zelleh]==='1'){
                       ctx.fillStyle = farbe;
                       ctx.fillRect(x,webstuhl.height-schuss,zelleh,zelleh-1);
                    }
            }
            schuss_fertig=true;
            }
        }
        async function schuss_rechts(farbe){
            console.log(schuss_fertig);
            if (schuss_fertig && schuss>(webstuhl.height-20) ) {schuss_fertig=false; fertig('Schussfaden'); labelAnheften(); versand(); }
            
            if (schuss_fertig && ((schuss/10) % 2===1)){
                schuss_fertig=false;
                lochkarte=zieheLochkarte();
                y=webstuhl.height-schuss;
                schuss+=zelleh;
                for(let x=webstuhl.width;x>=0;x-=zelleh){
                    await Sleep(20);
                        if (lochkarte[x/zelleh]==='1'){
                        ctx.fillStyle = farbe;
                        ctx.fillRect(x,webstuhl.height-schuss,zelleh,zelleh-1);
                        }
                    }
                schuss_fertig=true;
                }
            }
        
        function bewege_schuetze(accX){
            if (accX>0 && Math.abs(accX)>1) {schuss_rechts(Garn["Schussfaden"]);}
              else {schuss_links(Garn["Schussfaden"]);}
        }
        
        function labelAnheften(){
            //Sticken in Handarbeit
            const x=webstuhl.width-50;
            let y=webstuhl.height-label;
            ctx.fillStyle = Garn.Schussfaden;
            ctx.fillRect(webstuhl.width-50,webstuhl.height-label,24,label);
            ctx.fillStyle = Garn.Kettfaden;
            ctx.fillRect(webstuhl.width-49,webstuhl.height-label,22,label-1);
            ctx.fillStyle = Garn.Schussfaden;
            y-=5;
            ctx.fillRect(x+3,y+15,2,2);
            ctx.fillRect(x+5,y+17,2,2);
            ctx.fillRect(x+7,y+19,2,2);
            ctx.fillRect(x+9,y+17,2,2);
            ctx.fillRect(x+11,y+15,2,2);
            ctx.fillRect(x+13,y+17,2,2);
            ctx.fillRect(x+15,y+19,2,2);
            ctx.fillRect(x+17,y+17,2,2);
            ctx.fillRect(x+19,y+15,2,2);
            y+=8;
            ctx.fillRect(x+3,y+15,2,2);
            ctx.fillRect(x+5,y+17,2,2);
            ctx.fillRect(x+7,y+19,2,2);
            ctx.fillRect(x+9,y+17,2,2);
            ctx.fillRect(x+11,y+15,2,2);
            ctx.fillRect(x+13,y+17,2,2);
            ctx.fillRect(x+15,y+19,2,2);
            ctx.fillRect(x+17,y+17,2,2);
            ctx.fillRect(x+19,y+15,2,2);
        }


        //Export? Versand??
        function versand(){
            document.getElementById("versandb").style.visibility="visible";
        }

        async function shareCanvas() {
            const dataUrl = webstuhl.toDataURL();
            const blob = await (await fetch(dataUrl)).blob();
            const filesArray = [
              new File(
                [blob],
                'muster.png',
                {
                  type: blob.type,
                  lastModified: new Date().getTime()
                }
              )
            ];
            const shareData = {
              files: filesArray,
            };
            navigator.share(shareData);
          }


          function erstelleNeueLochkarte(){
            let neueLochkarte=document.getElementById("neueLochkarten");
            let ausgabe="";
            for(let i=0;i<24;i++){
                ausgabe+='<button style="background-color:#999" class="lk_loch" id="lkl'+i+'" > </button>';
            }
            neueLochkarte.innerHTML=ausgabe;
            for(let i=0;i<24;i++){
                document.getElementById("lkl"+i).addEventListener('click',function(){
                    this.style.backgroundColor="#fff";
                });
            }
        }
        
        function speichernLochkarte(){
            let neueLochkarte="";
            for(let i=0;i<24;i++){
                console.log(document.getElementById("lkl"+i).style.backgroundColor);
              if(document.getElementById("lkl"+i).style.backgroundColor==="rgb(255, 255, 255)") 
                 neueLochkarte+="1";
                else
                neueLochkarte+="0";
             }
            console.log(neueLochkarte);
           
            //neue Lochkarte komplementär abspeichern
            lochkarten=[neueLochkarte,lochkartenInvert(neueLochkarte)];


        }
        function lochkartenInvert(lk){
            let lkn="";
            for(let i=0;i<24;i++){
                if(lk[i]==="0") 
                lkn+="1";
                else
                lkn+="0";
            }
            return lkn;
        }


        function Sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
        }
        function fertig(aktion){
            window.navigator.vibrate(200);
            
            if (aktion==='Schussfaden')
            {
                if (level===5  )  
                {
                        document.getElementById('info').style.display = "none";
                        document.getElementById('level').innerHTML='<h1>Glückwunsch</h1><p>Meister der Webmuster!</p>';
                        //wird später nicht mehr überschrieben
                }
               if (level===4  )  
                {
                        document.getElementById('info').style.display = "none";
                        document.getElementById('level').innerHTML='<h1>Glückwunsch</h1><p>Nun kannst du selber Muster entwerfen.</p>';
                        Lochkartenlager.getElementsByClassName('active')[0].classList.remove('active');
                        Lochkartenlager.innerHTML +='   <div id="LK_selber" class="carousel-item active" >'
                        +'     <h2>Lochkarten selber stanzen</h2>'
                        +'    <div id="lochkarten">'
                        +'      <div id="neueLochkarten">'
                        +'      </div>'
                        +'      <button class="btn btn-light mx-auto" id="saveLK" >anwenden</button>'
                        +'</div>';
                                                
                        erstelleNeueLochkarte();
                        document.getElementById('saveLK').addEventListener('click',function(){speichernLochkarte()}, false);
                        
                }
                if (level===3 )  
                {
                        document.getElementById('info').style.display = "none";
                        document.getElementById('level').innerHTML='<h1>Glückwunsch</h1><p>Nun kannst du verschiedene Bindungen wählen.</p>';
                        
                        //Farbmuster freigeben
                        document.getElementById('bindung').style.display='block';
                        
                }
                if (level===2 )
                {
                        document.getElementById('info').style.display = "none";
                        document.getElementById('level').innerHTML='<h1>Glückwunsch</h1><p>Nun kannst du selber die Farbe wählen.</p>';

                        Musterlager.getElementsByClassName('active')[0].classList.remove('active');

                        //Farbmuster freigeben
                        Musterlager.innerHTML += '   <div id="'+i++ +'" class="carousel-item active">'
                        +'     <h2>Deine Farbkombination</h2>'
                        +'     <div class="row" style="height:50px; "><p class="mx-auto d-block mt-1" >zur Farbwahl unten anklicken.</p>'
                        +'     </div>'
                        +'    <div class="row">'
                        +'             <div class="col farbwahl " style="height: 30px;margin:5px 5px 0 0"><label id="Kettfaden" class=" " title="Kettfaden"><input id="FarbregalKettfaden" type="color" title="Farbwahl für Kettfaden" value="'+Garn.Kettfaden+'" /></label></div>'
                        +'             <div class="col farbwahl " style="height: 30px;margin:5px 0 0 0"><label id="LagerSchussfaden" class=" " title="Schussfaden"><input id="FarbregalSchussfaden" type="color" title="Farbwahl für Schussfaden" value="'+Garn.Schussfaden+'" /></label></div>'
                        +'     </div>'
                        +' </div>';

                        document.getElementById('farbwahl').style.display='block';
                        document.getElementById('FarbregalKettfaden').style.visibility="visible";
                        document.getElementById('FarbregalSchussfaden').style.visibility="visible";
                        document.getElementById('FarbregalKettfaden').addEventListener('change',function(){farbwahl('Kettfaden')}, false);
                        document.getElementById('FarbregalSchussfaden').addEventListener('change',function(){farbwahl('Schussfaden')}, false);
                         //Farbwahl aktivieren
                    
                    
                    }
                if (level===1 ){
                        document.getElementById('info').style.display = "none";
                        document.getElementById('level').innerHTML='<h1>Glückwunsch</h1><p>Dein erstes Stoffmuster wurde gewebt!</p>';
                         //Farbmuster freigeben
                        document.getElementById('farbwahl').style.display='block';
                        
                    }
                    showMessage();
                     labelAnheften(); 
                     level++;
                     versand();
                }
            if (level===1 && aktion==='Kettfaeden einlegen'){
                document.getElementById('aktion').innerHTML="Schwenke dein Handy von <b>links nach rechts</b> um die Schussfäden zu verlegen.";
            }
            
                
        }

        function showMessage(){
            message.classList.remove('hide-message');
            message.classList.add('show-message');
        }

        function hideMessage(){
            message.classList.add('hide-message');
            message.classList.remove('show-message');
        }

        

    /*if (confirm("Um weben zu können, erlaube uns auf den Gyroscop zuzugreifen.")) {
        freigabe();
      } else {
        
      }

        

          function iOS() {
            return [
              'iPad Simulator',
              'iPhone Simulator',
              'iPod Simulator',
              'iPad',
              'iPhone',
              'iPod'
            ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
          } */
 