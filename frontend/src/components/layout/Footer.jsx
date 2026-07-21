import React from 'react';
import { Mail, MapPin, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-can-secondary text-white pt-16 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-2xl font-bold mb-4 text-can-primary">Can Martín</h4>
          <p className="opacity-70 text-sm max-w-sm leading-relaxed">
            Transformando vidas a través de la adopción responsable. 
            Nuestro compromiso es conectar corazones peludos con familias que brindarán amor infinito.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-can-primary uppercase text-xs tracking-widest">Plataforma</h4>
          <ul className="space-y-3 opacity-80 text-sm">
            <li className="hover:text-can-primary cursor-pointer transition-colors flex items-center gap-2"><ShieldCheck size={16}/> Políticas de Adopción</li>
            <li className="hover:text-can-primary cursor-pointer transition-colors flex items-center gap-2"><HelpCircle size={16}/> Preguntas Frecuentes</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-can-primary uppercase text-xs tracking-widest">Contacto</h4>
          <ul className="space-y-3 opacity-80 text-sm">
            <li className="flex items-center gap-2"><Mail size={16}/> hola@canmartin.com</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> Lima, Perú</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
        <p>© 2026 Can Martín - Gestión Integral de Adopciones.</p>
        <p className="mt-4 md:mt-0 flex items-center gap-1">
          Hecho con <Heart size={12} className="text-can-primary fill-can-primary" /> por Moises Rojas
        </p>
      </div>
    </footer>
  );
};

export default Footer;