import PropTypes from 'prop-types'

function Titulo({ children }){
    return (
        <h2>{children}</h2>
    )
}

Titulo.propTypes = {
    children: PropTypes.string
}

export default Titulo