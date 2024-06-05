import PropTypes from 'prop-types'

function Botao({ tipo, acao, children }){

    const tiposDeBotao = {
        "success" : "btn btn-success btn-sm",
        "danger" : "btn btn-danger btn-sm",
        "warning" : "btn btn-warning btn-sm",
        "default" : "btn btn-default btn-sm"
    }

    if(tipo == null || tipo == ""){
        tipo = "default"
    }

    return (
        <button className={tiposDeBotao[tipo]} onClick={acao}>{children}</button>
    )
}

Botao.propTypes = {
    children: PropTypes.string,
    acao: PropTypes.func,
    tipo: PropTypes.string
}

export default Botao