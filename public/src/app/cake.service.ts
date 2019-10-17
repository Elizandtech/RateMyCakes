import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private http: HttpClient) {}
  // get all cakes
  getCakes(): any {
    return this.http.get('/cakes');
  }
  addCake(newcake): any {
    return this.http.post('/cakes', newcake);
  }
  addRating(editCake, rating): any {
    console.log('cake id: ', editCake._id);
    console.log('rating', rating);
    return this.http.post('/ratings/' + editCake._id, rating);
  }
}

