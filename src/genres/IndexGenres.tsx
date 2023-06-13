import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import { genreDTO } from "./genres.model";

const IndexGenres = () => {
  useEffect(() => {
    console.log({ urlGenres });

    axios
      .get(urlGenres)
      .then((res: AxiosResponse<genreDTO[]>) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Link className="btn btn-primary" to="/genres/create">
        Create genre
      </Link>
    </div>
  );
};

export default IndexGenres;
