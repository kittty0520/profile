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
const headerContainer = document.querySelector('.header__container');
navbarToggleBtn.addEventListener('click', () => {
	navbarToggleBtn.classList.toggle('active');
	navbarMenu.classList.toggle('open');
	headerContainer.classList.toggle('toggle');
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

//Handle Scrolling on the webstandard contents
//make contents to move horizontally
// const sliderWrap = document.querySelector('.slider__container');
// const sliderInner = document.querySelector('.slider__inner'); 움직이는 영역
// const sliderWeb = document.querySelector('.slider'); 각각 이미지

// let sliderInnerWidth = sliderInner.offsetWidth;
// let sliderWidth = sliderWeb.offsetWidth;
// let offset = 0;

// sliderInner.addEventListener('wheel', (e) => {
// 	// console.log(e.target);
// 	offset += Math.sign(e.deltaY) * 200;
// 	if (offset < 0) {
// 		offset = 0;
// 	} else if (offset > 2 * sliderWidth) {
// 		offset = 2 * sliderWidth;
// 		//다시 계산식 세우기
// 		//마지막 div의 오른쪽 끝이 화면 끝에 붙은 채로 끝나야 됨
// 	}
// 	sliderEffect(offset);
// });

// function sliderEffect(offset) {
// 	sliderInner.style.transition = 'all 1s';
// 	sliderInner.style.transform = `translate3D(-${offset}px,0,0)`;
// }

//study
const studyBtnContainer = document.querySelector('.study__categories');
const studyContainer = document.querySelector('.study__notes');
const studies = document.querySelectorAll('.study');

studyBtnContainer.addEventListener('click', (e) => {
	const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter; //parentNode는 버튼 위의 span영역을 누를떄를 대비함
	if (filter == null) {
		return;
	}
	//Remove selection from previous and select the new one
	const active = document.querySelector('.category__btn.active');
	active.classList.remove('active');
	const target =
		e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
	target.classList.add('active');

	studyContainer.classList.add('ani-out');

	setTimeout(() => {
		studies.forEach((element) => {
			if (filter === '*' || filter === element.dataset.type) {
				element.classList.remove('invisible');
			} else {
				element.classList.add('invisible');
			}
		});
		studyContainer.classList.remove('ani-out');
	}, 300);
});

//making each section transparent when scrolling
//Make sections slowly fade to transparent as the window scrolls down

const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
	if (window.scrollY < homeHeight) {
		home.style.opacity = 1 - window.scrollY / homeHeight;
	}
});

//Show 'arrow up' button when scrolling up
const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
	if (window.scrollY > homeHeight / 2) {
		arrowUp.classList.add('visible');
	} else {
		arrowUp.classList.remove('visible');
	}
});

//Handle click on the 'arrow up' button
arrowUp.addEventListener('click', () => {
	scrollIntoView('#home');
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

//화면 밖으로 나가는 요소에 초점을 맞춤
const observerCallback = (entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			const index = sectionIds.indexOf(`#${entry.target.id}`);
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1;
			} else {
				selectedNavIndex = index - 1;
			}
		}
		// console.log(entry.intersectionRatio);
		if (entry.isIntersecting && entry.intersectionRatio > 0) {
			entry.target.classList.add('show');
		} else if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			entry.target.classList.remove('show');
		}
	});
};

const observerOptions = {
	root: null, //브라우저의 viewport가 기본값
	rootMargin: '0px',
	threshold: 0.2, //target의 가시성이 20%일 때 observer가 실행됨
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => observer.observe(section));

//Resolve the problem that when in first section and last section, selectNavItem is wrong
window.addEventListener('wheel', () => {
	if (window.scrollY === 0) {
		selectedNavIndex = 0;
	} else if (
		Math.round(window.scrollY + window.innerHeight) >=
		document.body.clientHeight
	) {
		selectedNavIndex = navItem.length - 1;
		console.log('max');
	}
	selectNavItem(navItem[selectedNavIndex]);
});

//Show the value of window.innerWidth
const innerHeight = document.querySelector('.innerWidth');
window.addEventListener('resize', () => {
	innerHeight.innerHTML = `<p>${window.innerWidth}<p>`;
});
