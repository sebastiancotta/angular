export interface Photo {
    id: number;
    postDate: Date;
    url:string;
    description:string;
    allowcomments:boolean;
    likes:number;
    comments:number;
    userId:number;
}