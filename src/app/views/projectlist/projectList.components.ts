import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import Projects from "../../models/project";
import { ProjectService } from "../../services/Projects.service";

@Component({
    selector: 'projectList',
    standalone: true,
    templateUrl: './projectList.components.html',
    styleUrl: './projectList.components.css',
    imports: [CommonModule,RouterModule,RouterOutlet,FormsModule]
})

export class ProjectListComponent {
    Allprojects : Projects[] = []
    projectID : any 
    constructor(private projectService: ProjectService,private router: Router) { }
    
    ngOnInit() {
        this.projectService.GetAll().subscribe(
            (result) => {
                this.Allprojects = result
      console.log(result)
            },
            (error)=> {
                console.error(error);
            }
        );
    }

    deleteProject(id : number | string) {
        this.projectService.Delete(id).subscribe(
          (result) => {
            alert("Project deleted successfully");
            this.router.navigate(['projectlist']);
            window.location.reload();
          },(error) => {
            console.error("Can't delete this project");
            alert("some thing error"+error);
          }
        )
        }

    
    
}