import React from "react";
import {NativeBaseProvider,extendTheme,} from "native-base";
import Main from "./src/Main";
import store from './src/redux/store'
import { Provider } from "react-redux";
import axios from 'axios'
// Define the config
const config = {
	useSystemColorMode: false,
	initialColorMode: "dark",
};
axios.defaults.baseURL = "https://rootrsk-cloudvision.herokuapp.com"
// extend the theme
export const theme = extendTheme({ config });

export default function App() {
	return (
		<NativeBaseProvider>
			<Provider store={store} >
				<Main />
			</Provider>
		</NativeBaseProvider>
	);
}

