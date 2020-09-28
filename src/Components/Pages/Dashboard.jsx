import React from 'react'
import BookList from '../BookList';
import Navbar from '../Navbar';

function Dashboard() {

    const [searchText, setSearchText] = React.useState('');
    const [bookCount, setBookCount] = React.useState(0);

    const handleSearch = (text) => {
        setSearchText(text)
    }

    const changeBookBadge = (count) => {
        setBookCount(count);
    } 

    return (
        <div className="dashboard">
            <Navbar bookCount={bookCount} handleSearch={handleSearch} />
            <BookList changeBookBadge={changeBookBadge} searchText={searchText} />
        </div>
    )
}


export default Dashboard;
