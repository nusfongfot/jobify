import { useMycontext } from "../../context/authContext"

function Alert() {
  const { alertType, alertText } = useMycontext()
  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>
  )
}
export default Alert