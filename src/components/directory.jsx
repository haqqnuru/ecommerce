import React, { Component } from 'react'
import MenuItem from './menuItems'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../redux/directory/directory.selectors';


const Directory = ({ sections }) => {
    return (
        <div className='directory-menu'>{
          sections.map(({id, ...otherSectionsProps}) =>
          (<MenuItem key= {id} {...otherSectionsProps}/>)
          )  
        }
      </div>
    )
  }

  const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
  });
  
  export default connect(mapStateToProps)(Directory);

