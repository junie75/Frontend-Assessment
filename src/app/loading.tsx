//Loading indicator component

import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
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
        p: 10,
      }}
    >
      <CircularProgress enableTrackSlot size="10rem" />
    </Box>
  );
}
