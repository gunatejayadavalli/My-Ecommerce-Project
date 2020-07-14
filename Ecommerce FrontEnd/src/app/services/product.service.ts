import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private productsBaseUrl = window["restApiDomainUrl"]+"/api/products";
  private categoriesBaseUrl = window["restApiDomainUrl"]+"/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage:number,thePageSize:number, currentCatergoryId: number): Observable<GetResponseProducts>{
    const searchUrl = `${this.productsBaseUrl}/search/findByCategoryId?id=${currentCatergoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(currentCatergoryId: number): Observable<Product[]>{
    const searchUrl = `${this.productsBaseUrl}/search/findByCategoryId?id=${currentCatergoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
      );
  }

  searchProductsPaginate(thePage:number,thePageSize:number, theSearchKeyword: string): Observable<GetResponseProducts>{
    const searchUrl = `${this.productsBaseUrl}/search/findByNameContaining?name=${theSearchKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theSearchKeyword: string): Observable<Product[]>{
    const searchUrl = `${this.productsBaseUrl}/search/findByNameContaining?name=${theSearchKeyword}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategories>(this.categoriesBaseUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  getProduct(productId: number): Observable<Product>{
    const searchUrl = `${this.productsBaseUrl}/${productId}`;
    return this.httpClient.get<Product>(searchUrl);
  }

}


interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
  page: {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCategories{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
