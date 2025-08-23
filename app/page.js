'use client';
import { useState } from 'react';
import { supabase } from './lib/supabase';
import CrearCuenta from './componente/CrearCuenta';
import Cuenta from './componente/Cuenta';

export default function Home() {
  const [modo, setModo] = useState('inicio');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [usuario, setUsuario] = useState(null);

  async function manejarLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('DatosD')
      .select('*')
      .eq('Correo', correo)
      .eq('Clave', clave)
      .single();

    if (error || !data) {
      alert('Correo o clave incorrectos');
      console.error(error);
    } else {
      setUsuario(data);
      setModo('cuenta');
    }
  }

  if (modo === 'crear') return <CrearCuenta onVolver={() => setModo('inicio')} />;
  if (modo === 'cuenta' && usuario) return <Cuenta usuario={usuario} onSalir={() => setModo('inicio')} />;

  return (
    <div className="card-transparente" style={{ padding: '20px' }}>
      <h1>Banco Mágico</h1>
      <form onSubmit={manejarLogin}>
        <div>
          <label>Correo:</label>
          <input value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <button onClick={() => setModo('crear')} style={{ marginTop: '10px' }}>Crear nueva cuenta</button>
    </div>
  );
}
