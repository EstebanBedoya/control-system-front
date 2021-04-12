// import pages
import AuthPage from "../pages/AuthPage";
import RoomsPage from "../pages/RoomsPage";
import ServicesPage from "../pages/ServicesPage";
import ProductsPage from "../pages/ProductsPage";
import OptionsPage from "../pages/OptionsPage";
import HistoryBarPage from "../pages/HistoryBarPage";
import CreateProductPage from "../pages/CreateProducPage";
import TotalitiesPage from "../pages/TotalitiesPage";
import Tab3 from "../pages/Tab3";

const routes: any = [
  {
    path: "/auth",
    component: AuthPage,
  },
  {
    path: "/rooms",
    component: RoomsPage,
  },
  {
    path: "/products",
    component: ProductsPage,
  },
  {
    path: "/products/create",
    component: CreateProductPage,
  },
  {
    path: "/options",
    component: OptionsPage,
  },
  {
    path: "/options/services-history",
    component: ServicesPage,
  },
  {
    path: "/options/bar-history",
    component: HistoryBarPage,
  },
  {
    path: "/options/totalities",
    component: TotalitiesPage,
  },
  {
    path: "/tab3",
    component: Tab3,
  },
];

export default routes;
