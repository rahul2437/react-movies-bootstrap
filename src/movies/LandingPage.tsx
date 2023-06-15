import { useEffect, useState } from "react";
import { landingPageDTO } from "./movies.model";
import MoviesList from "./MoviesList";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";

export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    axios.get(urlMovies).then((res: AxiosResponse<landingPageDTO>) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <>
      <h3>In Theaters</h3>
      <MoviesList movies={movies.inTheaters} />

      <h3>Upcoming Releases</h3>
      <MoviesList movies={movies.upcomingReleases} />
    </>
  );
}
