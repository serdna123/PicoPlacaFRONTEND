/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import "bootstrap/dist/js/bootstrap.min";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import VirtualScroller from "primevue/virtualscroller";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import SelectButton from "primevue/selectbutton";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Card from "primevue/card";
import Calendar from "primevue/calendar";
import Editor from "primevue/editor";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Password from "primevue/password";

//css
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.component("DataTable", DataTable);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Column", Column);
app.component("VirtualScroller", VirtualScroller);
app.component("Button", Button);
app.component("Toolbar", Toolbar);
app.component("FileUpload", FileUpload);
app.component("InputText", InputText);
app.component("Menubar", Menubar);
app.component("Dialog", Dialog);
app.component("InputNumber", InputNumber);
app.component("SelectButton", SelectButton);
app.component("RadioButton", RadioButton);
app.component("Checkbox", Checkbox);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);
app.component("Editor", Editor);
app.component("Toast", Toast);
app.component("ToastService", ToastService);
app.component("Password", Password);
app.component("Card", Card);

app.use(PrimeVue).use(router).use(ToastService).mount("#app");
