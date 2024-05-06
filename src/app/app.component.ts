import { Component, OnInit,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BreakpointObserver,Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,MobileNavbarComponent,HttpClientModule,LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front-ca';

  http = inject(HttpClient)
  products:any =[]
  productSelected=""
  currentScreenSize=''

  ngOnInit(): void {
    this.fetchData()
  }


  fetchData(){
    this.http.get('http://localhost:3000/products').subscribe((data:any)=>{
      this.products = data
    })
  }

sizeDisplay=new Map([
  [Breakpoints.XSmall,'Xsmall'],
  [Breakpoints.Small,'Small'],
  [Breakpoints.Medium,'Medium'],
  [Breakpoints.Large,'Large']
])

constructor(breakpointObserver : BreakpointObserver){
  breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large
  ]).subscribe((res)=>{
    for(const query of Object.keys(res.breakpoints)){
      if (res.breakpoints[query]) {
        this.currentScreenSize = this.sizeDisplay.get(query)  ?? 'Unknown'
      }
    }
  })
}
}
