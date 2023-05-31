import { useRef } from "react"

function SearchBar({ setSearchQuery }) {
    const searchQuery = useRef(null)

    function search() {
        setSearchQuery(searchQuery.current.value)
    }

    return (
        <div id="contacts-search">
            <input ref={searchQuery} onKeyUp={search} type="text" placeholder="Search" />
        </div>
    )
}

export default SearchBar