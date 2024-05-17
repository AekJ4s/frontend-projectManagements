

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Activity from '../../models/activity';
import Projects from '../../models/project';
import { ProjectService } from '../../services/Projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  standalone: true,
  templateUrl: './projectCreate.components.html',
  styleUrls: ['./projectCreate.components.css'],
  imports: [FormsModule, NgFor, CommonModule],
})
export class ProjectCreateComponent {
  project = new Projects();
  constructor(private projectService: ProjectService, private router: Router) {}

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

  deleteInverseActivity(index: number, thisAct: Activity) {
    if (thisAct.activityHeader == null) {
      this.project.activities.splice(index, 1);
    }
    thisAct.activityHeader?.inverseActivityHeader.splice(index);
  }
  getColSpanForLevel(level: number): number {
    // กำหนดจำนวนคอลัมน์ที่ต้องการให้กับแต่ละระดับของกิจกรรม
    const colSpans = [1, 3, 2];

    // ตรวจสอบระดับของกิจกรรมและคืนค่าคอลัมน์ที่ต้องการ
    return colSpans[level - 1];
  }

  forfirsttd(level: number) {
    return new Array(level - 1);
  }

  forlasttd(level: number) {
    return new Array(3 - level);
  }
 // ListA.forEach(A => {
    //   console.log(A);
    // }); มาทำต่อพรุ่งนี้จ้า ตัวอย่างจ้า
  fixCircular(activity : Activity[] = []){
    activity.forEach(data => {
        data.inverseActivityHeader.forEach(childdata => {
          childdata.activityHeader = null;
          childdata.project = null;
          if(data.inverseActivityHeader != null){
            this.fixCircular(childdata.inverseActivityHeader)
          }
        });
        data.activityHeader = null;
        data.project = null
    });
  }

  onSubmit() {
    this.fixCircular(this.project.activities)
    console.log(this.project)
    this.projectService.Create(this.project).subscribe(
      (result) => {
        if (this.project.startdate == this.project.enddate) {
          alert('ห้ามวันเริ่มและวันสิ้นสุดโครงการเป็นวันเดียวกันครับ');
        } else 
        alert("SAVE DATA SUCCESSFUL")
        this.router.navigate(['projectlist']);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
