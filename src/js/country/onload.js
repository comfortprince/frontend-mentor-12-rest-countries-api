window.onload = () => {
	setTheme();
}

function setTheme() {
	if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.setAttribute('class', 'dark')
		localStorage.theme = 'dark'
	}else if(localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
		document.documentElement.setAttribute('class', 'light')
		localStorage.theme = 'light'
	}
}