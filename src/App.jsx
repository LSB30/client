import React, { useEffect, useState } from "react";
import { load } from "cheerio";
import Axios from "axios";
import Info from "./components/info/info";

function App() {
  const [url, setUrl] = useState("");
  const [tagCount, setTagCount] = useState({});
  const [listTags, setListTags] = useState([]);

  const handleFetchTags = async () => {
    const tagsToSend = Object.entries(tagCount).map(([tagName, count]) => ({
      name: tagName,
      quantidade: count,
    }));

    try {
      const response = await fetch(url);
      const html = await response.text();

      const $ = load(html);
      const tags = {};

      $("*").each((index, element) => {
        const tagName = element.name;
        tags[tagName] = tags[tagName] ? tags[tagName] + 1 : 1;
      });

      setTagCount(tags);
      setUrl(url);
      Axios.post("https://backendcontadortags.vercel.app/tagshtml", {
        url: url,
        tags: tagsToSend,
      })
        .then((response) => {
          console.log("Dados enviados com sucesso:", response.data);
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao enviar os dados:", error.message);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao coletar as tags:", error.message);
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getTagsByUrl?url=${url}`)
      .then((resp) => {
        setListTags(resp.data.tags);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao buscar as tags:", error.message);
      });
  }, [url]);

  return (
    <>
      <div>
        <h1>Contador de Tags HTML</h1>
        <div>
          <label htmlFor="inputUrl">URL:</label>
          <input
            type="text"
            id="inputUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Insira sua URL"
          />
          <button onClick={handleFetchTags}>Enviar tags</button>
        </div>
        <div>
          <h2>Contagem de Tags da URL: {url}</h2>
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {listTags.map((tag, index) => (
                <tr key={index}>
                  <td>{tag.name}</td>
                  <td>{tag.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Info />
    </>
  );
}

export default App;
