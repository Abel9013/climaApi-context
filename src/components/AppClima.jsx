import Resultado from "./Resultado"
import Formulario from "./Formulario"
import useClima from "../hooks/useClima"
import Loading from "./Loading"
const AppClima = () => {
  const { resultado, cargando, noResultado } = useClima()
  return (
    <>
        <main className="dos-columnas">
            <Formulario />
            
            {
              cargando ? <Loading /> :
              resultado?.name ? <Resultado /> : noResultado ? <p>{noResultado}</p> : null
            }
        </main>
    </>
  )
}

export default AppClima