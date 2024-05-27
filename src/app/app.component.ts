import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { SigninPageComponent } from './views/signinPage/signinPage.components';
import { ProjectListComponent } from './views/projectlist/projectList.components';
import { UploadFileComponent } from './views/uploadfile/uploadFile.components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UploadFileComponent,
    ProjectListComponent,
    SigninPageComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Management Angular';
  timeupdate = Date();
  timenow = new Date();
  thailandTime: string = this.timenow.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
  
  isAuthenticated = false;

  constructor(private router: Router) {}

  checkAuthentication() {
    // Logic to check if the user is authenticated
    // For example, check a token in localStorage or a variable
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }

  signout() {
    // Logic to handle signout
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['/signinpage']);
  }

  ngOnInit() {
    this.checkAuthentication();
  }
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('API was called:', request.url);
    return next.handle(request);
  }
}
