import { forwardRef } from "react"

const SearchInput = forwardRef((props, ref) => {
    return (
        <input
            ref={ref}
            placeholder="Looking for something?"
        />
    )
})

SearchInput.displayName = 'SearchInput'
export default SearchInput