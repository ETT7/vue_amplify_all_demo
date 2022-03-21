import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@aws-amplify/ui-vue/styles.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-vue';
I18n.putVocabularies(translations);
I18n.setLanguage('ja');


Amplify.configure(awsconfig);



const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
