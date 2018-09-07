import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './signin/signin.component';
import { VMessageModule } from '../shared/components/message/vmessage.module';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.modules';
import { SignUpService } from './signup/signup.service';

@NgModule({
    declarations: [ 
        SignInComponent,
        SignUpComponent,
        HomeComponent
     ],
    imports: [ 
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule 
    ],
    providers: [
        SignUpService
    ]
})
export class HomeModule {

}