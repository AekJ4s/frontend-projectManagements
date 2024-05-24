import mFile from "./file";
import Projects from "./project"

export default class ProjectWithFile {
    projectId = Projects
    fileId = File
    isDeleted = false 
    file:mFile|null = null;
    project = Projects
}