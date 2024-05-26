import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { AboutComponent } from "./pages/about/about.component";
import { CareerComponent } from "./pages/career/career.component";
import { TicketConfirmComponent } from "./pages/ticket-confirm/ticket-confirm.component";
import { authGuard } from "./_guards/auth.guard";
import { adminGuard } from "./_guards/admin.guard";
import { AdminPanelComponent } from "./pages/admin-panel/admin-panel.component";
import { AllRoutesComponent } from "./pages/admin/all-routes/all-routes.component";
import { AllDistrictsComponent } from "./pages/admin/all-districts/all-districts.component";
import { AllSchedulesComponent } from "./pages/admin/all-schedules/all-schedules.component";
import { TicketDetailsComponent } from "./pages/ticket-details/ticket-details.component";
import { ticketDetailResolver } from "./_resolvers/ticket-detail.resolver";
import { TicketComponent } from "./pages/ticket/ticket.component";



const routes: Routes = [
{path: '', component:HomeComponent},
{path: 'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'about', component: AboutComponent},
{path:'career', component: CareerComponent},
{ path: 'ticket-confirm', component: TicketConfirmComponent },
{ path: 'ticket/:id', component: TicketDetailsComponent,resolve:{id:ticketDetailResolver} },
{ path: 'tickets', component: TicketComponent },
{path:'', runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children:[
        {path:'ticket-confirm', component: TicketConfirmComponent}
    ]
},
{path:'', runGuardsAndResolvers:'always',
    canActivate: [adminGuard],
    children:[
        {
            path: 'admin-panel',component: AdminPanelComponent
        },
        {
            path: 'all-routes', component: AllRoutesComponent
        },
        {
            path: 'all-districts', component : AllDistrictsComponent
        },
        {
            path: 'all-schedules', component: AllSchedulesComponent
        }
    ]
}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}