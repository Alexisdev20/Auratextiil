// import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
// import { FirebaseDB } from "../firebase/config";

import supabase from "../supabase/config";

// import { v4 as uuidv4 } from 'uuid';
const fullname = document.getElementById("payment_fullname");
const email = document.getElementById("payment_email");
const payment_btn = document.getElementById("payment_btn");
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const userData = JSON.parse(localStorage.getItem("user")) || {}
function start() {
  if (cartItems.length === 0) {
    console.log("No hay productos en el carrito")
    window.location.href = "/"
  }
  if (userData.username === "") {
    console.log("Usuario no autenticado")
    window.location.href = "/login"
  }
}
start()
payment_btn.addEventListener("click", async () => {
  // const idFactura = uuidv4()
  const user = {
    fullname: fullname.value,
    email: email.value,
    subject: "Aura Textil - Boleta de pago",
    html: ""
  }
  const body = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box
    }

   html{
      background:#f0f0f0;
    }
    body{
      /* background: #f0f0f0; */
      font-family: sans-serif;
      color: #000;

    }

     .factura {
      /* background:red; */
      max-width:700px;
      margin:0 auto;
      padding: 12px;
      /* backgroud:red; */
    }

    .container-information {
      display: flex;
    }

    .information {
      width: 50%;
    }

    .table {
      /* background:red; */
      width: 100%;
      margin-top: 10px;
    }





    .table-total {
      display: flex;
      justify-content: space-between;
      padding: 30px 10px;
      /* background:red; */
      /* text-align:center; */
      border: 1px solid black;
      border-left: none;
      border-right: none;
      border-color: #f0f0f0;
    }

    .table-total .text {
      /* background:purple; */
      text-align: end;
      text-transform: uppercase;
      width: 80%;
      font-weight: 600;
      color: #878787;
    }
    .text-price{
      /* background:red; */
      width:20%;
      text-align:end;
    }


    /* HEAD */
    .information-subtitle {
      font-weight: 600;
      margin-top: 10px;
      font-size: 1rem;
    }

    .information-paragraph {
      font-size: 0.9rem;
      margin-top: 5px;
    }

    .title-information {
      font-size: 0.9rem;
      font-weight: 600;
      margin-top: 10px;
      color: #878787;
    }

    .title-table {
      font-size: 0.9rem;
      font-weight: 600;
      margin-top: 20px;
      color: #878787;
    }

    .id-factura {
      font-size: 2rem;
      max-width: 300px;
      margin: 20px auto 0;

    }

    .title {}

    .subtitle {
      font-weight: 500;
      font-size: 0.9rem;
    }

    .tanks {
      font-size: 3rem;
      margin: 10px 0px 30px;
      text-align:center;
    }

    .logo {
      /* background: green; */
      margin: 0 auto;
      text-align: center;
      /* width:; */
    }
      .table-head {
      /* display: flex; */
      /* justify-content: space-between; */
      background: #f0f0f0;
      padding: 10px;
      font-weight: 600;
      overflow:hidden;
    }
    .table-item{
      float:left;
      /* background:red; */
      /* text-align:center; */
      display:inline-block;
      width:33.33%;
    }
     .table-element {
      overflow:hidden;
      /* display: flex; */
      justify-content: space-between;
      padding: 20px 10px;
    }
  </style>
  <div class="factura">
    <div class="logo-container">
      <div class="logo">
        <img style="object-fit: cover;"  src="https://res.cloudinary.com/dnr4oeapp/image/upload/v1733272649/aura-textil/loguito.png" alt="logo" width="180">
      </div>
      <h1 class="tanks">¡Gracias!</h2>
    </div>
    <section style="background-color:white; padding:20px;">
      <h3 class="title" style="text-align:center">Hola ${user.fullname}</h3>
      <h4 class="subtitle" style="text-align:center">¡Gracias por tu compra!</h3>
        <h1 class="id-factura" style="text-align:center">ID de la factura: 9239019203</h1>
        <!-- HEAD -->
        <div>
          <p class="title-information">INFORMACION SOBRE TU PEDIDO</p>
          <hr>
          <div class="container-information">
            <div class="information">
              <div>
                <h5 class="information-subtitle">ID del pedido</h5>
                <p class="information-paragraph">GIO#IOGIOIOGSA</p>
              </div>
              <div>
                <h5 class="information-subtitle">Fecha del pedido:</h5>
                <p class="information-paragraph">${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div class="information">
              <div>
                <h5 class="information-subtitle">Facturado a:</h5>
                <p class="information-paragraph">${user.email}</p>
              </div>
              <div>
                <h5 class="information-subtitle">Fuente</h5>
                <p class="information-paragraph">Aura Textil</p>
              </div>
            </div>

          </div>
        </div>

        <!-- PRODUCTS -->
        <div class="table-container">
          <p class="title-table">ESTE ES TU PEDIDO</p>
          <!-- !------------------------------------ -->
          <div class="table">
            <div class="table-head">
              <div class="table-item" style="text-align:start">Product:</div>
              <div class="table-item" style="text-align:center">Quantity:</div>
              <div class="table-item" style="text-align:end">Total:</div>
            </div>

              ${cartItems.map((item, index) => {
    return `
                  <div class="table-element">
                      <div class="table-item" style="text-align:start;">${item.name}</div>
                      <div class="table-item" style="text-align:center;">${item.quantity}</div>
                      <div class="table-item" style="text-align:end;">S/.${item.price}</div>
                  </div>
                  `
  })}
            <div class="table-total">
              <!-- <div>x</div> -->
              <div class="text">total</div>
              <div class="text-price">s/${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} PEN</div>
            </div>
          </div>
        </div>
    </section>

  </div>
      `
  user.html = body
  const response = await fetch("https://aura-textil-backend.vercel.app/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

  const data = await response.json()
  if (!data.ok) {
    alert(data.message)
    return
  }
  //* SAVE CART ITEMS IN SUPABASE
  const { data: dataForInsertHistoryPurchase, error } = await supabase
    .from("purchase_history")
    .insert({
      userId: userData.id,
      products: cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
      name: user.fullname,
    })
    .select()
  const { data: globalUserPurchase, error:anotherError } = await supabase
    .from("purchase_history")
    .select()
    .eq("userId", userData.id)
  
  localStorage.setItem("purchaseHistory", JSON.stringify(globalUserPurchase))
  localStorage.removeItem("cartItems")
  localStorage.removeItem("cartCount")
  showModal()
})

function showModal() {
  const dialog = document.getElementById("dialog")
  dialog.showModal()
  setTimeout(() => {
    dialog.close()
    window.location.href = "/"
  }, 5000)
}