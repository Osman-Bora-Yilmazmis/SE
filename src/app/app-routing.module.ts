import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { EventDetailComponent } from './home/event-detail/event-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'createuser',component:CreateUserComponent},
  {path:'home',component:HomeComponent},
  {path:'usersettings', component:UserSettingsComponent},
  // {path:"event/add",component:EventDetailComponent},
  {path:'restoran/:id', component:EventDetailComponent},
  {path:'favourites', component:FavouritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
