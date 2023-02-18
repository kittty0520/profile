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

//Handle Scrolling when tapping on the navbar menu
//scroll to section when button are clicked
navbarMenu.addEventListener('click', (event) => {
	const target = event.target;
	const link = target.dataset.link;
	if (link === null) {
		return;
	}
	navbarMenu.classList.remove('open');
	navbarToggleBtn.classList.remove('active');
	scrollIntoView(link);
	selectNavItem(target);
});

//Handle click on 'contact me' button on home
const contactButton = document.querySelector('.home__contact');
contactButton.addEventListener('click', () => {
	scrollIntoView('#contact');
});

//1. 모든 섹션 요소들을 가지고 온다.
//2. IntersectionOserver를 이용해서 모든 섹션들을 관찰한다.
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 한다.

const sectionIds = [
	'#home',
	'#about',
	'#skills',
	'#works',
	'#study',
	'#contact',
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItem = sectionIds.map((id) =>
	document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItem[0];

function selectNavItem(selected) {
	selectedNavItem.classList.remove('active');
	selectedNavItem = selected;
	selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({ behavior: 'smooth' });
	// selectNavItem(navItem[sectionIds.indexOf(selector)]);
}
