import Activity from "./activity"
import ProjectWithFile from "./projectwithfile"

export default class Projects {
    id = 0 
    ownerid = 0
    name = ""
    detail = ""
    startDate = new Date()
    endDate = new Date()
    createDate = new Date()
    updateDate = new Date()
    isDeleted = false ;
    projectWithFiles:ProjectWithFile[] = [] 
    activities:Activity[] = []
    
}