export default function OutputText({
  res,
}: {
  res: { output: string; error: string };
}) {
  return (
    <>
      {res.error ? (
        <p className="text-red-500">Error: {res.error}</p>
      ) : (
        res.output.split("\n").map((str, index) => <p key={index}>{str}</p>)
      )}
    </>
  );
}
