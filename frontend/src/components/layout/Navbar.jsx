import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  PawPrint,
  LogOut,
  UserCircle2,
  Heart
} from "lucide-react";


function Navbar({ onLogout, userRole }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = !!userRole;


  useEffect(()=>{

    const handleScroll = ()=>{
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll",handleScroll);

    return ()=>window.removeEventListener("scroll",handleScroll);

  },[]);



  const publicLinks=[

    {
      label:"Inicio",
      path:"/"
    },

    {
      label:"Mascotas",
      path:"/mascotas"
    },

    {
      label:"Adopta",
      path:"/adopta"
    },

    {
      label:"Nosotros",
      path:"/nosotros"
    }

  ];



  const userLinks=[

    {
      label:"Inicio",
      path:"/"
    },

    {
      label:"Mascotas",
      path:"/mascotas"
    },

    {
      label:"Mis solicitudes",
      path:"/mis-solicitudes"
    },

    {
      label:"Perfil",
      path:"/perfil"
    }

  ];



  const adminLinks=[

    {
      label:"Dashboard",
      path:"/admin/dashboard"
    },

    {
      label:"Mascotas",
      path:"/admin/mascotas"
    },

    {
      label:"Solicitudes",
      path:"/admin/solicitudes"
    },

    {
      label:"Usuarios",
      path:"/admin/usuarios"
    }

  ];



  let links = publicLinks;


  if(userRole==="ADMIN"){
    links = adminLinks;
  }
  else if(isAuthenticated){
    links = userLinks;
  }



return (

<nav

className={`
fixed
top-0
left-0
w-full
z-50
transition-all
duration-500

${
scrolled

?

"bg-white/95 shadow-lg backdrop-blur-xl"

:

"bg-white/70 backdrop-blur-md"

}

`}

>


<div

className="
max-w-7xl
mx-auto
px-6
h-20
flex
items-center
justify-between
"

>



{/* LOGO */}

<div

onClick={()=>navigate("/")}

className="
flex
items-center
gap-3
cursor-pointer
group
"

>


<div

className="
w-12
h-12
rounded-2xl
bg-gradient-to-br
from-orange-400
to-orange-600
flex
items-center
justify-center
text-white
shadow-lg
group-hover:scale-110
transition
"

>

<PawPrint size={26}/>

</div>


<div>

<h1

className="
text-xl
font-extrabold
text-gray-900
"

>

Can Martín

</h1>


<p

className="
text-xs
text-gray-500
flex
items-center
gap-1
"

>

<Heart size={11} className="text-orange-500"/>

Adopta con amor

</p>


</div>

</div>





{/* MENU CENTRAL */}

<div

className="
hidden
lg:flex
items-center
gap-9
absolute
left-1/2
-translate-x-1/2
"

>


{

links.map(item=>(

<button

key={item.path}

onClick={()=>navigate(item.path)}

className={`

relative
font-medium
text-sm
pb-2
transition-all
duration-300


${
location.pathname===item.path

?

"text-orange-600"

:

"text-gray-600 hover:text-orange-600"

}

`}

>

{item.label}


{

location.pathname===item.path &&

<span

className="
absolute
bottom-0
left-0
w-full
h-[3px]
bg-orange-500
rounded-full
"

></span>

}


</button>

))

}


</div>






{/* DERECHA */}


<div

className="
hidden
lg:flex
items-center
gap-5
"

>


{

!isAuthenticated

?


<>


{/* INGRESAR */}

<button

onClick={()=>navigate("/login")}

className={`

px-5
py-2.5
rounded-full
font-semibold
transition-all
duration-300


${
location.pathname === "/login"

?

"bg-orange-600 text-white shadow-md"

:

"text-gray-700 hover:text-orange-600"

}

`}

>

Ingresar

</button>





{/* REGISTRARSE */}

<button

onClick={()=>navigate("/registro")}

className={`

px-6
py-3
rounded-full
font-semibold
transition-all
duration-300


${
location.pathname === "/registro"

?

"bg-orange-600 text-white shadow-md"

:

"text-gray-700 hover:text-orange-600"

}

`}

>

Registrarse

</button>


</>


:


<>


<div

className="
flex
items-center
gap-3
"

>


<UserCircle2

size={36}

className="
text-orange-500
"

/>


<div>

<p

className="
font-semibold
text-sm
"

>

Usuario

</p>


<p

className="
text-xs
text-gray-500
"

>

{userRole}

</p>


</div>


</div>





<button

onClick={onLogout}

className="
flex
items-center
gap-2
bg-red-500
hover:bg-red-600
text-white
px-5
py-2.5
rounded-full
transition
"

>


<LogOut size={18}/>

Salir


</button>


</>


}


</div>





{/* MOBILE BUTTON */}

<button

onClick={()=>setIsOpen(!isOpen)}

className="
lg:hidden
text-gray-700
"

>

{

isOpen

?

<X size={30}/>

:

<Menu size={30}/>

}

</button>


</div>







{/* MOBILE MENU */}

{

isOpen &&


<div

className="
lg:hidden
bg-white
shadow-xl
px-6
py-5
"

>


{

links.map(item=>(


<button

key={item.path}

onClick={()=>{

navigate(item.path);

setIsOpen(false);

}}

className={`

block
w-full
text-left
py-4
border-b
font-medium
transition


${
location.pathname===item.path

?

"text-orange-600"

:

"text-gray-700"

}

`}

>


{item.label}


</button>


))

}




{

!isAuthenticated &&


<div className="mt-5 space-y-3">


<button

onClick={()=>navigate("/login")}

className={`

w-full
px-6
py-3
rounded-full
font-semibold
transition-all


${
location.pathname === "/login"

?

"bg-orange-600 text-white shadow-md"

:

"text-gray-700 hover:text-orange-600"

}

`}

>

Ingresar

</button>





<button

onClick={()=>navigate("/registro")}

className={`

w-full
px-6
py-3
rounded-full
font-semibold
transition-all


${
location.pathname === "/registro"

?

"bg-orange-600 text-white shadow-md"

:

"text-gray-700 hover:text-orange-600"

}

`}

>

Registrarse

</button>


</div>


}



</div>


}


</nav>


);


}


export default Navbar;