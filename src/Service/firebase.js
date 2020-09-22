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
          booksList.push({...doc.data(),id: doc.id});
        });
        return booksList;
      });
  };
}

export default new FirebaseCalls();
