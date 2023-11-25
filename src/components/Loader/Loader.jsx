import PropTypes from "prop-types";
import { Box, LinearProgress } from "@mui/material";

const Loader = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </>
  );
};

Loader.propTypes = {
  isxLarge: PropTypes.bool,
  size: PropTypes.string,
};

export default Loader;
