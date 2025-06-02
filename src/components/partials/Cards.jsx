import React from 'react'

const Cards = ({data}) => {
  return (
    <div>
        {data.map((c,i) =>( 
            <Link key={i} >
            { 
            c.name ||
            c.original_name ||
            c.original_title
            }
            </Link> 
            ))}
    </div>
  )
}

export default Cards