import React, { useState } from "react";
import {
  PawPrint,
  User,
  Mail,
  Lock,
  Phone,
  MapPin
} from "lucide-react";

import { registerService } from "../../services/userService";


const Register = () => {


const [formData,setFormData]=useState({

nombre:"",
apellido:"",
correo:"",
contrasena:"",
telefono:"",
direccion:""

});


const [error,setError]=useState("");
const [success,setSuccess]=useState("");




const handleChange=(e)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
});

};





const handleSubmit=async(e)=>{

e.preventDefault();

setError("");
setSuccess("");


const {
nombre,
apellido,
correo,
contrasena,
telefono,
direccion

}=formData;



if(
!nombre ||
!apellido ||
!correo ||
!contrasena ||
!telefono ||
!direccion
){

setError(
"Todos los campos son obligatorios."
);

return;

}




if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){

setError(
"Ingresa un correo válido."
);

return;

}




if(telefono.length!==9 || isNaN(telefono)){

setError(
"El teléfono debe tener 9 números."
);

return;

}



try{


await registerService(formData);


setSuccess(
"¡Cuenta creada correctamente! 🐾"
);



setFormData({

nombre:"",
apellido:"",
correo:"",
contrasena:"",
telefono:"",
direccion:""

});



}catch(err){

setError(
"Error al registrar. Verifica los datos."
);

}


};






const InputField=({
icon:Icon,
label,
name,
type="text",
placeholder
})=>(


<div>


<label
className="
text-sm
font-semibold
text-gray-700
"
>

{label}

</label>



<div
className="
relative
mt-2
"
>


<Icon

size={20}

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

/>



<input

type={type}

name={name}

value={formData[name]}

onChange={handleChange}

placeholder={placeholder}

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


);






return (


<div

className="
min-h-screen
flex
items-center
justify-center
px-6
py-10
bg-gradient-to-br
from-orange-50
via-white
to-orange-100
"

>



<div

className="
w-full
max-w-2xl
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
mb-5
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

Crear cuenta 🐾

</h1>



<p

className="
text-center
text-gray-500
mt-2
mb-8
"

>

Únete a Can Martín y ayuda a encontrar hogares

</p>






{
error &&

<div

className="
bg-red-50
border
border-red-200
text-red-600
rounded-xl
p-4
mb-5
text-sm
font-medium
"

>

⚠️ {error}

</div>

}




{
success &&

<div

className="
bg-green-50
border
border-green-200
text-green-600
rounded-xl
p-4
mb-5
text-sm
font-medium
"

>

✅ {success}

</div>

}






<form

onSubmit={handleSubmit}

className="
grid
md:grid-cols-2
gap-5
"

>




<InputField

icon={User}

label="Nombres"

name="nombre"

placeholder="Ej. César"

/>




<InputField

icon={User}

label="Apellidos"

name="apellido"

placeholder="Ej. Cuñachi"

/>





<InputField

icon={Mail}

label="Correo electrónico"

name="correo"

type="email"

placeholder="correo@gmail.com"

/>





<InputField

icon={Lock}

label="Contraseña"

name="contrasena"

type="password"

placeholder="••••••••"

/>





<InputField

icon={Phone}

label="Teléfono"

name="telefono"

placeholder="999999999"

/>




<InputField

icon={MapPin}

label="Dirección"

name="direccion"

placeholder="Tu dirección"

/>





<button

type="submit"

className="
md:col-span-2
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

Registrarme 🐾

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

¿Ya tienes cuenta?

<span

className="
text-orange-500
font-semibold
cursor-pointer
hover:underline
"

>

 Inicia sesión

</span>


</p>




</div>


</div>


);


};


export default Register;