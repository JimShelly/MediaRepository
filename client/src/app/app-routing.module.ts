import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatemediaComponent } from "./createmedia/createmedia.component";
import { MediaComponent } from "./media/media.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "repository", component: MediaComponent },
  { path: "create", component: CreatemediaComponent },
  { path: "contacts", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
