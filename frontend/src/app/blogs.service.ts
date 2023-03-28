import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  backendurl:string = 'http://localhost:8000/api';
  constructor(public http:HttpClient) { }

  GetAll():Observable<Blog[]>{
    return this.http.get(this.backendurl+'/blogs') as Observable<Blog[]>;
  }
  Get(id:number):Observable<Blog>{
    return this.http.get(this.backendurl+`/blog/${id}`) as Observable<Blog>;
  }

  Update(id:number, data:Blog): Observable<{message:string}|Blog>{
    return this.http.patch(this.backendurl+'/blog', {
      id: id,
      title:data.title,
      description:data.description,
      ratings:data.ratings
    }) as Observable<{message:string}|Blog>;
  }
  Upload(data:Blog):Observable<|Blog>{
    return this.http.post(this.backendurl+'/blog', {
      ...data
    }) as Observable<Blog>;
  }
  Delete(id:number):Observable<{message:string}>{
    return this.http.delete(this.backendurl+'/blog'+id) as Observable<{message:string}>;
  }
}
