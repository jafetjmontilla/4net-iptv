import { useState } from 'react';
import { useEffect } from 'react';


export default function Prueba() {
  const [enlace, setEnlace] = useState(''); // Estado para almacenar el enlace
  const [navegadores, setNavegadores] = useState([]); // Estado para almacenar la lista de navegadores
  const [navegadorSeleccionado, setNavegadorSeleccionado] = useState(''); // Estado para almacenar el navegador seleccionado

  // Función para obtener una lista de navegadores instalados
  const obtenerNavegadores = () => {
    const navegadoresDisponibles = [];

    for (const mimeType of navigator.mimeTypes) {
      if (mimeType.type.startsWith('application/') && mimeType.type.endsWith('+x-executable')) {
        const nombreNavegador = mimeType.description.split(';')[0].trim();
        navegadoresDisponibles.push(nombreNavegador);
      }
    }

    setNavegadores(navegadoresDisponibles);
  };


  useEffect(() => {
    console.log(150001, navegadores)
  }, [navegadores])


  // Función para manejar el cambio de valor del campo de enlace
  const handleEnlaceChange = (event) => {
    setEnlace(event.target.value);
  };

  // Función para manejar el cambio de valor del selector de navegador
  const handleNavegadorChange = (event) => {
    setNavegadorSeleccionado(event.target.value);
  };

  // Función para abrir el enlace en el navegador seleccionado
  const abrirEnlace = () => {
    // if (!enlace || !navegadorSeleccionado) {
    //   alert('Debes ingresar un enlace y seleccionar un navegador.');
    //   return;
    // }

    const ventanaEmergente = window.open(null, "msedge");
    if (ventanaEmergente) {
      ventanaEmergente.focus();
    } else {
      alert('Tu navegador está bloqueando la apertura de ventanas emergentes. Ajusta la configuración de tu navegador para permitirlo.');
    }
  };

  // Ejecutar la función obtenerNavegadores al montar el componente
  useEffect(() => {
    obtenerNavegadores();
  }, []);

  return (
    <div className='w-[100vw] h-[100vh] bg-gray-300 px-8'>
      <a href="whatsapp://">Abrir WhatsApp</a>
      <div className='bg-red-500 flex flex-col space-y-4'>
        <input className='bg-blue-500 h-10' type="text" value={enlace} onChange={handleEnlaceChange} placeholder="Ingresa el enlace" />
        <select className='bg-green-500 h-8' value={navegadorSeleccionado} onChange={handleNavegadorChange}>
          <option value="">Seleccionar navegador</option>
          {navegadores.map((navegador) => (
            <option key={navegador} value={navegador}>{navegador}</option>
          ))}
        </select>
        <button onClick={abrirEnlace}>Abrir enlace</button>
        <span>Enlace: {navigator?.userAgent?.toString()}</span>
      </div>
    </div>
  );
}
