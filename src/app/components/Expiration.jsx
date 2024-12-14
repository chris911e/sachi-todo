import { FaCalendar } from "react-icons/fa";

export default function Expiration({expiration}) {
    let exDate = new Date(expiration)

    const getColor = () => {
        if (isWithinNext24Hours(exDate)){
            console.log("returning color red");
            return "orange"
        } else if (isNowOrPast(exDate)){
            return "red"
        }
    }

    return (
        <div style={{display: "flex", gap: "10px", alignItems: "center", height: "10px"}}>
            <FaCalendar />
            <p style={{color: getColor(), fontSize: "14px"}}>{exDate.getDate()}.{exDate.getMonth()+1}.{exDate.getFullYear()}</p>
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
    const now = new Date()
    console.log(dateToCheck)
    console.log(now)
    console.log(dateToCheck<now)
    return dateToCheck < now;
  }
  