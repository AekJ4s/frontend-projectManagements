import Activity from "./activity"
import ProjectWithFile from "./projectwithfile"

export default class Projects {
    id = 0 
    ownerId = 0
    name = ""
    detail : string | null = ""
    startDate = new Date()
    endDate = new Date()
    createDate = new Date()
    updateDate = new Date()
    isDeleted = false ;
    projectWithFiles:ProjectWithFile[] = [] 
    activities:Activity[] = []
    
}