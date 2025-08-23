'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Cuenta({ usuario, onSalir }) {
  const [galeones, setGaleones] = useState(usuario.Galeones);
  const [monto, setMonto] = useState('');
  const [destino, setDestino] = useState('');

  async function manejarTransferencia(e) {
    e.preventDefault();
    const cantidad = Number(monto);

    if (!destino || isNaN(cantidad) || cantidad <= 0) {
      alert('Datos inválidos');
      return;
    }

    if (galeones < cantidad) {
      alert('Fondos insuficientes');
      return;
    }

    // Restar al usuario
    const { error: errorResta } = await supabase
      .from('DatosD')
      .update({ Galeones: galeones - cantidad })
      .eq('id', usuario.id);

    if (errorResta) {
      console.error('Error restando galeones:', errorResta);
      alert('Error al restar galeones');
      return;
    }

    // Sumar al destino
    const { data: destinoData, error: errorDestino } = await supabase
      .from('DatosD')
      .select('*')
      .eq('id', destino)
      .single();

    if (errorDestino || !destinoData) {
      alert('Destino no encontrado');
      return;
    }

    const { error: errorSuma } = await supabase
      .from('DatosD')
      .update({ Galeones: destinoData.Galeones + cantidad })
      .eq('id', destinoData.id);

    if (errorSuma) {
      console.error('Error sumando galeones al destino:', errorSuma);
      alert('Error al sumar al destino');
      return;
    }

    setGaleones(galeones - cantidad);
    alert(`Transferencia de ${cantidad} galeones a ${destino} realizada`);
  }

  async function manejarAdmin(accion) {
    const cantidad = Number(monto);

    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Monto inválido');
      return;
    }

    const nuevo = accion === 'sumar' ? galeones + cantidad : galeones - cantidad;

    const { error } = await supabase
      .from('DatosD')
      .update({ Galeones: nuevo })
      .eq('id', usuario.id);

    if (error) {
      console.error(`Error al ${accion}:`, error);
      alert(`Error al ${accion} galeones`);
      return;
    }

    setGaleones(nuevo);
    alert(`${accion === 'sumar' ? 'Sumados' : 'Restados'} ${cantidad} galeones`);
  }

  const esAdmin = usuario["Tipo De Cuenta"] === 'admin' || usuario["Tipo De Cuenta"] === 'admin_invisible';

  return (
    <div className="card-transparente" style={{ padding: '20px' }}>
      <h1>Bienvenido {usuario.Nombre}</h1>
      <p>id: {usuario.id}</p>
      <p>Tipo de cuenta: {usuario["Tipo De Cuenta"]}</p>
      <p>Galeones: {galeones}</p>

      <form onSubmit={manejarTransferencia}>
        <h3>Transferir galeones</h3>
        <input
          placeholder="id destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
        <button type="submit">Transferir</button>
      </form>

      {esAdmin && (
        <div style={{ marginTop: '10px' }}>
          <h3>Opciones de admin</h3>
          <button onClick={() => manejarAdmin('sumar')}>Sumar</button>
          <button onClick={() => manejarAdmin('restar')} style={{ marginLeft: '5px' }}>Restar</button>
        </div>
      )}

      <button onClick={onSalir} style={{ marginTop: '20px' }}>Salir</button>
    </div>
  );
}
