import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit {

  countries:Country[]=[];

  country:Country={
    id:0,
    countryName:'',
    countryCode:'',
    isActive:true
  };

  constructor(private service:CountryService){}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(){
   
    this.service.getCountries().subscribe({
    next: (res) => {
        this.countries = res.data;
    }
});
  }

 save() {

  if (this.country.id == 0) {

    this.service.addCountry(this.country).subscribe(() => {

      alert("Country Saved Successfully");

      this.country = {
        id: 0,
        countryName: '',
        countryCode: '',
        isActive: true
      };

      this.loadCountries();

    });

  } else {

    this.service.updateCountry(this.country).subscribe(() => {

      alert("Country Updated Successfully");

      this.country = {
        id: 0,
        countryName: '',
        countryCode: '',
        isActive: true
      };

      this.loadCountries();

    });

  }

}

  edit(item:Country){
    this.country={...item};
  }

  delete(id:number){

    if(confirm("Delete Record?")){

      this.service.deleteCountry(id).subscribe(()=>{
        this.loadCountries();
      });

    }

  }

  reset(){

    this.country={
      id:0,
      countryName:'',
      countryCode:'',
      isActive:true
    };

  }

}