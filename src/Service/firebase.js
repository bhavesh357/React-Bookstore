import firebase from "./../Config/fbConfig";
class FirebaseCalls {
  store = firebase.firestore();
  getBooks = () => {
    return this.store
      .collection("books")
      .get()
      .then((res) => {
        let booksList = [];
        res.forEach((doc) => {
          booksList.push({ ...doc.data(), id: doc.id });
        });
        return booksList;
      });
  };

  addBookToUser = async (id) => {
    const user = this.getUser();
    const bookList = await this.getBookList();
    console.log(bookList);
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
    console.log(doc);
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
