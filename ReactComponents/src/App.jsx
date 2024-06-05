import axios from 'axios'
import { useState, useEffect } from 'react'
import Botao from './Components/Botao.jsx'
import Cabecalho from './Components/Cabecalho.jsx'
import Rodape from './Components/Rodape/index.jsx'
import Titulo from './Components/Titulo.jsx'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [erro, setErro] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nome, setNome] = useState("")

  useEffect(() => {
    if(isLoading){
      axios.get(`http://localhost:3000/usuarios`)
        .then(res => {
          setUsuarios(res.data)
          setIsLoading(false)
        })
        .catch(res => {
          console.log(res.data)
          setErro("Não foi possível carregar a lista de usuários.")
        })
    }
  }, [isLoading, nome])

  function mascararEmail(email){
    let emailMascarado = email[0]
    let mostrarCaracter = false

    for(let i = 1; i < email.length; i++){
      if(email[i] == '@'){
        mostrarCaracter = true
      }

      if(!mostrarCaracter){
        emailMascarado += '*'
      }else{
        emailMascarado += email[i]
      }
    }

    return emailMascarado
  }

  function inativarUsuario(id){
    // PATCH
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 0 })
      .then(res => {
        console.log(res.data)
        setIsLoading(true) 
      })
      .catch(res => {
        console.log(res.data)
        setErro("Não foi possível atualizar os dados do usuário.")
      })
  }

  function ativarUsuario(id){
    
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 1 })
      .then(res => {
        console.log(res.data)
        setUsuarios([])
      })
      .catch(res => {
        console.log(res.data)
        setErro("Não foi possível atualizar os dados do usuário.")
      })
  }

  function atualizaNome(event){
    setNome(event.target.value)
  }


    return (
      <>
        <Cabecalho />
        
        <main className='container-lg mt-5'>
          <div className='row'>
            <div className='col-3'>
              <label htmlFor="_nome">Nome</label>
              <input type="text" id="_nome" placeholder="Digite para pesquisar" className='form-control' onChange={atualizaNome} value={nome} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Titulo>Usuários Cadastrados</Titulo>
              { erro && <div className='alert alert-danger'>{erro}</div> }
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Usuário GH</th>
                    <th>E-mail</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usuarios.map(usuario => {
                      return (
                        <tr key={usuario.id}>
                          <td>{usuario.id}</td>
                          <td>{usuario.nome}</td>
                          <td>{usuario.login}</td>
                          <td>{mascararEmail(usuario.email)}</td>
                          <td>
                            {
                              usuario.ativo == 1 && <Botao tipo="danger" acao={() => inativarUsuario(usuario.id)}>Desativar</Botao>
                            }
                            {
                              usuario.ativo == 0 && <Botao tipo="success" acao={() => ativarUsuario(usuario.id)}>Ativar</Botao>
                            }
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </main>
  
        <Rodape />
      </>
    )
  
  
  
}

export default App