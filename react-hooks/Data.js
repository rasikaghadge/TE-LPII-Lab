import React, { useState, useEffect } from "react"

function Data () {

    const [data, setData] = useState(null)

    useEffect (() => {
        setTimeout(() => {setData("Fetched data")}, 2000)
    }, [])

    return (
        <div>
            <h1>Fetch data</h1>
            {data ? <p>Data: {data}</p> : <p>Loading...</p>}
        </div>
    )
}

export default Data