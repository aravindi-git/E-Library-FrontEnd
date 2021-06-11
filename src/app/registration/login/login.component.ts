import { Input, Component, Output, EventEmitter , OnInit} from '@angular/core';
import { FormGroup, FormControl , FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/shared/services/authorizationService';
import { RouterModule, Routes , Router} from '@angular/router';
import { UserService } from '../../user/services/user.service' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;
  form: FormGroup ;
  roleList: UserRole[] ;

  constructor(private authorizationService: AuthorizationService ,
              private userService: UserService,
              private router: Router ,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.roleList = this.userService.getUserRolelist();
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      role: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this.authorizationService.login(this.form.value).subscribe(res =>
        {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/books']);
        }
        , error => {
          console.log(error);
        });
    }
    else{
      console.log('The form is invalid');
    }
  }
}
