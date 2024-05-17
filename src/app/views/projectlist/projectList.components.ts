import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ProjectService } from "../../services/Projects.service";
import projects from "../../models/project";
import { Router } from "express";
@Component({
    selector: 'projectList-component',
    standalone: true,
    templateUrl: './projectList.components.html',
    styleUrl: './projectList.components.css',
    imports: [RouterModule,CommonModule,RouterModule,RouterOutlet,FormsModule,NgFor]
})

export class ProjectListComponent {
    Allprojects : projects[] = []
    projectID : any 
    constructor(private projectService: ProjectService) { }
    
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
    

    

      // onEdit(data: number) {
      //   this.productsService.PUT(data).subscribe(
      //     () => {
      //       console.log(data)
      //       window.location.reload();
      //     },
      //     (error) => {
      //       console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
      //     }
      //   );
      // }
  
    
}