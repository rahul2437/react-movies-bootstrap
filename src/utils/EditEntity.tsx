import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loading from "./Loading";
import DisplayErrors from "./DisplayErrors";
import { ReactElement } from "react-markdown";

export default function EditEntity<TCreation, TRead>(
  props: editEntityProps<TCreation, TRead>
) {
  const { id }: any = useParams();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    document.title = "Edit Genre";
    axios.get(`${props.url}/${id}`).then((res: AxiosResponse<TRead>) => {
      setEntity(props.transform(res.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edit = async (entityToEdit: TCreation) => {
    try {
      if (props.transformFormData) {
        const formData = props.transformFormData(entityToEdit);
        await axios({
          method: "put",
          url: `${props.url}/${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`${props.url}/${id}`, entityToEdit);
      }
      history.push(props.indexURL);
    } catch (error: any) {
      console.log(error);

      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <>
      <h3>Edit {props.entityName}</h3>
      <DisplayErrors errors={errors} />
      {entity ? props.children(entity, edit) : <Loading />}
    </>
  );
}

interface editEntityProps<TCreation, TRead> {
  url: string;
  entityName: string;
  indexURL: string;
  transform(entity: TRead): TCreation;
  transformFormData?(model: TCreation): FormData;
  children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
