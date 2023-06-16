import IndexEntities from "../utils/IndexEntities";
import { actorDTO } from "./actors.model";
import { urlActors } from "../endpoints";

export default function IndexActors() {
  return (
    <>
      <IndexEntities<actorDTO>
        url={urlActors}
        createURL="actors/create"
        title="Actors"
        entityName="Actor"
      >
        {(actors, buttons) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {actors?.map((actor) => (
                <tr key={actor.id} style={{ verticalAlign: "middle" }}>
                  <td>
                    <img
                      style={{
                        width: "48px",
                        height: "64px",
                        objectFit: "cover",
                      }}
                      src={actor.picture}
                      alt=""
                    />
                  </td>
                  <td>{actor.name}</td>
                  <td>{buttons(`actors/edit/${actor.id}`, actor.id)}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntities>
    </>
  );
}
