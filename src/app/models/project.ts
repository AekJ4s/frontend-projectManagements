import activity from "./activity"
import Activity from "./activity"

export default class Projects {
    id = 0 
    ownerid = 0
    name = ""
    detail = ""
    startdate = new Date()
    enddate = new Date()
    createDate = new Date()
    updateDate = new Date()
    isDelete = false
    activities:Activity[] = []

}