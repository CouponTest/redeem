import React from 'react'
const request = require("request-promise-native");

function couponNotExist() {
  var x = document.getElementById("couponNotExist");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}
async function invalidCoupon() {
  var x = document.getElementById("invalidSnackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}
function emptyInput() {
  var x = document.getElementById("emptyInput");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}
async function validCoupon(reason, establecimiento) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function sendCoupon() {
const inputValue = document.getElementById("cupon").value;
  if (inputValue === "") {
    emptyInput();
  }
  const coupon = document.getElementById("cupon").value;
  const form = {cupon: coupon};
  Promise.resolve(request.post({
    url: "http://localhost:4200/useCoupon",
    form
  })).then(async response => {
    var parsed = JSON.parse(response);
    console.log(parsed.valid);
    if (parsed.valid === true) {
      validCoupon(response.reason, response.establecimiento)
    } else if (parsed.reason === "Does not exist") {
      couponNotExist()
    } else {
      invalidCoupon()
    }
  })
}
function Reedem() {
    return (
        <div>
        
        <div className="sidebar">
          <a className="active" href="/">Canjear</a>
          <a href="/">Mi perfil</a>
       </div>
            <center><img src="http://localhost:4200/assets/logo"></img></center>
            <center><h1 id="title">Canjear Cupon</h1></center>
            <div class="container">
  
    <div class="row">
      <div class="col-25">
        <label for="fname">First Name</label>
      </div>
      <div class="col-75">
       <input type="text" id="cupon" name="cupon" placeholder="Ingrese su cupon" required="true"></input>
      </div>
    </div>
    <br></br>
   <center><button onClick={sendCoupon} value="Canjear" id="button">Canjear</button></center>

  <div id="snackbar">Cupon valido!</div>
  <div id="invalidSnackbar">Cupon invalido! Puede que haya sido canjeado o haya expirado</div>
  <div id="invalidSnackbar">Favor ingrese cupon. Campo no puede estar vacio.</div>
  <div id="couponNotExist">Cupon no existe, verifique datos introducidos.</div>
</div>

       </div>
    )
};

export default Reedem;