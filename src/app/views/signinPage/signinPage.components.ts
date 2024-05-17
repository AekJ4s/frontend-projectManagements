import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { LoginServices } from "../../services/Login.service";
import User from "../../models/user";
@Component({
    selector: 'signinPage-component',
    standalone: true,
    templateUrl: './signinPage.components.html',
    styleUrl: './signinPage.components.css',
    imports: [RouterModule,FormsModule,NgFor]
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