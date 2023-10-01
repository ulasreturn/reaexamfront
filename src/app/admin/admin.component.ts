import { Component } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


 
  
 sidebarActive(){
  const btn=document.querySelector('#btn')as HTMLElement;
    
  const searchBtn=document.querySelector('.bx-serach')as HTMLElement;
    const sidebar=document.querySelector('.sidebar')as HTMLElement;
    sidebar.classList.toggle('active'); 
    

}

 

}
