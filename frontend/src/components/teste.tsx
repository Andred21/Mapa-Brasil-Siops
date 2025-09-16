import React, { useEffect, useState } from 'react';
import api from '@/services/api';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    api.get('/hello').then(response => {
      setMensagem(response.data.mensagem);
    });
  }, []);

  return <h1>{mensagem}</h1>;
}

export default App;
