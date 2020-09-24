import { find, remove } from "lodash";
import firebase from "./../Config/fbConfig";
class FirebaseCalls {
  store = firebase.firestore();
  getBooks = () => {
    return this.store
    .collection("books")
    .get()
    .then((res) => {
      let booksList = [];
      console.log(res);
      res.forEach((doc) => {
        booksList.push({ ...doc.data(), id: doc.id });
      });
      return booksList;
    });
  };
  
  getBookListWithDetails = async () => {
    let booksInCart = await this.getBookList();
    let allBooks = await this.getBooks();
    let tempBooks = [];
    for(let i=0; i<booksInCart.length; i++){
      let tempBook = find(allBooks, (book) => {
        return book.id === booksInCart[i].id;
      })
      tempBooks.push({
        ...tempBook,
        selectedQuantity: booksInCart[i].quantity,
      })
    }
    
    return tempBooks;
  }
  
  removeBookToCart = async (id) => {
    const user = this.getUser();
    const bookList = await this.getBookList();
    remove(bookList, (book) => {
      return book.id===id;
    });
    
    user.set({
      bookList: [
        ...bookList
      ],
    },{
      merge: true
    })
  };
  
  editQuantity = async (id,quantity) => {
    const user = this.getUser();
    const bookList = await this.getBookList();
    remove(bookList, (book) => {
      return book.id===id;
    });user.set({
      bookList: [
        ...bookList,
        {
          id: id,
          quantity: quantity,
        },
      ],
    },{
      merge: true
    })
  }
  
  addBookToCart = async (id) => {
    const user = this.getUser();
    const bookList = await this.getBookList();
    user.set({
      bookList: [
        ...bookList,
        {
          id: id,
          quantity: 1,
        },
      ],
    },{
      merge: true
    })
  };
  
  getBookList = async () => {
    const user = this.getUser();
    const doc = await user.get();
    let bookList;
    console.log(doc.data());
    if (!doc.exists) {
      bookList = [];
    } else {
      bookList = doc.data().bookList;
    }
    return bookList;
  }
  
  getUser = () => {
    const currentUser = firebase.auth().currentUser.uid;
    return this.store.collection("users").doc(currentUser);
  }
}

export default new FirebaseCalls();
