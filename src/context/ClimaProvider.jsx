import { useState, createContext } from "react";
import axios from "axios"

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {
    
    // console.log(import.meta.env.VITE_API_KEY);
    const [busqueda, setBusqueda] = useState({
        ciudad:'',
        pais:''
    })
    const [resultado, setResultado] = useState({})
    const [cargando, setCargando] = useState(false)
    const [noResultado, setNoResultado] = useState(false)
    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }
    const consultarClima = async datos => {
        setCargando(true)
        setNoResultado(false)
        try {
            const{ciudad, pais} = datos
            const  appId = import.meta.env.VITE_API_KEY
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
            const {data }= await axios(url) 
            const {lat, lon} = data[0] 
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data:clima } = await axios(urlClima)
            setResultado(clima);
        } catch (error) {
            setNoResultado("No hay resultados");
        } finally {
            setCargando(false)
        }
    }

    return(
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                resultado,
                cargando,
                noResultado
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
} 

export {
    ClimaProvider
}
export default ClimaContext
// 1) creo mi carpeta context, en el mi provider(climaProvider.jsx)
// 2) En mi archivo provider importo: import { useState, createContext } from "react";
// 3) Una vez creado mi context y mi provider, los exporto hacia mi app
