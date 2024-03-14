window.onload = () => {
	setTheme();
}

function setTheme() {
	if(localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.setAttribute('class', 'dark')
		localStorage.setItem('theme', 'dark')
	}else if(localStorage.getItem('theme') === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
		document.documentElement.setAttribute('class', 'light')
		localStorage.setItem('theme', 'light')
	}
}