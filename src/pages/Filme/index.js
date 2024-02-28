import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

import api from '../../services/api';

import './filme-info.css'

function Filme() {
  const {id} = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "6e0f2354253cbc81f0230ee6c36460f5",
          language: "pt-BR",
        }
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {  
        navigation("/", { replace: true });
        return;
      })
    }

    loadFilme();

    return () => {

    }
  }, [navigation, id])

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@megafilmeshd");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if(hasFilme) {
      toast.warn("Esse filme já está salvo!")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@megafilmeshd", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")
  }

  if(loading) {
    return(
      <div className="filme-info">
        <h1>Carregando detalhes do filme...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

      <h3>Sinopse</h3>
      <span>{filme.overview}s</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>  
  )
}

export default Filme;