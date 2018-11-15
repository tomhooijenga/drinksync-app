import {install} from 'offline-plugin/runtime'
import store from "./store";

install();

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();

    store.state.installPrompt = e;
});