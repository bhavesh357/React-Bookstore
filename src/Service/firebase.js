import { find, remove } from "lodash";
import firebase from "./../Config/fbConfig";
class FirebaseCalls {
  store = firebase.firestore();
  getBooks = (sort) => {
    if (sort!=="RL") {
      return this.store
        .collection("books")
        .orderBy('price' , sort==="LH" ? 'asc' : 'desc')
        .get()
        .then((res) => {
          let booksList = [];
          console.log(res);
          res.forEach((doc) => {
            booksList.push({ ...doc.data(), id: doc.id });
          });
          return booksList;
        }).catch( ( err ) => {
          console.log(err);
        });
    }
    return this.store
      .collection("books")
      .get()
      .then((res) => {
        let booksList = [];
        res.forEach((doc) => {
          booksList.push({ ...doc.data(), id: doc.id });
        });
        return booksList;
      }).catch( ( err ) => {
        console.log(err);
      });
  };

  getBookListWithDetails = async () => {
    let booksInCart = await this.getBookList();
    let allBooks = await this.getBooks();
    let tempBooks = [];
    booksInCart.forEach( (cartBook) => {
      let tempBook = find(allBooks, (book) => {
        return book.id === cartBook.id;
      });
      tempBooks.push({
        ...tempBook,
        selectedQuantity: cartBook.quantity,
      });
    } )
    return tempBooks;
  };

  removeBookToCart = async (id) => {
    const user = this.getUser();
    const bookList = await this.getBookList();
    remove(bookList, (book) => {
      return book.id === id;
    });
    await user.set(
      {
        bookList: [...bookList],
      },
      {
        merge: true,
      }
    );
  };

  editQuantity = async (id, quantity) => {
    const user = this.getUser();
    const bookList = await this.getBookList();
    remove(bookList, (book) => {
      return book.id === id;
    });
    await user.set(
      {
        bookList: [
          ...bookList,
          {
            id: id,
            quantity: quantity,
          },
        ],
      },
      {
        merge: true,
      }
    );
  };

  addBookToCart = async (id) => {
    const user = this.getUser();
    const bookList = await this.getBookList();
    await user.set(
      {
        bookList: [
          ...bookList,
          {
            id: id,
            quantity: 1,
          },
        ],
      },
      {
        merge: true,
      }
    );
  };

  getBookList = async () => {
    const user = this.getUser();
    const doc = await user.get();
    let bookList;
    if (!doc.exists) {
      bookList = [];
    } else {
      bookList = doc.data().bookList;
    }
    return bookList;
  };

  getUser = () => {
    const currentUser = firebase.auth().currentUser.uid;
    return this.store.collection("users").doc(currentUser);
  };

  clearCart = async () => {
    const user = this.getUser();
    await user.set({
      bookList: [],
    });
  };
}

export default new FirebaseCalls();
