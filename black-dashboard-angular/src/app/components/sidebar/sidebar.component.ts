import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/reverse-search",
    title: "Reverse Search",
    rtlTitle: "لوحة القيادة",
    icon: "icon-zoom-split",
    class: ""
  },
  {
    path: "/photos",
    title: "Photos",
    rtlTitle: "ار تي ال",
    icon: "icon-image-02",
    class: ""
  },
  {
    path: "/my-photos",
    title: "My Photos",
    rtlTitle: "ار تي ال",
    icon: "icon-image-02",
    class: ""
  },
  {
    path: "/profile",
    title: "Profile",
    rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/admin",
    title: "Admin",
    rtlTitle: "ار تي ال",
    icon: "icon-settings",
    class: ""
  },
  {
    path: "/login",
    title: "Login",
    rtlTitle: "ار تي ال",
    icon: "icon-badge",
    class: ""
  },
  {
    path: "/register",
    title: "Register",
    rtlTitle: "ار تي ال",
    icon: "icon-credit-card",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}