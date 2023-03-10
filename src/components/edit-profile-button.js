const EditProfileBtn = (props) => {
   const handleEditProfileBtn = () => {
      props.setShowEditModal(true)
   }
   return(
      <button className='edit-button' onClick={handleEditProfileBtn}>Edit</button>
   )
}
export default EditProfileBtn
