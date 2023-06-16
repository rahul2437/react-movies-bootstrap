import { Field, Form, Formik } from "formik";
import { genreDTO } from "../genres/genres.model";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres, urlMovies } from "../endpoints";
import { movieDTO } from "./movies.model";
import MoviesList from "./MoviesList";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../utils/Pagination";

export default function FilterMovies() {
  const history = useHistory();

  const initialValues: filterMoviesForm = {
    title: "",
    genreId: 0,
    upcomingReleases: false,
    inTheaters: false,
    page: 1,
    recordsPerPage: 10,
  };

  const [genres, setGenres] = useState<genreDTO[]>([]);
  const [movies, setMovies] = useState<movieDTO[]>([]);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const query = new URLSearchParams(useLocation().search);

  const searchMovies = (values: filterMoviesForm) => {
    modifyUrl(values);
    axios
      .get(`${urlMovies}/filter`, { params: values })
      .then((res: AxiosResponse<movieDTO[]>) => {
        const records = +res.headers["totalamountofrecords"];
        setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
        setMovies(res.data);
      });
  };

  const modifyUrl = (values: filterMoviesForm) => {
    const queryStrings: string[] = [];
    if (values.title) queryStrings.push(`title=${values.title}`);
    if (values.genreId) queryStrings.push(`genreId=${values.genreId}`);
    if (values.upcomingReleases)
      queryStrings.push(`upcomingReleases=${values.upcomingReleases}`);
    if (values.inTheaters) queryStrings.push(`inTheaters=${values.inTheaters}`);
    queryStrings.push(`page=${values.page}`);
    history.push(`/movies/filter?${queryStrings.join("&")}`);
  };

  useEffect(() => {
    axios.get(`${urlGenres}/all`).then((res: AxiosResponse<genreDTO[]>) => {
      setGenres(res.data);
    });
  }, []);

  useEffect(() => {
    if (query.get("title")) {
      initialValues.title = query.get("title")!;
    }
    if (query.get("genreId")) {
      initialValues.genreId = +query.get("genreId")!;
    }
    if (query.get("upcomingReleases")) {
      initialValues.upcomingReleases = true;
    }
    if (query.get("inTheaters")) {
      initialValues.inTheaters = true;
    }
    if (query.get("page")) {
      initialValues.page = +query.get("page")!;
    }
    if (query.get("recordsPerPage")) {
      initialValues.recordsPerPage = +query.get("recordsPerPage")!;
    }
    searchMovies(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.page = 1;
          searchMovies(values);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <h3>Filter Movies</h3>
              <div className="row gx-3 align-items-center mb-3">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title of the movie"
                    {...formikProps.getFieldProps("title")}
                  />
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    {...formikProps.getFieldProps("genreId")}
                  >
                    <option value="0">--Choose a genre--</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="upcomingReleases"
                      name="upcomingReleases"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="upcomingReleases"
                    >
                      Upcoming Releases
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="inTheaters"
                      name="inTheaters"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="inTheaters">
                      In Theaters
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <Button
                    className="btn btn-primary"
                    onClick={() => formikProps.submitForm()}
                  >
                    Filter
                  </Button>
                  <Button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      formikProps.setValues(initialValues);
                      searchMovies(initialValues);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Form>
            <MoviesList movies={movies} />
            <Pagination
              totalAmountOfPages={totalAmountOfPages}
              currentPage={formikProps.values.page}
              onChange={(newPage) => {
                formikProps.values.page = newPage;
                searchMovies(formikProps.values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}

interface filterMoviesForm {
  title: string;
  genreId: number;
  upcomingReleases: boolean;
  inTheaters: boolean;
  page: number;
  recordsPerPage: number;
}
