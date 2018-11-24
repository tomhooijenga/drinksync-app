import {install} from 'offline-plugin/runtime'
import store from "./store";

install();

const appMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

if (!appMode) {
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();

        store.state.install.prompt = e;
    });
}
