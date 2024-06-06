import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n.js";

// Prime Vue
import PrimeVue from "primevue/config";
import 'primevue/resources/primevue.min.css';

// Router
import router from "./router/index.js";

// Add Components
import 'primeicons/primeicons.css';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import Sidebar from "primevue/sidebar";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import Message from "primevue/message";
import Card from "primevue/card";
import Calendar from 'primevue/calendar'
import InputSwitch from 'primevue/inputswitch';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import RadioButton from "primevue/radiobutton";
import Paginator from 'primevue/paginator';



import {createPinia} from "pinia";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";
import Avatar from "primevue/avatar";
import Textarea from "primevue/textarea";

// Pinia
const pinia = createPinia();

createApp(App)
    .use(PrimeVue, {ripple: true})
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(ToastService)
    .component('pv-inputgroup', InputText)
    .component('pv-message', Message)
    .component('pv-file-upload', FileUpload)
    .component('pv-checkbox', Checkbox)
    .component('pv-dropdown', Dropdown)
    .component('pv-sidebar', Sidebar)
    .component('pv-toast', Toast)
    .component('pv-toolbar',Toolbar)
    .component('pv-avatar', Avatar)
    .component('pv-textarea', Textarea)
    .component('pv-input', InputText)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-calendar', Calendar)
    .component('pv-inputswitch', InputSwitch)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-dialog', Dialog)
    .component('pv-tag', Tag)
    .component('pv-radiobutton', RadioButton)
    .component('pv-paginator', Paginator)
    .mount('#app')
