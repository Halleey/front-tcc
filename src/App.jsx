import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <p>Ola</p>
      <nav>
        <ul>
          <li>\
          </li>
            <Link to="/home">Home</Link>
          <li>
            <Link to="/cadastro">Cadastro</Link>
          </li>
          {/* Adicione mais links conforme necessário */}
        </ul>
      </nav>
    </div>
  );
}

export default App;