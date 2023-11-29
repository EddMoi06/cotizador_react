import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../Hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497ff;
    font-family: 'Lato', sans-serif;
    width: 100%;
    padding: 10px 0;
    text-transform: uppercase;
    color: #FFF;
    font-weight: 700;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    transition: .3s ease;

    &:hover{
        background-color: #7a7bfe;
        cursor: pointer;
    }
`

const Formulario = () => {

    const [ criptos, setCriptos] = useState([])
    const [ error, setError] = useState(false)
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas);
    const [ criptomoneda, SelectCripto ] = useSelectMonedas('Elige tu Cripto', criptos);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`
        
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            
            const arregloAPI = resultado.Data.map(cripto => {
                const {CoinInfo:{Name, FullName}} = cripto

                const objeto = {
                    id: Name, nombre: FullName
                }

                return objeto
            })

            setCriptos(arregloAPI)
        }

        consultarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, criptomoneda].includes('')){
            setError(true)
            return
        }
    }


    return (
        <div>
            {error && (<p>Todos los Campos son Obligatorios</p>) }

            <form 
                action="" 
                onSubmit={handleSubmit}
            >
                <SelectMonedas/>
                <SelectCripto/>

                <InputSubmit 
                    type="submit" 
                    value="cotizar" 
                />

            </form>
        </div>
    )
}

export default Formulario
