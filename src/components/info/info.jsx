import { BsFillInfoSquareFill } from "react-icons/bs";
import "./info.css";

export default function Info() {
  return (
    <>
      <div className="container">
        <div className="content">
          <BsFillInfoSquareFill />

          <div className="infoText">
            <h1>Infos</h1>
            <ul>
              <li>
                Insira a url e clique no botão para adicionar no Banco de dados
              </li>
              <li>
                <b>CASO ESTIVER DANDO ERRO, TENTE MAIS DE UMA VEZ </b>{" "}
              </li>
              <li>
                Para Consultar as tags, insira uma URL já cadastrada no Banco de
                Dados
              </li>
              <li>Se não aparecer os dados, atualize a pagina</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
