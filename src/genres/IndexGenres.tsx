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
                <tr key={genre.id}>
                  <td>{genre.name}</td>
                  <td>{buttons(`genres/edit/${genre.id}`, genre.id)}</td>
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
