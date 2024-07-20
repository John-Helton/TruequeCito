import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-call-back-component',
  standalone: true,
  imports: [],
  templateUrl: './auth-call-back-component.component.html',
  styleUrl: './auth-call-back-component.component.css'
})
export class AuthCallBackComponentComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.getToken();
        this.router.navigate(['/']);
      } else {
        console.error('No token found in the query params');
      }
    });
  }

}
