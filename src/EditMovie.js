import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory, useParams } from "react-router-dom";
import { API } from "./global";

export function EditMovie({movieList, setMovieList}) {
  const {id} = useParams();
 // const movie = movieList[id];
  //console.log(movie);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
   fetch(`${API}/movies/${id}`,{
    method: "GET",
})
.then((data) => data.json())
.then((mv) => setMovie(mv))
.catch((err) => console.log(err));
  }, []);
  
  console.log(movie);

  return(
  <div>
    {movie ? <EditMovieForm movie={movie}/> : <h2>Loading</h2>}
  </div>
  );
}

function EditMovieForm({movie}){
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [summary, setSummary] = useState(movie.summary);
  const [trailer, setTrailer] = useState(movie.trailer);
  const history = useHistory();
  
  return(
    <div className="add-movie-form">
     <TextField 
     value={name}
     onChange={(event) => setName(event.target.value)}
      label="Name" 
      variant="outlined" />
      <TextField 
      value={poster}
      type="text"
       label="Poster" 
       onChange={(event) => setPoster(event.target.value)} />
      <TextField 
      value={rating}
      type="text" 
      label="Rating" 
      onChange={(event) => setRating(event.target.value)} />
      <TextField 
      value={summary}
      type="text" 
      label="Summary" 
      onChange={(event) => setSummary(event.target.value)} />
      <TextField 
      value={trailer}
      type="text" 
      label="Trailer" 
      onChange={(event) => setTrailer(event.target.value)} />
   
    <Button onClick={() => {
      const updatedMovie = {
        name: name,
        poster: poster,
        rating: rating,
        summary: summary,
        trailer: trailer,
      };
     // const copyMovieList = [...movieList];
      //copyMovieList[id] = updatedMovie;
     //setMovieList(copyMovieList);
      //history.push("/movies");
      fetch(`${API}/movies/${movie.id}`,{
        method: "PUT",
        body: JSON.stringify(updatedMovie),
        headers:{"Content-Type": "application/json",
      },
      }).then(() => history.push("/movies"));
    }} 
    variant="contained"
    color="success">Save</Button>
  </div>
  )
}




