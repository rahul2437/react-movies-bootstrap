export default function DisplayErrors(props: displayErrorProps) {
  console.log(props.errors);
  return (
    <>
      {Array.isArray(props.errors) ? (
        <ul style={{ color: "red" }}>
          {props.errors?.map((err, idx) => (
            <li key={idx}>{err ? err : ""}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

interface displayErrorProps {
  errors?: string[];
}
