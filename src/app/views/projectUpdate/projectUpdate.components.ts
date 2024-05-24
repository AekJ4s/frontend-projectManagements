import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Activity from '../../models/activity';
import Projects from '../../models/project';
import { ProjectService } from '../../services/Projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../services/Activity.service';
import { ProjectListComponent } from '../projectlist/projectList.components';
import mFile from '../../models/file';
import { Observable } from 'rxjs';
import ProjectWithFile from '../../models/projectwithfile';

@Component({
  selector: 'projectUpdate',
  standalone: true,
  templateUrl: './projectUpdate.components.html',
  styleUrls: ['./projectUpdate.components.css'],
  imports: [ProjectListComponent, FormsModule, CommonModule],
  providers: [DatePipe],
})
export class ProjectUpdateComponents {
  projectId: number | null = null;
  project = new Projects();
  activity: Activity[] = [];
  timenow = new Date();
  datafromController = [];
  files : File[] = [];
  fileDetails : any []= []
  href = null ;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    if (this.project.id != null && this.project.isDeleted != true) {
      this.route.params.subscribe((params) => {
        this.project.id = +params['id'];
      });
      this.projectService.GetProjectID(this.project.id).subscribe(
        (result) => {
          console.log(result);
          let data = result.data.project;
          if (data!= null) {
            this.project = {
              ...data,
              createDate: this.datePipe.transform(
                new Date(data.createDate),
                'yyyy-MM-dd',
                'Asia/Bangkok'
              ),
              endDate: this.datePipe.transform(
                new Date(data.endDate),
                'yyyy-MM-dd',
                'Asia/Bangkok'
              ),
              startDate: this.datePipe.transform(
                new Date(data.startDate),
                'yyyy-MM-dd',
                'Asia/Bangkok'
              ),
              updateDate: this.datePipe.transform(
                new Date(data.updateDate),
                'yyyy-MM-dd',
                'Asia/Bangkok'
              ),
            };
            
            console.log(this.project);
          } else {
            console.error('Data is not available');
          }
        },
        (error) => {
          alert(
            'Fail to request the data Because :   ' +
              error.code +
              ':' +
              error.message
          );
          console.error(error);
        }
      );
    }
    console.log(this.project)
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

  deleteInverseActivity(A: Activity) {
    A.inverseActivityHeader.forEach((B) => {
      this.deleteInverseActivity(B);
    });
    A.isDeleted = true;
    // this.project.activities.splice
  }

  deleteProjectWithFile(F : ProjectWithFile){
    F.isDeleted = true;
  }
  getColSpanForLevel(level: number): number {
    // กำหนดจำนวนคอลัมน์ที่ต้องการให้กับแต่ละระดับของกิจกรรม
    const colSpans = [1, 3, 2];

    // ตรวจสอบระดับของกิจกรรมและคืนค่าคอลัมน์ที่ต้องการ
    return colSpans[level - 1];
  }

  forfirsttd(level: number) {
    return level >= 1 ? new Array(level - 1) : [];
  }

  forlasttd(level: number) {
    return level <= 3 ? new Array(3 - level) : [];
  }
  // ListA.forEach(A => {
  //   console.log(A);
  // }); มาทำต่อพรุ่งนี้จ้า ตัวอย่างจ้า

  fixCircular(activity: Activity[] = []) {
    // แก้ปัญหา Circular Activity
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

  onDownload(id: number | string,name : string | undefined) {
    console.log("send id" + id + " send name " + name)
    this.projectService.DownloadFile(id).subscribe(response => {
      const blob = new Blob([response], { type: response.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}`;  // ตั้งชื่อไฟล์ที่ต้องการดาวน์โหลด
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
    this.router.navigate([`projects/GetBy/${id}`]);

  }

  
  deleteProject(id: number | string) {
    this.projectService.Delete(id).subscribe(
      (result) => {
        alert('Project deleted successfully');
        this.router.navigate(['projectlist']);
      },
      (error) => {
        console.error("Can't delete this project");
        alert('some thing error' + error);
      }
    );
  }
  onSubmit() {
    this.fixCircular(this.project.activities);
    this.projectService.UpdateProjectRequest(this.project).subscribe(
      (result) => {
        if (this.project.startDate == this.project.endDate) {
          alert('ห้ามวันเริ่มและวันสิ้นสุดโครงการเป็นวันเดียวกันครับ');
          console.log("After Submit" + result.data)
        } else 
        alert('Update Successfully')
        this.router.navigate(['projectlist']);
      },
      (error) => {
        console.error('Update Unsuccess', error);
      }
    );
  }
}
