import App from './App.svelte';
import * as iconData from '../../data/icons.json'; 

const app = new App({
	target: document.body,
	props: {
		icons: iconData
	}
});

export default app;