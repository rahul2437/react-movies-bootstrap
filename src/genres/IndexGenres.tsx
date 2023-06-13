import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import { genreDTO } from "./genres.model";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import customConfirm from "../utils/customConfirm";

const IndexGenres = () => {
  const [genres, setGenres] = useState<genreDTO[]>();

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const loadData = () => {
    axios
      .get(urlGenres, {
        params: {
          page: page,
          recordsPerPage: recordsPerPage,
        },
      })
      .then((res: AxiosResponse<genreDTO[]>) => {
        const totalAmountOfPages = parseInt(res.headers["totalamoutofrecords"]);
        setTotalAmountOfPages(Math.ceil(totalAmountOfPages / recordsPerPage));
        setGenres(res.data);
      });
  };

  const deleteGenre = async (id: number) => {
    try {
      await axios.delete(`${urlGenres}/${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  return (
    <div>
      <h3>Genres</h3>
      <Link className="btn btn-primary" to="/genres/create">
        Create genre
      </Link>

      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      />

      <Pagination
        currentPage={page}
        totalAmountOfPages={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />
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
                  <Button
                    className="btn btn-danger"
                    onClick={() => customConfirm(() => deleteGenre(genre.id))}
                  >
                    Delete
                  </Button>
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
