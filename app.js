//Librerias y dependencias
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const baseDatosModels = require('./models/bd.js');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
let login= false;
//recursos que se van a cargar en el server 
app.use(express.static(__dirname+'/static'));

//-----------------------------------------------------------------
//Configuración del Servidor
app.set('view engine','ejs');//definimos el motor de plantilla con archivos ejs
app.set('views',path.join(__dirname,"./views"));//definimos la ruta del motor de plantilla
app.use(express.urlencoded({extended:false}));//permite recuperar los valores publicados en un request
port = app.listen(5000);
console.log('Servidor corriendo exitosamente en el puerto 5000');
app.use(cookieParser());



//-----------------------------------------------------------
//enruptamiento
app.get('/',(req,res)=>{
  res.render('index.ejs')
});

app.get('/login',(req,res)=>{
res.render('login.ejs');
});

//Enrutamiento del lado del cliente
app.get('/loginclient',(req,res) => {
  res.render('loginclient.ejs');
})


app.post('/loginclient',(req,res) => {
  baseDatosModels.loginclient(req,res);
})



app.get('/registerclient',(req,res) => {
  res.render('register.ejs',{
    keypublic:process.env.KEYPUBLIC
  });
})

app.post('/registerclient',async(req,res) => {
  baseDatosModels.registerCliente(req,res);
})


app.get('/logout',(req,res) => {
  baseDatosModels.logout(req,res);
})


app.get('/webpage',(req,res) => {
  baseDatosModels.mostrarProductosCliente(req,res)
})

app.get('/webpagecart',(req,res) => {
  res.render('webpagecart');
})


app.post('/webpagecart/:id',baseDatosModels.rutabloqueada, async(req,res) => {
  baseDatosModels.webpageK(req,res)
})

app.post('/webpagecartpayment/:id',(req,res) => {
  baseDatosModels.webpageCartPayment(req,res);
})


app.get('/recoverypassword',(req,res) => {
  baseDatosModels.getViewPassword(req,res);
})

app.post('/recoverypassword',(req,res) => {
  baseDatosModels.postViewPassword(req,res);
})

app.get('/web/calificar/:id',(req,res) => {
  baseDatosModels.getidCalificar(req,res);
})


app.post('/web/calificar/:id',(req,res) => {
  baseDatosModels.postidCalificar(req,res);
})

app.post('/filter',(req,res) => {
  baseDatosModels.filter(req,res);
})


app.get('/cart/:id',(req,res) => {
  baseDatosModels.Cart(req,res);
})



app.post('/login',(req,res)=>{
 const {admin,password} = req.body;
  console.log(req.body)
   if(admin === 'admin' && password === 'admin'){
    login=true;
    res.redirect('/productos');
   }else{
    login=false;
    res.redirect('/login');
   }

});
  


app.get('/clientsview',(req,res) => {
  baseDatosModels.clientsview(req,res);
})

app.get('/add',(req,res)=>{
res.render('add.ejs');
});

//---------------------------------------------------------
app.get('/addImagen/:id',(req,res)=>{
baseDatosModels.addIMG(req,res)
});


app.post('/addImagen/:id',(req,res)=>{
baseDatosModels.aggIMG(req,res);
});



app.post('/addPost',(req,res)=>{   
baseDatosModels.aggDato(req,res);
});


app.get('/productos',(req,res)=>{
  baseDatosModels.mostrarProductos(req,res);
});
//-------------------------------------------------------
// GET /editar/:id
app.get('/update/:id',(req, res) => {
baseDatosModels.mostrarUpdate(req,res);

});
//-------------------------------------------------------
// POST /editar/:id
app.post('/update/:id', (req, res) => {
 baseDatosModels.update(req,res);
});

//-------------------------------------------------------
// GET /eliminar/:id
app.get('/delete/:id', (req, res) => {
baseDatosModels.deletee(req,res);
});
//-------------------------------------------------------
// POST /eliminar/:id

//------------------------------------------------------
app.get('/categorias', (req, res) => {
 baseDatosModels.getCategorias(req,res);
});
//-------------------------------------------------------
app.get('/addCategorias', (req, res) => {
 res.render('addcategoria.ejs');
});
//-------------------------------------------------------
app.post('/addcategorias', (req, res) => {
 baseDatosModels.postCategorias(req,res);
});
//-------------------------------------------------------
app.get('/updateCategoria/:id',(req,res)=>{
 baseDatosModels.mostrarUpdateC(req,res);
});
//-------------------------------------------------------
app.post('/updateCategoria/:id',(req,res)=>{
baseDatosModels.updateCateg(req,res);
});
//-------------------------------------------------------
//Metodo para manejar rutas no encontradas
app.get('/*',(req,res)=>{
res.render('notfound.ejs')
});

//-------------------------------------------------------






//ejemplo para un commit
