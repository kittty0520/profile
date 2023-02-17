'use strict';

//make header transparent when it is on the top
const header = document.querySelector('#header');
const headerHeight = header.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
	if (window.scrollY > headerHeight) {
		header.classList.add('header--dark');
	} else {
		header.classList.remove('header--dark');
	}
});

// navbar toggle button for small screen
const navbarMenu = document.querySelector('.navbar__menu');
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
	navbarToggleBtn.classList.toggle('active');
	navbarMenu.classList.toggle('open');
});
