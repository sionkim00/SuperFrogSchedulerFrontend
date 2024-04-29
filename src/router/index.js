import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ViewStudents from "@/views/ViewStudents.vue";
import ViewStudentDetails from "@/views/ViewStudentDetails.vue";
import FindStudents from "@/views/FindStudents.vue";
import ViewSpiritTeamCalendar from "@/views/ViewSpiritTeamCalendar.vue";
import GenerateHonorarium from "@/views/GenerateHonorarium.vue";
import GeneratePerformanceReport from "@/views/GeneratePerformanceReport.vue";
import EditProfile from "@/views/EditProfile.vue";
import RequestAppearance from "@/views/RequestAppearance.vue";
import EditAppearanceRequest from "@/views/EditAppearanceRequest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/spirit-director/view-students",
      name: "viewstudents",
      component: ViewStudents,
      children: [
        {
          path: ":id/view",
          name: "viewstudentdetails",
          component: ViewStudentDetails,
          props: true,
        },
      ],
    },
    {
      path: "/spirit-director/find-students",
      name: "findstudents",
      component: FindStudents,
    },
    {
      path: "/spirit-director/view-spirit-team-calendar",
      name: "viewspiritteamcalendar",
      component: ViewSpiritTeamCalendar,
    },
    {
      path: "/spirit-director/generate-honorarium",
      name: "generatehonorarium",
      component: GenerateHonorarium,
    },
    {
      path: "/spirit-director/generate-performance-report",
      name: "generateperformancereport",
      component: GeneratePerformanceReport,
    },
    {
      path: "/superfrog-student/edit-superfrog-profile",
      name: "editsuperfrogprofile",
      component: EditProfile,
    },
    {
      path: "/customer/request-appearance",
      name: "requestappearance",
      component: RequestAppearance,
    },
    {
      path: "/customer/edit-appearance",
      name: "editappearancerequest",
      component: EditAppearanceRequest,
    },
  ],
});

export default router;
