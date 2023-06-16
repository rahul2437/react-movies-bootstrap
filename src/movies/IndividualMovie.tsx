import { movieDTO } from "./movies.model";
import css from "./IndividualMovie.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";

export default function IndividualMovie(props: movieDTO) {
  const buildLink = () => `/movies/${props.id}`;

  const customAlert = useContext(AlertContext);

  const deleteMovie = () => {
    axios.delete(`${urlMovies}/${props.id}`).then(() => {
      customAlert();
    });
  };

  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img alt="Poster" src={props.poster} />
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <div>
        <Link
          style={{ marginRight: "1rem" }}
          className="btn btn-info"
          to={`/movies/edit/${props.id}`}
        >
          Edit
        </Link>
        <Button
          className="btn btn-danger"
          onClick={() => customConfirm(() => deleteMovie())}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
