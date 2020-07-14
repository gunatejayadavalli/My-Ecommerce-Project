import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  currentCatergoryId:number = 1;
  currentCatergoryName:string = 'Books';
  previousCategoryId: number = 1;
  searchMode:boolean = false;
  currentSearchkeyword:string = '';
  previousSearchkeyword:string = '';
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService : ProductService,
              private cartService : CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  updatePageSize(pageSize : number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('searchKeyword');
    if(this.searchMode){
      this.currentSearchkeyword = this.route.snapshot.paramMap.get('searchKeyword').trim();
    }

    if(this.searchMode && this.currentSearchkeyword.length>0){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }

  }

  handleListProducts(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCatergoryId = +this.route.snapshot.paramMap.get('id');
      this.currentCatergoryName = this.route.snapshot.paramMap.get('name');
    }else{
      this.currentCatergoryId = 1;
    }

    if(this.previousCategoryId != this.currentCatergoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCatergoryId;

    this.productService.getProductListPaginate(this.thePageNumber -1 ,this.thePageSize,this.currentCatergoryId).subscribe(
      this.processResult());

  }

  handleSearchProducts(){

    if(this.previousSearchkeyword != this.currentSearchkeyword){
      this.thePageNumber = 1;
    }

    this.previousSearchkeyword = this.currentSearchkeyword;

    this.productService.searchProductsPaginate(this.thePageNumber -1 ,this.thePageSize,this.currentSearchkeyword).subscribe(
      this.processResult());

  }

  processResult(){
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product){

      const theCartItem = new CartItem(theProduct);

      this.cartService.addToCart(theCartItem);
  }

}
