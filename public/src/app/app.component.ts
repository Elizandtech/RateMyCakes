import { Component, OnInit } from '@angular/core';
import {CakeService} from './cake.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rate My Cakes';
  cakes: any;
  newCake: any;
  displaycake: any;
  sum = 0;
  average: any;
  select: number[] = [1,2,3,4,5];
  inputRating: any;
  // editedCake: any;

  constructor(private httpService: CakeService) {}
  ngOnInit() {
    this.getAllCakes();
    this.newCake = {baker: "", image: ""};
    this.inputRating = {rating: 1, comment: ''};
  }
  getAllCakes() {
    this.httpService.getCakes()
    .subscribe((data: any) => {
      console.log('Data from getAllCakes()', data);
      // for (let cake of data) {
      //   console.log('Baker:', cake.baker);
      //   console.log('image', cake.image);
      // }
      this.cakes = data;
      console.log('this.cakes: ', this.cakes);
    });
  }
  onSubmit(): void {
    // Code to send off the form data (this.newTask) to the Service
    console.log('onSubmit is working!');
    this.httpService.addCake(this.newCake)  // data passed must be an object
    .subscribe((newcake: any) => {
      console.log('Got our cake', newcake);
    });
    // Reset this.newTask to a new, clean object.
    this.newCake = { baker: "", image: "" };
    this.getAllCakes();
}
  onCake(cake: any): void {
    console.log('in onCake');
    console.log('cake', cake);
    this.displaycake = cake;
    // console.log('this.cake', this.displaycake);
    this.sum = 0;
    for (let rating of this.displaycake.ratings) {
      this.sum += rating.rating;
    }
    if (this.displaycake.ratings.length >0) {
      this.average = Math.floor(this.sum/this.displaycake.ratings.length);
    } else {
      this.average = 'Cake not rated.';
    }
  }
  onRate(cake: any): void {
    console.log('onRate');
    console.log('this.inputRating:', this.inputRating);
    this.httpService.addRating(cake, this.inputRating)
    .subscribe((updatedcake: any) => {
      console.log('Updated cake', updatedcake);
      // this.editedCake = updatedcake;
      this.onCake(updatedcake);
    });
  }
}
