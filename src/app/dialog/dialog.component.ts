import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private api: ApiService, private dialogref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any) { }
  freshList=["Brand New","Second Hand","Old Product"];
  ProductForm !: FormGroup;
  actionbtn:string='Save';
 

  ngOnInit(): void {
    this.ProductForm = this.formbuilder.group({
      productName : ['',Validators.required],
      category: ['',Validators.required],
      freshness : ['',Validators.required],
      price: ['',Validators.required],
      comments : ['',Validators.required],
      date: ['',Validators.required]
    })
    if(this.editData){
      this.actionbtn='Update';
      this.ProductForm.controls['productName'].setValue(this.editData.productName);
      this.ProductForm.controls['category'].setValue(this.editData.category);
      this.ProductForm.controls['freshness'].setValue(this.editData.freshness);
      this.ProductForm.controls['price'].setValue(this.editData.price);
      this.ProductForm.controls['comments'].setValue(this.editData.comments)
      this.ProductForm.controls['date'].setValue(this.editData.date);;

    }
  }
  AddProduct(){
    console.log(this.ProductForm.value);
   if(!this.editData){
    if(this.ProductForm.valid){
      this.api.SaveProduct(this.ProductForm.value).subscribe({
        next:(res)=>{
          alert("Product added successfully!!")
          this.ProductForm.reset();
          this.dialogref.close('save');
        },
        error:()=>{
          alert("Error occurs!!");
        }
      })
    }
   }else{
    this.updateData();
  }
    
  }

  
  updateData(){
    this.api.updateProducts(this.ProductForm.value,this.editData.id).subscribe({
      next: (res)=>{
        alert('Product Updated Successfully!!');
        this.ProductForm.reset();
        this.dialogref.close('update');
      },
      error:()=>{
        alert("Error occurs while updating!!");
      }
    })
  }


}
