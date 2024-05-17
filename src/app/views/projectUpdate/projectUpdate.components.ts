import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Activity from '../../models/activity';
import Projects from '../../models/project';
import { ProjectService } from '../../services/Projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../services/Activity.service';
import { ProjectListComponent } from '../projectlist/projectList.components';

@Component({
  selector: 'projectUpdate',
  standalone: true,
  templateUrl: './projectUpdate.components.html',
  styleUrls: ['./projectUpdate.components.css'],
  imports: [ProjectListComponent,FormsModule, CommonModule],
})
export class ProjectUpdateComponents {
  projectId: number | null = null;
  project = new Projects();
  activity : Activity [] = [];
  timenow = new Date()

  constructor(
    private projectService: ProjectService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    if(this.project.id != null && this.project.isDelete != true){
    this.route.params.subscribe((params) => {
      this.project.id = +params['id'];
    })
    this.projectService.GetProjectID(this.project.id).subscribe(
        (result) => {
          this.project = result.data
          console.log("RECEIVE BY DATABASE :" , this.project)
        },
        (error) => {
          alert("Fail to request the data Because :   " + error.code + ":" + error.message)
            console.error(error);
        })
  }
}

 
  addParentActivity() {
    const newActivity = new Activity(); // ไม่ต้องส่งอาร์กิวเมนต์เข้าไปใน constructor
    newActivity.activityHeader = null; // กำหนดให้เป็น null หรือตามความเหมาะสม
    newActivity.project = this.project; // กำหนดโปรเจกต์ให้กับกิจกรรมใหม่
    this.project.activities.push(newActivity);
  }

  addChildActivity(parent: Activity) {
    const childActivity = new Activity(); // เพิ่ม Activities ใหม่
    childActivity.lv = parent.lv + 1;
    childActivity.activityHeader = parent;
    childActivity.project = this.project; // กำหนดโปรเจกต์ให้กับ Activities ใหม่
    parent.inverseActivityHeader.push(childActivity); // ยัด Activities ใหม่ให้กับตัว แม่
  }

  deleteInverseActivity(A:Activity) {
      console.log("  INPUT  " ,  A);
      A.inverseActivityHeader.forEach((B) => {
            this.deleteInverseActivity(B);
      });
      A.isDeleted = true;
      console.log(" OUTPUT : " , A ) ;
      

    // this.project.activities.splice
  }
  getColSpanForLevel(level: number): number {
    // กำหนดจำนวนคอลัมน์ที่ต้องการให้กับแต่ละระดับของกิจกรรม
    const colSpans = [1, 3, 2];

    // ตรวจสอบระดับของกิจกรรมและคืนค่าคอลัมน์ที่ต้องการ
    return colSpans[level - 1];
  }

  forfirsttd(level: number) {

    return level >= 1 ? new Array(level-1): [];
  }

  forlasttd(level: number) {
    return level <= 3 ? new Array(3 - level) : [];
  }
  // ListA.forEach(A => {
  //   console.log(A);
  // }); มาทำต่อพรุ่งนี้จ้า ตัวอย่างจ้า



  fixCircular(activity: Activity[] = []) {   // แก้ปัญหา Circular Activity
    activity.forEach((data) => {
      data.inverseActivityHeader.forEach((childdata) => {
        childdata.activityHeader = null;
        childdata.project = null;
        if (data.inverseActivityHeader != null) {
          this.fixCircular(childdata.inverseActivityHeader);
        }
      });
      data.activityHeader = null;
      data.project = null;
    });
  }

  deleteProject(id : number | string) {
  this.projectService.Delete(id).subscribe(
    (result) => {
      alert("Project deleted successfully");
      this.router.navigate(['projectlist']);
    },(error) => {
      console.error("Can't delete this project");
      alert("some thing error"+error);
    }
  )
  }
  onSubmit() {
    this.fixCircular(this.project.activities);
    this.projectService.UpdateProjectRequest(this.project).subscribe(
      (result) => {
        if (this.project.startdate == this.project.enddate) {
          alert('ห้ามวันเริ่มและวันสิ้นสุดโครงการเป็นวันเดียวกันครับ');
        } else 
        this.router.navigate(['projectlist']);
        window.location.reload();
      },
      (error) => {
        console.error("Update Unsuccess",error);
      }
    );
  }
}
