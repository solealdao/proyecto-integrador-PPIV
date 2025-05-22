'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/PageLayout';

const Titulo = styled.h4`
  margin-bottom: 20px;
  color: ${theme.colors.darkGreen};
`;

const Alerta = styled.div`
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 30px;
  ol {
    margin: 0;
    padding-left: 20px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 10px;
`;

const Mensaje = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.tipo === 'paciente' ? 'flex-end' : 'flex-start')};
  background-color: ${(props) =>
    props.tipo === 'paciente' ? '#d4edda' : '#cce5ff'};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 10px;
  max-width: 70%;
  text-align: ${(props) => (props.tipo === 'paciente' ? 'right' : 'left')};
`;

const Fecha = styled.small`
  display: block;
  margin-top: 4px;
  color: #6c757d;
`;

const AreaMensaje = styled.textarea`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 12px 30px;
  background-color: ${theme.colors.green};
  color: ${theme.colors.yellow};
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  font-family: Mulish, sans-serif;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.darkGreen};
  }
`;

const Controles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export default function MensajesPage() {
  const [mensajes, setMensajes] = useState([]);
  const [mensajeNuevo, setMensajeNuevo] = useState('');
  const [limiteCaracteres, setLimiteCaracteres] = useState(300);
  const router = useRouter();

  useEffect(() => {
    // Simula fetch de mensajes anteriores
    const mensajesEjemplo = [
      { remitente: 'medico', texto: 'Hola, ¿cómo te sentís?', fecha: '2024-11-04 10:00' },
      { remitente: 'paciente', texto: 'Me siento mejor, gracias.', fecha: '2024-11-04 11:00' }
    ];
    setMensajes(mensajesEjemplo);
  }, []);

  const handleEnviarMensaje = () => {
    if (mensajeNuevo.trim() === '') return;

    const nuevoMensaje = {
      remitente: 'paciente',
      texto: mensajeNuevo,
      fecha: new Date().toLocaleString()
    };

    setMensajes([...mensajes, nuevoMensaje]);
    setMensajeNuevo('');
  };

    const handleCancelar = () => {
    router.push('/patient-home');
  };

  return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Mensajería"
			showClock={true}
		>

      <Alerta>
        <strong>Estimado/a paciente:</strong>
        <ol>
          <li>Esta vía de comunicación no es para urgencias.</li>
          <li>Su médico/a recibirá el mensaje exclusivamente los días hábiles de 8 a 20 hs.</li>
          <li>Responderá dentro de las 48 hs hábiles desde la recepción de su mensaje.</li>
        </ol>
      </Alerta>

      <ChatContainer>
        {mensajes.map((msg, idx) => (
          <Mensaje key={idx} tipo={msg.remitente}>
            {msg.texto}
            <Fecha>{msg.fecha}</Fecha>
          </Mensaje>
        ))}
      </ChatContainer>

      <AreaMensaje
        rows={4}
        placeholder="Escriba su mensaje..."
        value={mensajeNuevo}
        onChange={(e) => {
          if (e.target.value.length <= limiteCaracteres) {
            setMensajeNuevo(e.target.value);
          }
        }}
      />

      <Controles>
        <small>{mensajeNuevo.length}/{limiteCaracteres}</small>
        <ButtonGroup>
            <Button onClick={handleCancelar}>Cancelar</Button>
            <Button onClick={handleEnviarMensaje}>Enviar mensaje</Button>
        </ButtonGroup>      
      </Controles>
    </PageLayout>
  );
}
