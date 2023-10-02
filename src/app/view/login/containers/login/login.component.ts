import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { TUserRole } from '../../../../core/auth/model/auth.types';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userForm: FormGroup = new FormGroup({
    type: new FormControl<TUserRole>('admin', Validators.required),
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    rememberMe: new FormControl<boolean>(false),
  });

  typeOptions: { name: string; value: TUserRole }[] = [
    {
      name: 'Administrator',
      value: 'admin',
    },
    {
      name: 'Local User',
      value: 'user',
    },
  ];

  redirectUrl = '/admin/products';

  hasInvalidCredentials = false;

  private onDestroy$$: Subject<void> = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.onDestroy$$),
        map((params) => params?.['redirectUrl']),
        distinctUntilChanged(),
      )
      .subscribe((redirectUrl) => {
        this.redirectUrl = redirectUrl || '/admin/products';
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$$.next();
    this.onDestroy$$.complete();
  }

  onSubmit(): void {
    const { type, username } = this.userForm.value;
    this.hasInvalidCredentials = !this.authService.auth({
      username,
      role: type,
    });
    if (!this.hasInvalidCredentials) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate(['/forbidden', { queryParams: { redirectUrl: this.redirectUrl } }]);
    }
  }
}
