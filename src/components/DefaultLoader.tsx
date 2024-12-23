import CircleLoader from "react-spinners/CircleLoader";

export default function DefaultLoader({ loading }: { loading: true }) {
  return (
    <CircleLoader
      color={"#14ae5c"}
      loading={loading}
      //   success={success && 'Successful!'}
      cssOverride={{
        top: "50%",
        left: "50%",
        display: "block",
        margin: "auto auto",
        borderColor: "green",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}