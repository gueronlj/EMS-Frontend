const Modal = (props) => {
  return(
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header"></div>
        <div className="modal-content">
          {props.children}
        </div>
      </div>
    </div>
  )
}
export default Modal
