import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDectetorService } from '../../core/plataform-detector/platform-dectetor.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(private formBuilder: FormBuilder, 
                private authService: AuthService,
                private router: Router,
                private platformDectetorService: PlatformDectetorService) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDectetorService.isPlatformBrowser() && 
        this.userNameInput.nativeElement.focus()
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .autenticate(userName, password)
            .subscribe(() => this.router.navigate(['/user/', userName]), 
            erro => { 
                console.log(erro);
                this.loginForm.reset();
                this.platformDectetorService.isPlatformBrowser() && 
                    this.userNameInput.nativeElement.focus();
            });
    }
    
}