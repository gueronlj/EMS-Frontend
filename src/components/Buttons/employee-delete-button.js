const EmployeeDeleteButton = (props) => {
  const handleDelete = () => {
    props.setMessage(`${props.selectedEmployee.name} has been deleted.`);
  }
  return(
    <button className="details-btn" onClick={handleDelete}>
      Remove
    </button>
  )
}
export default EmployeeDeleteButton
