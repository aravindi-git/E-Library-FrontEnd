import { Input, Component, Output, EventEmitter , OnInit} from '@angular/core';
import { FormGroup, FormControl , FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/shared/services/authorizationService';
import { RouterModule, Routes , Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;

  // @Output() submitEM = new EventEmitter();

  form: FormGroup ;

  constructor(private authorizationService: AuthorizationService , private router: Router , public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      // password: new FormControl(''),
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
