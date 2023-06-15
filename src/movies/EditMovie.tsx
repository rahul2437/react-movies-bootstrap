import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlMovies } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertMovieToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviePutGetDTO } from "./movies.model";

export default function EditMovie() {
  const { id }: any = useParams();

  const history = useHistory();

  const [errors, setErrors] = useState();

  const [movie, setMovie] = useState<movieCreationDTO>();

  const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();

  useEffect(() => {
    axios
      .get(`${urlMovies}/putget/${id}`)
      .then((res: AxiosResponse<moviePutGetDTO>) => {
        const model: movieCreationDTO = {
          title: res.data.movie.title,
          inTheaters: res.data.movie.inTheaters,
          trailer: res.data.movie.trailer,
          releaseDate: new Date(res.data.movie.releaseDate),
          summary: res.data.movie.summary,
          posterURL: res.data.movie.poster,
        };
        setMovie(model);
        setMoviePutGet(res.data);
      });
  }, []);

  const edit = async (movieToEdit: movieCreationDTO) => {
    try {
      const formData = convertMovieToFormData(movieToEdit);
      await axios({
        method: "put",
        url: `${urlMovies}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push(`/movies/${id}`);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <>
      <h3>Edit Movie</h3>
      <DisplayErrors errors={errors} />
      {movie && moviePutGet ? (
        <MovieForm
          model={movie}
          onSubmit={async (values) => await edit(values)}
          nonSelectedGenres={moviePutGet.nonSelectedGenres}
          selectedGenres={moviePutGet.selectedGenres}
          nonSelectedMovieTheaters={moviePutGet.nonSelectedMovieTheaters}
          selectedMovieTheaters={moviePutGet.selectedMovieTheaters}
          selectedActors={moviePutGet.actors}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
