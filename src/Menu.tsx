import { NavLink } from "react-router-dom";
import { MdTheaters } from "react-icons/md";
export default function Menu() {
  return (
    <nav
      style={{ backgroundColor: "#d3e5e8" }}
      className="navbar navbar-expand-lg navbar-light"
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand bg-dark px-2 rounded" to="/">
          <MdTheaters color="964B00" fontSize={"40px"} />
          <span className="text-white fw-bold">Movies</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/genres">
                Genres
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies/filter">
                Filter Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/actors">
                Actors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movietheaters">
                Movie Theaters
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies/create">
                Create a Movie
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
