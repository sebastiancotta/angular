import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lawerCaserValidator } from '../../shared/validators/lawer-case.validator';
import { UserNotTakenService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { PlatformDectetorService } from '../../core/plataform-detector/platform-dectetor.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [
        UserNotTakenService
    ]
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(private formBuild: FormBuilder,
                private userNotTakenService: UserNotTakenService,
                private signUpService: SignUpService,
                private router: Router,
                private platformDectetorService: PlatformDectetorService) {

    }

    ngOnInit(): void {
        this.signUpForm = this.formBuild.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            userName:
                [
                    '', 
                    [Validators.required, lawerCaserValidator, Validators.minLength(4), Validators.maxLength(15)],
                    this.userNotTakenService.checkUserNameTaken()
            ],
            fullName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(90)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
        });
        this.platformDectetorService.isPlatformBrowser() && 
        this.emailInput.nativeElement.focus()
    }

    signup() {
        const newUser = this.signUpForm.getRawValue() as NewUser;
        this.signUpService
                .signup(newUser)
                .subscribe(
                        () => this.router.navigate(['']),
                        erro => console.log(erro));
    }
}