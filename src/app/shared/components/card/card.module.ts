import { NgModule } from '@angular/core';

import { CarComponent } from './card.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [CarComponent],
    exports:[CarComponent],
    imports: [CommonModule]
})
export class CardModule {

}