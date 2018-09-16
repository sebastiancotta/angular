import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.html',
    styleUrls: ['./photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

    comments$: Observable<PhotoComment[]>;
    @Input() photoId: number;
    commentForm: FormGroup;
    
    constructor(private photoService: PhotoService,
        private formBuild: FormBuilder){}

    ngOnInit(): void {
        this.comments$ = this.photoService.getPhotoComment(this.photoId);
        this.commentForm = this.formBuild.group({
            comment: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(300)
            ])]
        });  
    }

    saveComment(comment) {        
        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getPhotoComment(this.photoId)))
            .pipe(tap(() => {
                this.commentForm.reset();
            }));
    }

}