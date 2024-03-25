'use client';
import { useState, useEffect, FormEvent } from 'react'

export default function BookInfo() {
    // base URL for google's book API
    const baseURL = 'https://www.googleapis.com/books/v1/volumes?q='
    // let bookQuery = ''
    const [bookData, setBookData] = useState([])
    const [bookSearchInfo, setBookSearchInfo] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitted(true)
    }

    useEffect(() => {
        fetch(`${baseURL}${bookSearchInfo}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data)
                setBookData(data["items"])
            })
    }, [isSubmitted])

    // const handleBookSearch = (e) => {
    //     console.log(e.target.value)
    //     setBookInfo(e.target.value)
    //     console.log('this is book info: ' + bookInfo)
    // }
    function isBookDataEmpty() {
        if (bookData.length >= 1) {
            return (
                <div>
                    "Hi we have data"
                </div>
            )
        }
    }
    console.log('book info 2' + bookSearchInfo)
    return (
        <div className="flex flex-col items-center justify-between p-24">
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Search for a book by title or Author Name</h1>
                    <input
                        className="mx-auto text-black"
                        type="text"
                        name="bookInfo"
                        placeholder="book title"
                        onChange={(e) => {
                            setBookSearchInfo(e.target.value)
                        }}
                        value={bookSearchInfo}
                    />
                    <button className="block" type="submit" >Search</button>
                </form>
                {bookData !== undefined && <div>YOU ARE HERE</div>

                    // bookData.map(el => {
                    // if (el <= 20) {
                    //     { console.log(el) }
                    //     <div>
                    //         <h2 style="color:#FFFFFF; font-size: 32px;">{bookData[el]["volumeInfo"]["title"]}</h2>
                    //     </div>
                    // }
                    // })}
                }
            </div>

        </div>

    );
}