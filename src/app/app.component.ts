import { ApplicationModule, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { SigninPageComponent } from './views/signinPage/signinPage.components';
import { ProjectListComponent } from './views/projectlist/projectList.components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectListComponent,SigninPageComponent,CommonModule, RouterModule, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project Management Angular';
  timeupdate = Date()
  timenow = new Date()
  thailandTime: string = this.timenow.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
}
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('API was called:', request.url);
    return next.handle(request);
  }
}









