import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent
    ],
    imports: [
    BrowserModule,        
    AppRoutingModule,
    
    
    ],

    bootstrap: [AppComponent]
})


export class AppModule{}