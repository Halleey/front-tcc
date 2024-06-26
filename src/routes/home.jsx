import React from 'react'
import { Link } from 'react-router-dom';
function Home() {
  

  return (
      <div>
      <p>Home page</p>
      
      <nav>
        <ul>
          <li>
          </li>
            <Link to="/cadastro">Cadastro</Link>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Adicione mais links conforme necessário */}
        </ul>
      </nav>

      </div>
      
  )
}

export default Home
