<?php
  include ('inc/inc_head1.php');
  include ('inc/inc_nav1.php');

?>
<header> 
  
</header>
<main>
<div class="container ">
   <div class="row ">
        <div class="col-sm text-center" style="max-width:600px;">
          <canvas id="webstuhl" width="240" height="290"></canvas>

          <div id="farbwahl" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
            <div class="carousel-inner"> 
                <div class="carousel-item active">
                    <h2>Gewebemuster 3034</h2>
                    <div class="row" style="height:50px; background-image: url(https://sachsen.museum-digital.de/data/sachsen/images/87/21512-t_387/gewebemuster/200w_gewebemuster-21512.jpg)">
                    </div>
                    
                    <div class="row">
                            <div class="col farbwahl " style="background-color:#FDBC22"><label id="Kettfaden" class=" " title="Kettfaden"><input id="FarbregalKettfaden" type="color" title="Farbwahl für Kettfaden" value="#FDBC22"/>Farbwahl</label></div>
                            <div class="col farbwahl " style="background-color:#F19D0E"><label id="LagerSchussfaden" class=" " title="Schussfaden"><input id="FarbregalSchussfaden" type="color" title="Farbwahl für Schussfaden" value="#F19D0E"/></label></div>
                    </div>
                    <div class="row">
                            
                            <label id="LagerSchussfaden" class=" " title="Schussfaden"><input id="FarbregalSchussfaden" type="color" title="Farbwahl für Schussfaden" value="#F19D0E"/></label>
                    </div>
                </div>

                <div class="carousel-item">
                <h2>Gewebemuster</h2>
                <img src="https://sachsen.museum-digital.de/data/sachsen/images/87/19582-t_80/gewebemuster/200w_gewebemuster-19582.jpg"  alt="...">
                </div>
                <div class="carousel-item">
                <h2>Gewebemuster</h2>
                <img src="https://sachsen.museum-digital.de/data/sachsen/images/87/20400-t_284/damastgewebe/200w_damastgewebe-20400-2.jpg"  alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#farbwahl" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#farbwahl" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
          </div>





        <div id="bindung" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <h2>Leinwandbindung</h2>

                </div>

                <div class="carousel-item">
                <h2>Panama</h2>
                </div>
                <div class="carousel-item">
                <h2>Panama b</h2>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#bindung" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#bindung" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
          </div>

        </div>
    
    <br/>
    <button class="btn btn-secondary mx-auto" id="versandb" style="visibility: hidden;" ><a id="versand" href=""> Download </a> </button>
 
    </div>   

 </div>
</div><!-- /.container -->
    <script src="js/app_test1.js">  </script>
   

</main>

      

  <?php
include ('inc/inc_footer.php');
?>
