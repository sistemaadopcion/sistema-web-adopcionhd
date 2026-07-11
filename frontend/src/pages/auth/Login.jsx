import React, { useState } from "react";
import { Mail, Lock, PawPrint } from "lucide-react";
import { loginService } from "../../services/userService";


const Login = ({ onLoginSuccess }) => {


const [formData,setFormData] = useState({
  correo:"",
  contrasena:""
});


const [error,setError] = useState("");



const handleChange=(e)=>{

setFormData({
 ...formData,
 [e.target.name]:e.target.value
});

};



const handleSubmit=async(e)=>{

e.preventDefault();
setError("");


if(!formData.correo || !formData.contrasena){

setError("Todos los campos son obligatorios.");
return;

}



try{


const user = await loginService(formData);


sessionStorage.setItem(
"userId",
user.id
);



const rol = (user.rol || "ADOPTANTE")
.toUpperCase();


sessionStorage.setItem(
"userRole",
rol
);


sessionStorage.setItem(
"userName",
user.nombre || "Usuario"
);



if(typeof onLoginSuccess==="function"){

onLoginSuccess(rol);

}


window.location.href="/";



}catch(err){

setError(
"Credenciales incorrectas o error de conexión"
);

}


};





return (

<div
className="
min-h-screen
flex
items-center
justify-center
px-6
bg-gradient-to-br
from-orange-50
via-white
to-orange-100
"
>


<div
className="
w-full
max-w-md
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-2xl
border
border-white
p-10
"
>



{/* LOGO */}

<div
className="
flex
justify-center
mb-6
"
>

<div
className="
w-16
h-16
rounded-3xl
bg-gradient-to-br
from-orange-400
to-orange-600
flex
items-center
justify-center
text-white
shadow-lg
"
>

<PawPrint size={32}/>


</div>


</div>





<h1
className="
text-3xl
font-extrabold
text-center
text-gray-900
"
>

Bienvenido 🐾

</h1>


<p
className="
text-center
text-gray-500
mt-2
mb-8
"
>

Ingresa para continuar con la adopción

</p>





{
error &&

<div
className="
bg-red-50
text-red-600
border
border-red-200
rounded-xl
p-4
mb-6
text-sm
font-medium
"
>

⚠️ {error}

</div>

}





<form
onSubmit={handleSubmit}
className="space-y-5"
>




{/* EMAIL */}

<div>

<label
className="
text-sm
font-semibold
text-gray-700
"
>
Correo electrónico
</label>


<div
className="
relative
mt-2
"
>

<Mail
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"
size={20}
/>


<input

type="email"

name="correo"

value={formData.correo}

onChange={handleChange}

placeholder="ejemplo@gmail.com"

className="
w-full
pl-12
pr-4
py-3.5
rounded-2xl
border
border-gray-200
outline-none
focus:ring-2
focus:ring-orange-400
focus:border-orange-400
transition
"

 />

</div>

</div>







{/* PASSWORD */}


<div>


<label
className="
text-sm
font-semibold
text-gray-700
"
>
Contraseña
</label>



<div
className="
relative
mt-2
"
>


<Lock

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

size={20}

/>



<input

type="password"

name="contrasena"

value={formData.contrasena}

onChange={handleChange}

placeholder="••••••••"

className="
w-full
pl-12
pr-4
py-3.5
rounded-2xl
border
border-gray-200
outline-none
focus:ring-2
focus:ring-orange-400
focus:border-orange-400
transition
"

/>


</div>


</div>







<button

type="submit"

className="
w-full
mt-4
py-4
rounded-2xl
bg-gradient-to-r
from-orange-500
to-orange-600
text-white
font-bold
text-lg
shadow-lg
hover:shadow-xl
hover:scale-[1.02]
transition
duration-300
"

>

Ingresar

</button>




</form>





<p
className="
text-center
text-sm
text-gray-500
mt-8
"
>

¿No tienes cuenta?

<span
className="
text-orange-500
font-semibold
cursor-pointer
hover:underline
"
>

 Regístrate

</span>


</p>



</div>


</div>


);


};


export default Login;