import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import { genreDTO } from "./genres.model";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";

const IndexGenres = () => {
  const [genres, setGenres] = useState<genreDTO[]>();

  useEffect(() => {
    console.log({ urlGenres });

    axios.get(urlGenres).then((res: AxiosResponse<genreDTO[]>) => {
      setGenres(res.data);
    });
  }, []);

  return (
    <div>
      <Link className="btn btn-primary" to="/genres/create">
        Create genre
      </Link>
      <GenericList list={genres}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.name}</td>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`/genres/edit/${genre.id}`}
                  >
                    Edit
                  </Link>
                  <Button className="btn btn-danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </div>
  );
};

export default IndexGenres;
