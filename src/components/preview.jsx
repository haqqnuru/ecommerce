import React from 'react'
import CollectionItems from './collectionItems'

function Preview({title, items}) {
  return (
    <div className='collection-preview'>
        <h1 className='titlep'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
            // filter to see only 4 items per category
            .filter((item, idx) => idx < 4)
            .map((item) => (
                <CollectionItems key={item.id} item={item}/>
            ))}
        </div>
      
    </div>
  )
}

export default Preview
