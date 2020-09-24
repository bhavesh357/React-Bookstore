import { remove } from "lodash";
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
