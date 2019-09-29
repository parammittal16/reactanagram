export const addName = (name) => {
    return dispatch => {
        console.log(name);
        dispatch({ type: 'ADD_NAME', msg: name});
        // axios.post('/books.json?auth=' + token, book)
        // .then(res => {
        //     dispatch({ type: 'ADD_BOOK', msg: 'Book Added'});
        // })
        // .catch(err => dispatch({ type: 'ADD_BOOK_FAIL', msg: 'Failed'}));
    }
}