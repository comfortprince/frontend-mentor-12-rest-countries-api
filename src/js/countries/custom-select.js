document.querySelector('#region-filter-toggler').addEventListener('click', (e) => {
	const regionFilterToggler = e.currentTarget
	const dropdownContentWrapper = regionFilterToggler.nextElementSibling
	
	if ( dropdownContentWrapper.dataset.status !== "active" ) {
		dropdownContentWrapper.dataset.status = "active"
	} else if ( dropdownContentWrapper.dataset.status === "active" ) {
		dropdownContentWrapper.dataset.status = ""
	} 
})