import rodape from './rodape.module.css'

function Rodape (){
    return (
        <footer className={'container-fluid text-center mt-5 bg-dark text-light ' + rodape.rodape}>
            <p className='p-3'>&copy; 2024. Todos os direitos reservados.</p>
        </footer>
    )
}

export default Rodape