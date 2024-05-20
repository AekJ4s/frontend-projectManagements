import { Component } from "@angular/core";
import User from "../../models/user";
import { LoginServices } from "../../services/Login.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ProjectListComponent } from "../projectlist/projectList.components";

@Component({
    selector: 'signinPage',
    standalone: true,
    templateUrl: './signinPage.components.html',
    styleUrl: './signinPage.components.css',
    imports: [ProjectListComponent,FormsModule]
})

export class SigninPageComponent{
    loginby = new User();
    isLoggedIn = false;
    constructor(private loginService: LoginServices, private router: Router) { }
    onSubmit(){
        this.loginService.Login(this.loginby).subscribe(
            (result) => {
                console.log('Bearer => ', result.data.BearerToken , 'username => ', result.data.UserName);
                localStorage.setItem('Bearer', result.data.BearerToken);
                localStorage.setItem('UserId', result.data.UserId);
                localStorage.setItem('Username', result.data.UserName);
                console.log("USERNAME = > ", result.data.UserName , "USERID = > " , result.data.UserId)
                this.router.navigate(['projectlist']);
            },
            (error:any) => {
                console.error(error);
            }
        );
    }

  
}