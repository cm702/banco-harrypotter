'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CrearCuenta({ onVolver }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  async function manejarCrearCuenta(e) {
    e.preventDefault();

    const { error } = await supabase
      .from('DatosD')
      .insert([{
        Correo: correo,
        Clave: clave,
        Nombre: nombre,
        Galeones: 0,
        "Tipo De Cuenta": 'regular'
      }]);

    if (error) {
      console.error('Error al crear cuenta:', error);
      alert('Error al crear cuenta');
      return;
    }

    alert(`Cuenta de ${nombre} creada con 0 galeones`);
    onVolver();
  }

  return (
    <div className="card-transparente" style={{ padding: '20px' }}>
      <h1>Crear cuenta</h1>
      <form onSubmit={manejarCrearCuenta}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Crear</button>
      </form>
      <button onClick={onVolver} style={{ marginTop: '10px' }}>Volver</button>
    </div>
  );
}
