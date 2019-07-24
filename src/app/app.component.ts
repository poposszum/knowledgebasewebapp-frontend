import { Component } from '@angular/core';
import { Token } from './models/Token';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'knowledgebasewebapp-frontend';

  currentToken: Token;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentToken.subscribe(x => 
          this.currentToken = x);
    }

    signout(){
      this.authenticationService.logout();
      this.router.navigate(['signin']);
    }
}
