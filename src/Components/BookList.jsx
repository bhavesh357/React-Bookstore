import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import firebaseCalls from "./../Service/firebase";
import Book from "./Book";
import { Pagination } from "@material-ui/lab";
import { findIndex } from "lodash";

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

export default function BookList(props) {
  const classes = useStyles();
  const [sort, setSort] = React.useState("RL");
  const [sortOpen, setSortOpen] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [pageCount, setPageCount] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const [booksInCart, setBooksInCart] = React.useState([]);


  const reloadBooks = () => {
    firebaseCalls.getBookList().then((res) => {
      setBooksInCart(res);
    });
  }

  useEffect(() => {
    props.changeBookBadge(booksInCart.length);
  },[]);

  const filterBooks = (list) => {
    if (props.searchText === "") {
      return list;
    } else {
      let newList = [];
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].title
            .toLowerCase()
            .includes(props.searchText.toLowerCase()) ||
          list[i].author.toLowerCase().includes(props.searchText.toLowerCase())
        ) {
          console.log(list[i]);
          newList.push(list[i]);
        }
      }
      return newList;
    }
  };

  if (searchText !== props.searchText) {
    setSearchText(props.searchText);
    setPageCount(1);
    firebaseCalls.getBooks().then((res) => {
      setBooks(filterBooks(res));
    });
  }

  useEffect(() => {
    firebaseCalls.getBooks().then((res) => {
      setBooks(filterBooks(res));
      reloadBooks();
    });
  },[]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleClose = () => {
    setSortOpen(false);
  };

  const handleOpen = () => {
    setSortOpen(true);
  };

  const handlePagination = (object, page) => {
    setPageCount(page);
  };

  const isInCart = (id) => {
    return (
      findIndex(booksInCart, (book) => {
        return book.id === id;
      }) !== -1
    );
  };

  let booksList = books.map((item, index) => {
    if (
      index < itemsPerPage * pageCount &&
      index >= itemsPerPage * (pageCount - 1)
    ) {
      return (
        <Grid className="book-card" item key={item.id} md={3}>
          <Book reloadBooks={reloadBooks} inCart={isInCart(item.id)} book={item} />
        </Grid>
      );
    }
    return null;
  });

  return (
    <Grid container>
      <Grid item md={1}></Grid>
      <Grid container item md={10}>
        <Grid item container md={12} className="booklist-details">
          <Typography variant="h6" className="booklist-details-count">
            Books({books.length} books)
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
        <Grid item container spacing={3} md={12} className="booklist-books">
          {booksList}
        </Grid>
      </Grid>

      <Pagination
        className="pagination"
        page={pageCount}
        onChange={handlePagination}
        count={Math.ceil(books.length / 8)}
        variant="outlined"
        shape="rounded"
      />
      <Grid item md={1}></Grid>
    </Grid>
  );
}
