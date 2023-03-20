# 👩‍💼Profile

## 📃index

1.[기획의도](#계획의도)  
2.[기술스택](#기술스택)  
3.[기능](#기능)  
4.[배운점](#배운-점)

## 🎯기획의도

> 저를 소개합니다!

## ✨기술스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Visual Studio-5C2D91?style=for-the-badge&logo=Visual Studio&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 📚구성

#### About Me

- 저에 대한 소개글입니다.

#### Skills

- 공부하면서 다루었던 기술 스택과 디자인 툴을 간단한 이미지로 표현했습니다.

#### Works

- 제가 작업한 개인 프로젝트를 소개하고, 바로가기 버튼을 누르면 실제 배포된 사이트를 방문할 수 있도록 했습니다.

#### Study

- 강의를 수강하면서 따라 만든 작업물을 확인 수 있도록 했습니다.

#### Contact

- 이메일 주소과 제 작업물을 구경할 수 있는 개인 깃허브 링크입니다.

<br/>

## 배운 점

- 스크롤을 내릴 때 header를 다크모드로 변환하는 기능

  - window.scrollY : 해당 문서가 수직방향으로 얼마나 스크롤되었는지를 px단위로 반환

  - getBoundingClientRect().height

<br/>

- Navbar 토글 버튼

  - navbarMenu.classlist.toggle('open') : navbarMenu 요소에 'open' 클래스가 있으면 해당 클래스를 지우고, 'open' 클래스가 없으면 추가한다.

<br/>

- Navbar메뉴를 누르면 해당 section으로 scroll

  - dataset 속성 : nav의 list와 대응되는 section을 매칭

  - element.scrollIntoView 메서드를 커스텀하여 사용

    ```javascript
    function scrollIntoView(selector) {
    	const scrollTo = document.querySelector(selector);
    	scrollTo.scrollIntoView({ behavior: 'smooth' });
    }
    ```

  - IntersectionObserver을 활용하여 스크롤

    - IntersectionObserver : 대상 요소와 상위 요소, 또는 대상 요소와 최상위 문서의 뷰포트가 서로 교차하는 영역이 달라지는 경우 이를 비동기적으로 감지한다. 즉, 요소가 특정한 영역에 위치했을 때를 알려주는 관찰자 역할을 한다.

    ```javascript
    const observer = new IntersectionObserver(
    	observerCallback,
    	observerOptions
    );
    ```

    - observerCallback : 요소가 특정한 영역에 들어왔을 때 호출되는 콜백함수, entries(IntersectionObserverEntry)와 observer를 인자로 받는다.

      - entries의 속성들: boundingClientRect, intersectionRatio, target, ...etc

    - oberserverOptions : 특정한 영역에 대한 옵션값

      ```javascript
      const observerOptions = {
      	root: null, //브라우저의 viewport가 기본값
      	rootMargin: '0px', //root영역에 margin을 추가
      	threshold: 0.2, //target의 가시성이 20%일 때 observer가 실행됨
      };
      ```
