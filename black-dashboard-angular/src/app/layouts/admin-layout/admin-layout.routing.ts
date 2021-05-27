import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ReverseSearchComponent } from "../../pages/reverse-search/reverse-search.component";
import { AdminComponent } from "../../pages/admin/admin.component";
import { LoginComponent } from "../../pages/login/login.component";
import { MyPhotosComponent } from "../../pages/my-photos/my-photos.component";
import { PhotosComponent } from "../../pages/photos/photos.component";
import { ProfileComponent } from "../../pages/profile/profile.component";
import { RegisterComponent } from "../../pages/register/register.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "reverse-search", component: ReverseSearchComponent},
  { path: "admin", component: AdminComponent },
  { path: "login", component: LoginComponent },
  { path: "my-photos", component: MyPhotosComponent },
  { path: "photos", component: PhotosComponent },
  { path: "profile", component: ProfileComponent },
  { path: "register", component: RegisterComponent }
  // { path: "rtl", component: RtlComponent }
];