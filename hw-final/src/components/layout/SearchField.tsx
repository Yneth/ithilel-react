import { alpha, InputBase, styled } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SxProps } from "@mui/system/styleFunctionSx";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBox = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    "&:focus": {
      width: "30ch",
    },
  },
}));

const SearchField: FC<{
  sx?: SxProps;
}> = memo(({ sx }) => {
  // query params are used as single source of truth
  // so no need to use redux to store filter params
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("q") || "",
  );

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate({ pathname: "", search: `?q=${searchValue}` });
    },
    [navigate, searchValue],
  );

  return (
    <SearchBox sx={{ my: 1, ...sx }} onSubmit={onSubmit}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search events..."
        inputProps={{ "aria-label": "search" }}
      />
    </SearchBox>
  );
});

export default SearchField;
