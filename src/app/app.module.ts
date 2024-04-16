import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RoutesCardComponent } from "./pages/routes/routes-card/routes-card.component";
import { RoutesListComponent } from "./pages/routes/routes-list/routes-list.component";
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        RoutesCardComponent,
        RoutesListComponent,
        RegisterComponent
    ],
    imports: [
    BrowserModule,        
    AppRoutingModule,
    
    
    ],

    bootstrap: [AppComponent]
})


export class AppModule{}