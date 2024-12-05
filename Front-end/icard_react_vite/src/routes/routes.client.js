import { ClientLayout, BasicLayout } from "../layouts";
import { Error404 } from "../pages";
import {
  SelectTable,
  Categories,
  Products,
  Cart,
  OrdersHistory,
} from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
  },
  {
    path: "/client/:tableNumber",
    layout: ClientLayout,
    component: Categories,
  },
  {
    path: "/client/:tableNumber/cart",
    layout: ClientLayout,
    component: Cart,
  },
  {
    path: "/client/:tableNumber/orders",
    layout: ClientLayout,
    component: OrdersHistory,
  },
  {
    path: "/client/:tableNumber/:idCategory",
    layout: ClientLayout,
    component: Products,
  },
];

export default routesClient;
