import React from 'react'



 const CategoryForm = ({handleSubmit, name, setName}) => {

 

  return(
    <>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
    </div>
     <button className="btn btn-primary">submit</button>
   </form>
    </>
   )

 }
 export default CategoryForm