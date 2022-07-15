import { Movie } from "./Movie";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./global";

//const API = "https://6212261b01ccdac074334c70.mockapi.io"

export function MovieList() {
  const history = useHistory();
  const [movieList, setMovieList] = useState([]);

  const getMovies = () => {
    fetch(`${API}/movies`,{
  method: "GET",
})
.then((data) => data.json())
.then((mvs) => setMovieList(mvs));
  };

useEffect(()=> getMovies(),[]);

const deleteMovie = (id) => {
  fetch(`${API}/movies/${id}`, 
  {method: "DELETE",
}).then(() => getMovies());
};

  return (
  <div className="movie-list">
    {movieList.map(({name, poster, rating, summary, id }, index) => (
      <Movie
       key={index}
       name={name}
       poster={poster} 
       rating={rating}
        summary={summary}
        deleteButton={
          <IconButton 
          style={{ marginLeft: "auto"}}
          onClick={( )=> deleteMovie(id)} 
          aria-label="delete"
          color="error">
  <DeleteIcon />
</IconButton>
        }
        editButton={
          <IconButton 
          onClick={( )=> history.push(`/movies/edit/${id}`)}
          aria-label="delete"
          color="secondary">
  <EditIcon />
</IconButton>
        }
        id={id}
 />
    ))}
  </div>
  );
}
