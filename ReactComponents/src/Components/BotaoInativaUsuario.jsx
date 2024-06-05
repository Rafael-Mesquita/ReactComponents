import PropTypes from 'prop-types'

function BotaoInativaUsuario({acao, usuario, children}){
    
    return (
        <button className='btn btn-danger btn-sm' onClick={() => acao(usuario.id)}>{children}</button>
    )
}

BotaoInativaUsuario.propTypes = {
    acao: PropTypes.any,
    usuario: PropTypes.object,
    children: PropTypes.string
}

export default BotaoInativaUsuario