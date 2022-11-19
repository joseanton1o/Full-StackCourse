import { Injectable } from "@angular/core"; // This is going to be a service
import { CanActivate, Router } from "@angular/router"; // This is going to be a guard, canActivate is a method that we are going to implement that will help us to protect routes
import { AuthService } from "../services/auth.service"; // We need to inject the auth service so that we can use the loggedIn method

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    
    canActivate() {
        if (this.authService.loggedIn()){
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}