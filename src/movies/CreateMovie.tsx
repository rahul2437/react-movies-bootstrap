import { useEffect, useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import MovieForm from "./MovieForm";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import { movieCreationDTO, moviePostGetDTO } from "./movies.model";
import Loading from "../utils/Loading";
import { convertMovieToFormData } from "../utils/FormDataUtils";
import { useHistory } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateMovie() {
  const [errors, setErrors] = useState([]);

  const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
  /* prettier-ignore */
  const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<movieTheaterDTO[]>([]);

  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const create = async (movie: movieCreationDTO) => {
    try {
      const formData = convertMovieToFormData(movie);
      const response = await axios({
        method: "post",
        url: urlMovies,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push(`/movie/${response.data}`);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${urlMovies}/postget`)
      .then((res: AxiosResponse<moviePostGetDTO>) => {
        setNonSelectedGenres(res.data.genres);
        setNonSelectedMovieTheaters(res.data.movieTheaters);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h3>Create Movie</h3>
      <DisplayErrors errors={errors} />
      {loading ? (
        <Loading />
      ) : (
        <MovieForm
          model={{ title: "", inTheaters: false, trailer: "" }}
          onSubmit={async (values) => {
            await create(values);
          }}
          nonSelectedGenres={nonSelectedGenres}
          selectedGenres={[]}
          nonSelectedMovieTheaters={nonSelectedMovieTheaters}
          selectedMovieTheaters={[]}
          selectedActors={[]}
        />
      )}
    </>
  );
}
