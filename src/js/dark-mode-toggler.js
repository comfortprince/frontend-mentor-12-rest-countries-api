document.querySelector('#dark-mode-toggler').addEventListener('click', toggleTheme)

function toggleTheme() {
	let theme = document.documentElement.getAttribute('class')

	if(theme === 'dark'){
		document.documentElement.setAttribute('class', 'light')
		localStorage.theme = 'light'
	}

	if(theme === 'light'){
		document.documentElement.setAttribute('class', 'dark')
		localStorage.theme = 'dark'
	}
}