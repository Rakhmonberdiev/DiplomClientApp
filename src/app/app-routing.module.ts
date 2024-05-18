import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { AboutComponent } from "./pages/about/about.component";
import { CareerComponent } from "./pages/career/career.component";
import { TicketConfirmComponent } from "./pages/ticket-confirm/ticket-confirm.component";


const routes: Routes = [
{path: '', component:HomeComponent},
{path: 'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'about', component: AboutComponent},
{path:'career', component: CareerComponent},
{ path: 'ticket-confirm', component: TicketConfirmComponent }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}