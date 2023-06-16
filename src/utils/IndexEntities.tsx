import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./customConfirm";
import RecordsPerPageSelect from "./RecordsPerPageSelect";
import Pagination from "./Pagination";
import GenericList from "./GenericList";
import { ReactElement } from "react-markdown";

export default function IndexEntities<T>(props: indexEntitiesProps<T>) {
  const [entities, setEntities] = useState<T[]>();
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const loadData = () => {
    axios
      .get(props.url, {
        params: {
          page: page,
          recordsPerPage: recordsPerPage,
        },
      })
      .then((res: AxiosResponse<T[]>) => {
        const totalAmountOfPages = parseInt(
          res.headers["totalamountofrecords"]
        );
        setTotalAmountOfPages(Math.ceil(totalAmountOfPages / recordsPerPage));
        setEntities(res.data);
      });
  };

  const deleteEntity = async (id: number) => {
    try {
      await axios.delete(`${props.url}/${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const buttons = (editUrl: string, id: number) => {
    return (
      <>
        <Link className="btn btn-success" to={editUrl}>
          Edit
        </Link>
        <Button
          className="btn btn-danger"
          onClick={() => customConfirm(() => deleteEntity(id))}
        >
          Delete
        </Button>
      </>
    );
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  return (
    <>
      <h3>{props.title}</h3>
      <Link className="btn btn-primary" to={props.createURL}>
        Create {props.entityName}
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

      <GenericList list={entities}>
        <table className="table table-striped">
          {props.children(entities!, buttons)}
        </table>
      </GenericList>
    </>
  );
}

interface indexEntitiesProps<T> {
  url: string;
  title: string;
  createURL: string;
  entityName: string;
  children(
    entities: T[],
    buttons: (editUrl: string, id: number) => ReactElement
  ): ReactElement;
}
