import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertActorToFormData } from "../utils/FormDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.model";

export default function EditActor() {
  const transform = (actor: actorDTO): actorCreationDTO => {
    return {
      name: actor.name,
      pictureURL: actor.picture,
      biography: actor.biography,
      dateOfBirth: new Date(actor.dateOfBirth),
    };
  };

  return (
    <>
      <EditEntity<actorCreationDTO, actorDTO>
        entityName="Actor"
        url={urlActors}
        indexURL="/actors"
        transformFormData={convertActorToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <ActorForm
            model={entity}
            onSubmit={async (value) => {
              await edit(value);
            }}
          />
        )}
      </EditEntity>
    </>
  );
}
