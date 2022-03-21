import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// amplifyのインポート
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
// amplifyUIのインポート
import "@aws-amplify/ui-vue/styles.css";
// ログイン・サインアップ画面を日本語に設定する為のインポート
import { I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui-vue";
I18n.putVocabularies(translations);
I18n.setLanguage("ja");
//↑

Amplify.configure(awsconfig);

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
