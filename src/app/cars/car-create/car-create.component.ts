import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { CarsService } from '../cars.service';
import { Car } from '../car.model';
import { mimeType } from './mime-type.validator';

export enum mode{
  'create',
  'edit'
}

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit{
  private carId: any;
  private mode: mode = mode.create;
  isLoading: Boolean = false;
  car: Car = {} as Car;
  form: FormGroup;
  imagePreview:string = '';

  constructor(public carsService:CarsService, public route: ActivatedRoute){
    this.form = new FormGroup({
      model: new FormControl(null,
        { validators: [Validators.required, Validators.minLength(3)]}),
      year: new FormControl(null,
        { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)]}),
      image: new FormControl(null,
        {
          validators: [Validators.required],
          asyncValidators:[mimeType]
        })
    });
  }

  onCarCreate(){
    if (this.form.invalid){
      return;
    }
    if (this.mode === mode.create){
      this.carsService.addCar(
        this.form.value.model,
        this.form.value.year,
        this.form.value.image
        );
    } else{
      this.carsService.updateCar(
        this.carId,
        this.form.value.model,
        this.form.value.year,
        this.form.value.image
        );
    }

    this.form.reset();
  }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('carId')){
        this.carId = paramMap.get('carId');
        this.mode = mode.edit;
        this.isLoading = true;
        this.carsService.getCarBydId(this.carId)
          .subscribe(data => {
            this.car = {
              id: data._id,
              model: data.model,
              year: data.year,
              imagePath: data.imagePath,
              createdby: data.createdby
            };

            this.form.setValue({
              model: this.car.model,
              year: this.car.year,
              image: this.car.imagePath
            })
            this.imagePreview = data.imagePath;
            this.isLoading = false;
          });
      }else{
        this.carId = null;
        this.mode = mode.create;
      }
    });
  }

  onImagePicked(event:Event){
    const htmlFileElement = (event.target as HTMLInputElement);
    if (htmlFileElement && htmlFileElement.files){
      const file = htmlFileElement.files[0];

      this.form.patchValue({ image: file});
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
};
