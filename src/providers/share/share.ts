import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class ShareProvider {
  image: string = '';
  constructor() {
  }
  setImage(image) {
    this.image = image;
  }
  getImage() {
    return this.image;
  }
}
