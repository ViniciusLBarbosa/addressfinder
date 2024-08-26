import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [endereco, setEndereco] = useState({})

  function manipularEndereco (evento) {

    const cep = evento.target.value

    setEndereco({
      cep
    })

    if(cep && cep.length === 8) {
        //obter o CEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(resposta => resposta.json())
          .then(dados => {
            setEndereco(enderecoAntigo => {
              return{
                ...enderecoAntigo,
                rua: dados.logradouro,
                unidade: dados.unidade,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf,
              }
            })
          })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='titulo'>Encontre o endereço pelo CEP</h1>
        <input type='number' className='campo-cep' placeholder='Digite o CEP' onChange={manipularEndereco}></input>
        <ul className='lista-endereco'>
          <li>CEP: {endereco.cep}</li>
          <li>Rua: {endereco.rua}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Unidade: {endereco.unidade}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
