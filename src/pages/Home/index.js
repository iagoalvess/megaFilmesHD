import { useEffect, useState } from "react";
import api from '../../services/api'

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
          api_key: "6e0f2354253cbc81f0230ee6c36460f5",
          language: "pt-BR",
          page: 1,
        }
      })

      console.log(response.data.results);
    }

    loadFilmes();
  }, [])

  return(
    <div>
      <h1>TESTE HOME</h1>
    </div>
  )
}

export default Home;