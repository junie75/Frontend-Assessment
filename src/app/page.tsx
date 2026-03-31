import { Container, Stack, Typography, Box } from "@mui/material";
import OperatorView from "@/../components/OperatorView";
import OpView from "../../components/OpView";
import { Op } from "../../types";

export default async function Home() {
  const res = await fetch("https://frontend-challenge.veryableops.com/");
  const data = await res.json();

  const ops: Op[] = data ?? [];

  console.log(data[0]);
  console.log("testing baby");
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "captain.one",
      }}
    >
      <Stack spacing={4}>
        {ops.map((op) => (
          <OpView op={op} key={op.publicId} />
        ))}
      </Stack>
    </Box>
  );
}
