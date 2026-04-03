// Page shell for home page

import { Box } from "@mui/material";
import OpView from "../../components/OpView";
import { Op } from "../../types";

//function to fetch data
const fetchData = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("https://frontend-challenge.veryableops.com/");

  //if there is an issue with fetch throw error
  if (!res.ok) {
    // return jsonData;   // -- uncomment for when working from a diff location and diff ip address
    throw new Error("Failed to fetch operations data, please try again later.");
  }

  //read the json data
  const data = await res.json();
  return data;
};

export default async function Home() {
  const data = await fetchData();

  const ops: Op[] = data ?? []; //cast data to Op array, if no data make empty array

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
        p: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <OpView ops={ops} />
    </Box>
  );
}
