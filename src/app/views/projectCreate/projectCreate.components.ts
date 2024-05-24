import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Activity from '../../models/activity';
import Projects from '../../models/project';
import { ProjectService } from '../../services/Projects.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
@Component({
  selector: 'projectCreate',
  standalone: true,
  templateUrl: './projectCreate.components.html',
  styleUrls: ['./projectCreate.components.css'],
  imports: [FormsModule, CommonModule],
})
export class ProjectCreateComponent {
  project = new Projects();
  divfile = 0;
  userId: number = 0;
  userName: string | null = '';

  // File Part

  files: File[] = [];
  fileURLs: { [key: string]: string } = {};
  show_url = '';

  // end File Part
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('UserId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    this.userName = localStorage.getItem('Username');
    console.log(this.userName, this.userId);
  }

  onDateChange(date: Date): void {
    console.log('Selected date:', date);
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
  fixCircular(activity: Activity[]) {
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

  isLegal(a: Date, b: Date): boolean {
    const today = new Date();

    // รีเซ็ตเวลาในวันที่ปัจจุบันเพื่อเปรียบเทียบเพียงวันที่
    today.setHours(0, 0, 0, 0);

    // รีเซ็ตเวลาในวันที่ a และ b เพื่อเปรียบเทียบเพียงวันที่
    a.setHours(0, 0, 0, 0);
    b.setHours(0, 0, 0, 0);

    // ตรวจสอบว่าจากวันที่ a ต้องมาก่อนวันที่ b
    if (a > b) {
      return false;
    }

    // ตรวจสอบว่าจากวันที่ a ต้องเป็นวันเดียวกับวันนี้หรือหลังจากวันนี้
    if (a < today) {
      return false;
    }

    return true;
  }

  deleteSelect(index: number) {
    this.files.splice(index, 1); // ลบแค่ตัวปัจจุบัน
  }
  uploading(event: any) {
    const selectedFiles: FileList = event.target.files;
    Array.from(selectedFiles).forEach((file) => {
      this.files.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileURLs[file.name] = e.target.result;
      };
      reader.readAsDataURL(file);
    });

    if (this.files.length > 0) {
      console.log('Selected files:', this.files);
    } else {
      alert('No files selected');
    }
  }
  onSubmit() {
    console.log('eiei')
    if (this.project != null ) {
      if (
        this.isLegal(
          new Date(this.project.startDate),
          new Date(this.project.endDate)
        )
      ) {
        this.project.ownerid = this.userId;
        this.fixCircular(this.project.activities);

        this.projectService.Create(this.project,this.files).subscribe(
          (result) => {
            alert('SAVE DATA SUCCESSFUL');
            this.router.navigate(['projectlist']);
          },
          (error) => {
            console.error(error);
          }
        );
      
    }
  }else alert('คุณยังไม่ได้สร้างโปรเจค');
  }
}
