import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninPageComponent } from './views/signinPage/signinPage.components';
import { ProjectListComponent } from './views/projectlist/projectList.components';
import { ProjectCreateComponent } from './views/projectCreate/projectCreate.components';
export const routes: Routes = [
    {path:'#',component: AppComponent},
    

    {path:'projectcreate',component: ProjectCreateComponent},
    {path:'projectlist',component: ProjectListComponent},
    {path:'signinpage',component: SigninPageComponent},
    
];