import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { UserEvent, deleteUserEvent, updateUserEvent } from "../../redux/user-events";
import { useDispatch } from "react-redux";

interface Props {
  event: UserEvent;
}

const EventItem = (props: Props) => {
  const dispatch = useDispatch();
  const { event } = props;
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };
  const [editable, setEditable] = useState(false)
  const handleTitleClick = () => {
    setEditable(true)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if(editable){
      inputRef.current?.focus()
    }
  }, [editable])
  const [title, setTitle] = useState(event.title)
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleInputBlur = () => {
    if(title !== event.title){
      dispatch(updateUserEvent({
        ...event,
        title
      }))
    }
    setEditable(false)
  }
  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">10:00-12:00</div>
        <div className="calendar-event-title">
          {
            editable ? (
              <input 
              onChange={handleInputChange} 
              onBlur={handleInputBlur}
              type="text" 
              ref={inputRef} 
              value={title}/>
            ) : (
              <span onClick={handleTitleClick}>
                {event.title}
          </span>
            )
          }
          </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className="calendar-event-delete-button"
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
