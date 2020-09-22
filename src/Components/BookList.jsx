import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import firebaseCalls from "./../Service/firebase";
import Book from "./Book";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

export default function BookList() {
  const classes = useStyles();
  const [sort, setSort] = React.useState("RL");
  const [sortOpen, setSortOpen] = React.useState(false);
  const [books, setBooks] = React.useState([]);

  useEffect(() => {
    firebaseCalls.getBooks().then((res) => {
      setBooks(res);
    });
  }, []);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleClose = () => {
    setSortOpen(false);
  };

  const handleOpen = () => {
    setSortOpen(true);
  };

  let booksList = books.map( (item,index) => {
    return <Grid item key={item.id}  md={3}><Book book={item}  /></Grid>;
  })

  return (
    <Grid container>
      <Grid item md={1}></Grid>
      <Grid container item md={10}>
        <Grid item md={12} className="booklist-details">
          <Typography variant="h6" className="booklist-details-count">
            Books(128 books)
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="controlled-open-select-label"
              id="controlled-open-select"
              open={sortOpen}
              onClose={handleClose}
              onOpen={handleOpen}
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value={"RL"}>Sort by relevance</MenuItem>
              <MenuItem value={"LH"}>Price: Low to High</MenuItem>
              <MenuItem value={"HL"}>Price: High to Low</MenuItem>
              <MenuItem value={"NW"}>Newest Arrival</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container spacing={3} item md={12} className="booklist-books">
          {booksList}
        </Grid>
      </Grid>
      <Grid item md={1}></Grid>
    </Grid>
  );
}
