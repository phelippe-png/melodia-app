import { useRef } from "react";
import HTTP from "./HTTP";

const SearchMusics = async (url, type, callback) => {
  let route

  switch (type) {
    case 'ultimas':
      route = '/api/v1/historico/acoes/usuario/1'
      break;
    case 'artistas':
      route = '/api/v1/ranking/artistas/usuario/1'
      break;
    case 'musicas':
      route = '/api/v1/musicas?page=1'
      break;
    case 'playlists':
      route = '/api/v1/playlists'
      break;
    default:
      route = ''
      break;
  }

  try {
    const response = await HTTP(url).get(route)
    callback(response.data)
  } catch (error) {
    console.log(error+' | '+route)
    return error
  }
}

export default SearchMusics