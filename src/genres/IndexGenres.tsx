import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import IndexEntities from "../utils/IndexEntities";
import { genreDTO } from "./genres.model";

const IndexGenres = () => {
  return (
    <div>
      <IndexEntities<genreDTO>
        url={urlGenres}
        createURL="genres/create"
        title="Genres"
        entityName="Genre"
      >
        {(genres, buttons) => (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {genres?.map((genre) => (
                <tr key={genre.id} style={{ verticalAlign: "middle" }}>
                  <td>
                    <Link to={`/movies/filter?genreId=${genre.id}`}>
                      {genre.name}
                    </Link>
                  </td>
                  <td align="right">
                    {buttons(`genres/edit/${genre.id}`, genre.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntities>
    </div>
  );
};

export default IndexGenres;
