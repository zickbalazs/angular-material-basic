import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validator } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogsService } from 'src/app/blogs.service';

interface Data{
  title:FormControl<string|null>,
  description:FormControl<string|null>,
  rating:FormControl<number|null>
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],

})


export class DialogComponent {
  data:Data = {
    title: new FormControl(''),
    description: new FormControl(''),
    rating: new FormControl(1)
  };
  constructor(public dialog:MatDialogRef<DialogComponent>, private service:BlogsService, private snackbar:MatSnackBar){}
  AddBlog(){
    this.service.Upload({
      description: this.data.description.value as string,
      ratings: this.data.rating.value as number,
      title: this.data.title.value as string
    }).subscribe(data=>{
      if (data.id){
        this.snackbar.open('Successful upload!', 'Dismiss', {
          duration: 2000
        });
      }
      else{
        this.snackbar.open('There was a server error!', 'Dismiss', {
          duration: 2000
        });
      }
    })
  }
}
