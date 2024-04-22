import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ViewStudents from "@/views/ViewStudents.vue";
import ViewStudentDetails from "@/views/ViewStudentDetails.vue";
import ModifyStudentDetails from "@/views/ModifyStudentDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/view-students",
      name: "viewstudents",
      component: ViewStudents,
      children: [
        {
          path: ":id/view",
          name: "viewstudentdetails",
          component: ViewStudentDetails,
          props: true,
        },
        {
          path: ":id/modify",
          name: "modifystudentdetails",
          component: ModifyStudentDetails,
          props: true,
        },
      ],
    },
  ],
});

export default router;
