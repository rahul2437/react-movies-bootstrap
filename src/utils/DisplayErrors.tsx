export default function DisplayErrors(props: displayErrorProps) {
  return (
    <>
      {props.errors ? (
        <ul style={{ color: "red" }}>
          {props.errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

interface displayErrorProps {
  errors?: string[];
}
