
        let webstuhl = document.getElementById('webstuhl');
        let ctx = webstuhl.getContext('2d');
        let zelleh=(webstuhl.height-50)/24;
        let zelleb=(webstuhl.width)/24;
        let schuss = 40;
        let label=30; // offset für Label
       
        let schuss_fertig=false;
        let kettfaedeneinlegen_manuell=true;
        let schaltery=1;
        let Garn={Schussfaden:'#F19D0E', Kettfaden:'#FDBC22'};
        let lochkarten=["010101010101010101010101",
                        "101010101010101010101010"];
        let LochkartenLager=[
            {muster: "Leinwandbindung",LochkartenStapel:        ["010101010101010101010101",
                                                                 "101010101010101010101010"]},
            {muster: "Glatter Panama",LochkartenStapel:         ["110011001100110011001100",
                                                                 "110011001100110011001100",
                                                                 "001100110011001100110011",
                                                                 "001100110011001100110011"]},
            {muster: "Gemischter Panama b",LochkartenStapel:    ["100010001000100010001000",
                                                                 "0111011101110111011101110",
                                                                 "0111011101110111011101110",
                                                                 "0111011101110111011101110"]},
             {muster: "Gemischter Panama c",LochkartenStapel:   ["1110100011101000111010001",
                                                                 "1110100011101000111010001",
                                                                 "1110100011101000111010001",
                                                                 "0001011100010111000101110",
                                                                 "1110100011101000111010001",
                                                                 "0001011100010111000101110",
                                                                 "0001011100010111000101110",
                                                                 "0001011100010111000101110"]},                                                     
            {muster: "Kettköper mit Z-Grat",LochkartenStapel:   ["0110110110110110110110110",
                                                                 "1101101101101101101101101",
                                                                 "1011011011011011011011011"]},
            {muster: "Querzickzackköper",LochkartenStapel:      ["010111010101110101011101",
                                                                 "001010100010101000101010",
                                                                 "100101001001010010010100",
                                                                 "010010010100100101001001",
                                                                 "101000101010001010100010",
                                                                 "110101011101010111010101",
                                                                 "011010110110101101101011",
                                                                 "101101101011011010110110"]}                                                 
        ];
         
        let MusterLager=[
              {bezeichnung:"Gewebemuster 3034",Kettfaden:'#FDBC22',Schussfaden:'#F19D0E'},  
              {bezeichnung:"Gewebemuster 4309",Kettfaden:'#B2050B',Schussfaden:'#5E0302'},
              {bezeichnung:"Gewebemuster Donnar 18",Kettfaden:'#8A693E',Schussfaden:'#612C24'},
              {bezeichnung:"Gewebemuster Dohna 3, 4397 A",Kettfaden:'#310400',Schussfaden:'#8D0400'},
              {bezeichnung:"Gewebemuster Putbus 3, 4537 B",Kettfaden:'#561C0E',Schussfaden:'#A78349'}        
        
            ]
       let select = document.getElementById('Musterlager');
        select.innerHTML = MusterLager.map(function(v){
            return '<option style="background-color:'+v.Kettfaden+'; color:'+v.Schussfaden+';" value="' + v.bezeichnung + '">' + v.bezeichnung + '</option>';
        }).join('');
        let selectLK = document.getElementById('Lochkartenlager');
        selectLK.innerHTML = LochkartenLager.map(function(v){
            return '<option value="' + v.muster + '">' + v.muster + '</option>';
        }).join('');


        let aktiveLochkarte=0;

        let accelerationX =0;
        let accY=0;
        //screen.orientation.lock("portrait");
        window.ondevicemotion = function(event) {   
            let accelerationX = event.accelerationIncludingGravity.x;   
            bewege_schuetze(accelerationX);
            accY = event.accelerationIncludingGravity.y;   
        }
        
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, webstuhl.width, webstuhl.height-label);
        
        //document.addEventListener('keydown', keyDown);
        document.getElementById('start').addEventListener('click',function(){kettfaedeneinlegen(Garn["Kettfaden"])}, false);
        document.getElementById('schuss_links').addEventListener('click',function(){schuss_links(Garn["Schussfaden"])}, false);
        document.getElementById('schuss_rechts').addEventListener('click',function(){schuss_rechts(Garn["Schussfaden"])}, false);
        document.getElementById('FarbregalKettfaden').addEventListener('change',function(){farbwahl('Kettfaden')}, false);
        document.getElementById('FarbregalSchussfaden').addEventListener('change',function(){farbwahl('Schussfaden')}, false);
        document.getElementById('Musterlager').addEventListener('change',function(){farbwahlMusterLager()}, false);
        document.getElementById('Lochkartenlager').addEventListener('change',function(){tauscheLochkarten()}, false);
        document.getElementById('saveLK').addEventListener('click',function(){speichernLochkarte()}, false);       


        function farbwahl(faden){ // aus colorpicker
            const Garnfarbe=document.getElementById('Farbregal'+faden).value;
            document.getElementById('Lager'+faden).style.backgroundColor=Garnfarbe;
            Garn[faden]=Garnfarbe;
        }

        function farbwahlMusterLager(){
            const e=document.getElementById('Musterlager');
            const MusterWahl=e.options[e.selectedIndex].value

            const Muster=   MusterLager.find(e => e.bezeichnung===MusterWahl )
            document.getElementById('LagerKettfaden').style.backgroundColor=Muster.Kettfaden;
            Garn['Kettfaden']=Muster.Kettfaden;
            document.getElementById('LagerSchussfaden').style.backgroundColor=Muster.Schussfaden;
            Garn['Schussfaden']=Muster.Schussfaden;
        }
        function tauscheLochkarten(){
            const e=document.getElementById('Lochkartenlager');
            const LochkartenWahl=e.options[e.selectedIndex].value;
            const Lochkarten=   LochkartenLager.find(e => e.muster===LochkartenWahl )
            lochkarten=Lochkarten.LochkartenStapel;
        }
       
        async function kettfaedeneinlegen(farbe) {
           schuss_fertig=false;//eigentlich Kettfertig =false
           document.getElementById("versandb").style.visibility="hidden";
           ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
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
                        
                            ctx.fillStyle = farbe;//hiermal garnfarbe direkt aufrufen zum Erstellen besonderer Muster
                            ctx.fillRect(x,y,zelleb-1,zelleh);
                        
                    }
           }
           schuss_fertig=true;
           document.getElementById("versand").style.visibility="visible";
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
            if (schuss_fertig && schuss>(webstuhl.height-20) ) {schuss_fertig=false; labelAnheften();shareCanvas();  }
            
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
                }else{
                   // document.getElementById('fehler').innerHTML='Fähler'+schuss_fertig+schuss+(schuss % 2==1);
                }
            
            }
        function bewege_schuetze(accX){
            //document.getElementById('accX').innerHTML="Test"+schuss_fertig+accX;
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
//Garn={Schussfaden:'#F19D0E', Kettfaden:'#FDBC22'};

        //Export? Versand??
        function versand(){
            const dataURL = webstuhl.toDataURL();
            const leinwand = document.createElement("img");
            leinwand.width = webstuhl.width;
            leinwand.height =webstuhl.height;
            leinwand.src = dataURL;

           
            document.getElementById("versand").download = "muster.png";
            document.getElementById("versand").href = dataURL;
            document.getElementById("versandb").style.visibility="visible";
        }
        async function shareCanvas() {
            const canvasElement = document.getElementById('webstuhl');
            const dataUrl = canvasElement.toDataURL();
            const blob = await (await fetch(dataUrl)).blob();
            const filesArray = [
              new File(
                [blob],
                'webmuster.png',
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

        erstelleNeueLochkarte();

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
            let neueLochkarteKompl="";
            for(let i=0;i<24;i++){
                console.log(document.getElementById("lkl"+i).style.backgroundColor);
              if(document.getElementById("lkl"+i).style.backgroundColor==="rgb(255, 255, 255)") 
                 neueLochkarte+="1";
                else
                neueLochkarte+="0";
             }
            console.log(neueLochkarte);
           
            //neue Lochkarte komplementär abspeichern
            lochkarten=[neueLochkarte,
            lochkartenInvert(neueLochkarte)];
console.log();

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
        
 