<?php
session_start();
  include ('inc/inc_head.php');
  include ('inc/inc_nav.php');

?>
<header> 
  
</header>
<main>
<div class="container ">
   <div class="row ">
   <div class="col-sm text-center">
       <div class="row ">
           <img class="phone  mx-auto" src="images/phone.png"  alt="Smartphone schwenken" />
           <p>Tilt your phone to weave fabric.</p>
       </div>
       <div class="row farbregal ">
            <div class="col-6">
                <label id="LagerSchussfaden" class="Garnregal" title="Schussfaden"><input id="FarbregalSchussfaden" type="color" title="Farbwahl für Schussfaden"/></label>
            </div>
             <div class="col-6">
                <label id="LagerKettfaden" class="Garnregal"  title="Kettfaden"><input id="FarbregalKettfaden" type="color"> </label>
            </div>
       </div>       
       
        <div class="collapse" id="regal">
        <div class="card card-body">
            Gewebemuster 3034 <img class="farbkasten" src="images/F19D0E.png"  alt="eine Farbe zur Auswahl" />
            <img class="farbkasten" src="images/FDBC22.png"  alt="eine Farbe zur Auswahl" /> 
        </div>
        </div>
        <p id="Karriereschritt">LEVEL 1: LEINWANDBINDUNG</p>
        <hr/>


       <canvas id="webstuhl" width="240" height="290"></canvas>

        <div class="row ">
            <div class="col-4">
                <button class="btn btn-secondary schuss" id="schuss_links"> > </button>
            </div>
            <div class="col-4">
                <button class="btn btn-secondary start" id="start">Kettfäden einlegen </button>
            </div>
            <div class="col-4">
                <button class="btn btn-secondary schuss"  id="schuss_rechts"> < </button>
            </div>
            <p id="fehler"></p>
        </div>
    </div>
    <div class="col-sm">
        <p>Tests:</p>
        <div class="row">
            
        <div>
        <select id="Musterlager"  class="form-select" aria-label="Musterlager">

        </select>
    </div>
    <div>
        <select id="Lochkartenlager"  class="form-select" aria-label="Lochkartenlager">

        </select>
    </div>
    <br/>
    <button class="btn btn-secondary mx-auto" id="versandb" style="visibility: hidden;" ><a id="versand" href=""> Download </a> </button>
 <p id="accX"></p>
    <div id="lochkarten">

      <div id="neueLochkarten">


      </div>
      <input type="text" class="form-control" id="NameNeueLK" aria-describedby="LKHelp" placeholder="mein schönes neues Muster">
    <div id="LKHelp" class="form-text">Bezeichnung neues Muster</div>
      <button class="btn btn-secondary mx-auto" id="saveLK" >saveLK</button>
    </div>

 </div>
</div><!-- /.container -->
    <script src="js/app_test.js">  </script>
   

</main>

      

  <?php
include ('inc/inc_footer.php');
?>
