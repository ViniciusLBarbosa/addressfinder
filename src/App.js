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

    if(cep && cep.length > 8) {
      setEndereco(cepNaoEncontrado => {
        return{
          ...cepNaoEncontrado,
          error: 'O CEP deve conter 8 dígitos apenas.'
        }
      })
    }
    if(cep && cep.length < 8) {
      setEndereco(cepNaoEncontrado => {
        return{
          ...cepNaoEncontrado,
          error: 'O CEP deve conter 8 dígitos.'
        }
      })
    }


    if(cep && cep.length === 8) {
        //obter o CEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(resposta => resposta.json())
          .then(dados => {
            setEndereco(enderecoAntigo => {
              return{
                ...enderecoAntigo,
                cepInexistente: dados.erro,
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

  if(endereco.cepInexistente === 'true') {
    setEndereco(cepNaoEncontrado => {
      return{
        ...cepNaoEncontrado,
        cepInexistente: 'CEP não encontrado.'
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='titulo'>Encontre o endereço pelo CEP</h1>
        <input type='number' required minlength="4" maxlength="8" className='campo-cep' placeholder='Digite o CEP' onChange={manipularEndereco}></input>
        <h2 className='erro'>{endereco.error}{endereco.cepInexistente}</h2>
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
