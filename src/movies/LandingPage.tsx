import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.model";

export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios.get(urlMovies).then((res: AxiosResponse<landingPageDTO>) => {
      setMovies(res.data);
    });
  };

  return (
    <>
      <AlertContext.Provider
        value={() => {
          loadData();
        }}
      >
        <h3>In Theaters</h3>
        <MoviesList movies={movies.inTheaters} />

        <h3>Upcoming Releases</h3>
        <MoviesList movies={movies.upcomingReleases} />
      </AlertContext.Provider>
    </>
  );
}
