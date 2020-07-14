import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../common/address';



@Injectable({
  providedIn: 'root'
})
export class UtilService {
  

  constructor(private httpClient: HttpClient) { }


  getAddressDetails(pincode: number): Observable<Address[]>{
    const searchPinUrl = `/pincodeApi/${pincode}`;
    return this.httpClient.get<GetResponseAddresses>(searchPinUrl).pipe(
      map(response => response.PostOffice)
      );
  }

}

interface GetResponseAddresses{
  PostOffice:Address[];
}