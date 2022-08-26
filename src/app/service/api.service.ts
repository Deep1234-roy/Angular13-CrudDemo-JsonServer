import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  SaveProduct(data:any){
    return this.http.post("http://localhost:3000/productList/",data);
  }

  GetAllProducts(){
    return this.http.get<any>("http://localhost:3000/productList");
  }

  updateProducts(data:any,id:number){
    return this.http.put("http://localhost:3000/productList/"+id,data);
  }

  deleteProduct(id:number){
    return this.http.delete("http://localhost:3000/productList/"+id);
  }
}
