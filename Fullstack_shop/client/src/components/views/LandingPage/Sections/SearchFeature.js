import React from 'react'
import Search from 'antd/lib/input/Search'

function SearchFeature(props) {

    const [SearchValue, setSearchValue] = useState("")
    const onSearchChange = (event) => {
        setSearchValue(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
           <Search
               value={SearchValue}
               onChange={onSearchChange}
               placeholder="Search..."
           /> 
        </div>
    )
}

export default SearchFeature
