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
    constructor(private loginService: LoginServices, private router: Router) { }
    onSubmit(){
        
        // Login Process
        // Get ID PASSWORD PIN FROM USER
        // IF ID PASSWORD AND PIN CORRECT
        // GEN TOKEN
        console.log(this.loginby)
        this.loginService.Login(this.loginby).subscribe(
            (result:any) => {
                localStorage.setItem('Bearer', result.data);
                console.log('Bearer', result.data);
                this.router.navigate(['projectlist']);
            },
            (error:any) => {
                console.error(error);
            }
        );
    }
}