import { FaCalendar } from "react-icons/fa";
import { useState } from "react";

export default function Expiration(props) {

    const [editing, setEditing] = useState(false)
    const [exDate, setExDate] = useState(new Date(props.expiration).toISOString().split('T')[0]);

    const getColor = () => {
        if (isWithinNext24Hours(exDate)){
            console.log("returning color red");
            return "orange"
        } else if (isNowOrPast(exDate)){
            return "red"
        }
    }

    const handleDoubleClick = () => {
        setEditing(true);
      };
    
    const handleDateChange = (e) => {
        setExDate(e.target.value);
    }

    const handleBlur = () => {
        setEditing(false);
        props.setExpirationUpdate(exDate, props.id);
      };
    
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          if(exDate.trim().length > 0) {
            setEditing(false);
            props.setExpirationUpdate(exDate, props.id);
            return
          }
        }
      };

    return (
        <div style={{display: "flex", gap: "10px", alignItems: "center", height: "10px"}}>
            <FaCalendar />
            {editing ? (
                <input
                type="date"
                role="dateExpiration"
                value={exDate}
                onChange={handleDateChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    fontSize: "14px",
                }}
                data-test="expiration-input"
              />
            ) : (
                <div onDoubleClick={handleDoubleClick} role="dateExpirationDiv" data-test="expiration-div">
                    <p style={{color: getColor(), fontSize: "14px"}} role="dateExpiration">{getDayByWeekDay(new Date(exDate).getDay())}, {new Date(exDate).getDate()}.{new Date(exDate).getMonth()+1}.{new Date(exDate).getFullYear()}</p>
                </div>
            )}
        </div>
    )
}


function isWithinNext24Hours(dateToCheck) {
    const now = new Date();
    const target = new Date(dateToCheck);
  
    const diff = target - now;
  
    const twentyFourHours = 24 * 60 * 60 * 1000;
  
    return diff > 0 && diff <= twentyFourHours;
  }

function isNowOrPast(dateToCheck) {
    const checkDateFormat = new Date(dateToCheck)
    const now = new Date()

    return checkDateFormat < now;
  }
  
export function getDayByWeekDay(id){
    console.log(id)
    const days = [{id: 1, day: "Monday"}, {id: 2, day: "Tuesday"}, {id: 3, day: "Wednesday"}, {id: 4, day: "Thursday"}, {id: 5, day: "Friday"}, {id: 6, day: "Saturday"}, {id: 0, day: "Sunday"}]

    
    return days.find(x => x.id == id).day
}