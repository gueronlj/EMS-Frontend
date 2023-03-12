import EventForm from './event-form.js'

const Modal = (props) => {
  return(
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header"></div>
        <div className="modal-content">
           <EventForm
              selectedEmployee={props.selectedEmployee}
              eventForm={props.eventForm}
              setEventForm={props.setEventForm}
              fetchSchedule={props.fetchSchedule}
              setShowModal={props.setShowModal}
              setMessage={props.setMessage}/>
        </div>
      </div>
    </div>
  )
}
export default Modal
