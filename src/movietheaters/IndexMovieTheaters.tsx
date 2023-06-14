import IndexEntities from "../utils/IndexEntities";
import { movieTheaterDTO } from "./movieTheater.model";
import { urlMovieTheaters } from "../endpoints";

export default function IndexMovieTheaters() {
  return (
    <>
      <IndexEntities<movieTheaterDTO>
        url={urlMovieTheaters}
        createURL="movietheaters/create"
        title="Movie Theaters"
        entityName="Movie Theater"
      >
        {(movieTheaters, buttons) => (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movieTheaters?.map((movieTheater) => (
                <tr key={movieTheater.id}>
                  <td>{movieTheater.name}</td>
                  <td>
                    {buttons(
                      `movietheaters/edit/${movieTheater.id}`,
                      movieTheater.id
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntities>
    </>
  );
}
