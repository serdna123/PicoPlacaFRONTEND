import { createRouter, createWebHistory } from "vue-router";
import ConsultarPicoPlaca from "../components/consultarPicoPlaca/ConsultarPicoPlaca.vue";
import PicoPlaca from "../components/picoplaca/PicoPlaca.vue";
const routes = [
    {
      path: "/consultar",
      name: "consultarPicoPlaca",
      component: ConsultarPicoPlaca,
    },  
    {
      path: "/picoplaca",
      name: "picoPlaca",
      component: PicoPlaca,
    },
    
  
  ];
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

export default router;