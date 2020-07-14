import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UtilService } from 'src/app/services/util.service';
import { Address } from 'src/app/common/address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  addressSameFlag: boolean = false;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  shippingLocalityArray: string[] = [];
  billingLocalityArray: string[] = [];

  constructor(private formBuider: FormBuilder, private cartService: CartService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.listCartDetails();
    this.declareData();
  }

  listCartDetails() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();

  }

  declareData() {

    this.checkoutFormGroup = this.formBuider.group({
      customer: this.formBuider.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuider.group({
        street: [''],
        postalCode: [''],
        locality: [''],
        city: [''],
        landmark: [''],
        state: [''],
        country: ['']
      }),
      billingAddress: this.formBuider.group({
        street: [''],
        postalCode: [''],
        locality: [''],
        city: [''],
        landmark: [''],
        state: [''],
        country: ['']
      }),
      creditCard: this.formBuider.group({
        cardType: [''],
        nameOnCard: [''],
        cardNo: [''],
        cvv: [''],
        month: [''],
        year: ['']
      }),
    });
  }

  
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.addressSameFlag = true;
    }else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.addressSameFlag = false;
    }
  }

  onSubmit() {
    console.log("handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    console.log(this.checkoutFormGroup.get('creditCard').value);
  }

  getShippingAddressDetails(pincode: string) {
    let thePincode: number = +pincode;
    let flag: boolean = false;
    let city: string = '';
    let state: string = '';
    let country: string = '';

    if (pincode.length === 6) {
      this.shippingLocalityArray = [];
      this.utilService.getAddressDetails(thePincode).subscribe(
        data => {
          for (let tempData of data) {
            this.shippingLocalityArray.push(tempData.Name);
            city = tempData.District;
            state = tempData.State;
            country = tempData.Country;
          }
          this.checkoutFormGroup.patchValue({
            shippingAddress: {
              city: city,
              state: state,
              country: country
            }
          });
        });
    }else{
      this.shippingLocalityArray = [];
      this.checkoutFormGroup.patchValue({
        shippingAddress: {
          locality: [''],
          city: '',
          state: '',
          country: ''
        }
      });
    }
  }

  getBillingAddressDetails(pincode: string) {

    let thePincode: number = +pincode;
    let flag: boolean = false;
    let city: string = '';
    let state: string = '';
    let country: string = '';

    if (pincode.length === 6) {
      this.billingLocalityArray = [];
      this.utilService.getAddressDetails(thePincode).subscribe(
        data => {
          for (let tempData of data) {
            this.billingLocalityArray.push(tempData.Name);
            city = tempData.District;
            state = tempData.State;
            country = tempData.Country;
          }
          this.checkoutFormGroup.patchValue({
            billingAddress: {
              city: city,
              state: state,
              country: country
            }
          });
        });
    }else{
      this.billingLocalityArray = [];
      this.checkoutFormGroup.patchValue({
        billingAddress: {
          locality: [''],
          city: '',
          state: '',
          country: ''
        }
      });
    }

  }



}
