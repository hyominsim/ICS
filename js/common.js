
/*
 *  반응형 사이즈 감지
 */
function responsiveImg() {
    let width = document.documentElement.offsetWidth;
    let sizeMode = width > 1600 ? 'xxxl' : width > 1400 ? 'xxl' : width > 1200 ? 'xl' : width > 1024 ? 'lg' : width > 768 ? 'md' : width > 576 ? 'sm' : width > 375 ? 'xs' : 'xxs';

    return sizeMode;
}

document.addEventListener('DOMContentLoaded', function () {
    /*
     *  GNB영역(PC) - hover
     */
    if ($(window).width() > 1024) {
        // 개별 메뉴 아이템 활성화
        $('header.sub .header__gnb .depth1 a').on('mouseenter focusin', function () {
            // 다른 항목의 active 클래스를 제거
            $('header.sub .header__gnb .depth1 a').removeClass('active');
            $(this).addClass('active');
        });

        // 포커스가 메뉴 항목에서 벗어날 때 active 제거
        $('header.sub .header__gnb .item').on('focusout', function (e) {
            // 포커스가 다른 메뉴 항목으로 이동하지 않는 경우에만 active 제거
            if (!$(e.relatedTarget).closest('header.sub .header__gnb .depth1 a').length) {
                $(this).removeClass('active');
            }
        });

        // 메뉴 전체에서 포커스가 벗어날 때 전체 메뉴 비활성화
        $('header.sub .header__gnb').on('focusout', function (e) {
            if (!$(e.relatedTarget).closest('header.sub .header__gnb .depth1 a').length) {
                $(this).removeClass('active');
            }
        });

        // 마우스가 메뉴 전체를 떠날 때
        $('header.sub .header__gnb').on('mouseleave', function () {
            $(this).removeClass('active');
            // 모든 item에서 active 클래스 제거
            $('header.sub .header__gnb .depth1 a').removeClass('active');
        });
    }

    /*
     *   GNB(Mobile) - ON/OFF
     */
    const gnbMoOpenBtn = document.getElementById('btnMobileMenu');
    const gnbMoCloseBtn = document.getElementById('mobileMenuCloseBtn');
    const mobileMenuEl = document.getElementById('mobileMenu');
    const mobileUtilEl = document.querySelector('.header__util');

    // 모바일 메뉴 - 열기
    gnbMoOpenBtn.addEventListener('click', () => {
        mobileMenuEl.classList.add('active');
        document.body.classList.add('modal--active');

        // header util
        if (mobileMenuEl.classList.contains('active')) {
            mobileUtilEl.classList.add('on');
        }
    });
    // 모바일 메뉴 - 닫기
    gnbMoCloseBtn.addEventListener('click', () => {
        mobileMenuEl.classList.remove('active');
        document.body.classList.remove('modal--active');

        // header util
        mobileUtilEl.classList.remove('on');
    });

    /*
     *  GNB(Mobile) 메뉴 아코디언, 아코디언 요소(공통 사용)
     */
    // 1depth
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const accordionBody = header.nextElementSibling;
            const item = accordionBody.parentElement;

            accordionBody.style.display = accordionBody.style.display === 'block' ? 'none' : 'block';

            // accordionBody(2depth)가 display:block이면 item의 클래스에 'active'를 추가
            // 클릭한 item의 accordionBody(2depth)만 block이고 나머지는 none이어야함
            if (accordionBody.style.display === 'block') {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }

            // 현재 열려 있는 모든 아코디언 항목 닫기
            const openAccordions = document.querySelectorAll('.accordion-body');
            openAccordions.forEach((openAccordion) => {
                if (openAccordion !== header.nextElementSibling) {
                    openAccordion.style.display = 'none';
                    openAccordion.parentElement.classList.remove('active');
                }
            });
        });
    });

    // 2depth
    const innerAccordionHeaders = document.querySelectorAll('.inner-accordion-header');

    innerAccordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            // 현재 열려 있는 모든 내부 아코디언 항목 닫기
            const openInnerAccordions = document.querySelectorAll('.inner-accordion-body');
            openInnerAccordions.forEach((openInnerAccordion) => {
                if (openInnerAccordion !== header.nextElementSibling) {
                    openInnerAccordion.style.display = 'none';
                    openInnerAccordion.parentElement.classList.remove('active');
                }
            });
            // 클릭된 항목 열거나 닫기
            const innerAccordionBody = header.nextElementSibling;
            innerAccordionBody.style.display = innerAccordionBody.style.display === 'block' ? 'none' : 'block';
            const item = innerAccordionBody.parentElement;

            if (innerAccordionBody.style.display === 'block') {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    /*
     *  테이블 아코디언
     */
    const accordionHeadersTb = document.querySelectorAll('.tb-accordion-header .td-more--btn');

    accordionHeadersTb.forEach((headerTb) => {
        headerTb.addEventListener('click', () => {
            const accordionBodyFAQ = headerTb.closest('.tb-accordion-header').nextElementSibling;
            const item = accordionBodyFAQ.parentElement;
            const arrowIcon = headerTb.firstChild;

            accordionBodyFAQ.style.display = accordionBodyFAQ.style.display === 'block' ? 'none' : 'block';

            if (accordionBodyFAQ.style.display === 'block') {
                item.classList.add('active');
                arrowIcon.style.transform = 'rotate(180deg)';
            } else {
                item.classList.remove('active');
                arrowIcon.style.transform = 'rotate(0deg)';
            }
        });
    });

    /**
     * 스크롤 커스텀(세로)
     */
    $(function () {
        $('.scroll').mCustomScrollbar();
    });

    /**
     * 스크롤 커스텀(가로)
     */
    $('.scroll-x .right').mCustomScrollbar({
        axis: 'x', // 가로 스크롤바
    });

    /**
     * 요소가 화면에 보여짐 여부에 따른 요소 관리
     */
    const spyEls = document.querySelectorAll('.scroll-spy');
    const controller = new ScrollMagic.Controller();

    spyEls.forEach(function (spyEl) {
        new ScrollMagic.Scene({
            triggerElement: spyEl,
            triggerHook: 0.65,
        })
            .setClassToggle(spyEl, 'show')
            .addTo(controller);
    });

    /**
     * select box 커스텀
     */
    var x, i, j, l, ll, selectEl, a, b, c;
    x = document.getElementsByClassName('custom-select');
    l = x.length;
    for (i = 0; i < l; i++) {
        selectEl = x[i].getElementsByTagName('select')[0];
        ll = selectEl.length;
        a = document.createElement('DIV');
        a.setAttribute('class', 'select-selected');
        a.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;
        x[i].appendChild(a);
        b = document.createElement('DIV');
        b.setAttribute('class', 'select-items select-hide');
        for (j = 1; j < ll; j++) {
            c = document.createElement('DIV');
            c.innerHTML = selectEl.options[j].innerHTML;
            c.addEventListener('click', function (e) {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName('select')[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName('same-as-selected');
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute('class');
                        }
                        this.setAttribute('class', 'same-as-selected');
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener('click', function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
        });
    }
    function closeAllSelect(El) {
        var x,
            y,
            i,
            xl,
            yl,
            arrNo = [];
        x = document.getElementsByClassName('select-items');
        y = document.getElementsByClassName('select-selected');
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (El == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove('select-arrow-active');
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add('select-hide');
            }
        }
    }
    document.addEventListener('click', closeAllSelect);

    /*
     *  자주묻는 질문
     */
    const accordionHeadersFAQ = document.querySelectorAll('.faq-accordion-header');

    accordionHeadersFAQ.forEach((headerFAQ) => {
        headerFAQ.addEventListener('click', () => {
            const accordionBodyFAQ = headerFAQ.nextElementSibling;
            const item = accordionBodyFAQ.parentElement;
            accordionBodyFAQ.style.display = accordionBodyFAQ.style.display === 'block' ? 'none' : 'block';

            if (accordionBodyFAQ.style.display === 'block') {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    /*
     *   모달창 - 공통 기능
     */
    var modalOpenBtns = document.querySelectorAll('.modal-btn--open');
    var modalCloseBtns = document.querySelectorAll('.close-btn');

    // 모달 열기
    modalOpenBtns.forEach((btn) => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            const modalId = btn.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);

            // 스크롤 비활성화
            document.documentElement.style.overflowY = 'hidden';
            modal.classList.add('active');
        });
    });
    // 모달 닫기
    modalCloseBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');

            // 스크롤 활성화
            document.documentElement.style.overflowY = '';
            modal.classList.remove('active');
        });
    });

    /*
     *  주요알림(팝업)
     */
    const popSwiper = new Swiper('#noticePop .swiper-container', {
        slidesPerView: 1, // 한번에 보여줄 슬라이드 개수
        loop: true,
        spaceBetween: 0, // 슬라이드 사이 여백
        speed: 200,
        navigation: {
            prevEl: '#noticePop .btn--prev',
            nextEl: '#noticePop .btn--next',
        },
        pagination: {
            el: '#noticePop .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    /*
     *  탑버튼
     */
    const topBtnEl = document.getElementById('topBtn');

    const backToTop = () => {
        // Scroll | button show/hide
        window.addEventListener('scroll', () => {
            if (document.querySelector('html').scrollTop > 100) {
                topBtnEl.style.display = 'block';
            } else {
                topBtnEl.style.display = 'none';
            }
        });
        // back to top
        topBtnEl.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        });
    };
    backToTop();

    /*
     * 탭메뉴 - 공통 사용
     */
    function findParent(el, className) {
        let check = el.parentNode.classList.contains(className);

        if (check === true) {
            return el.parentNode;
        } else {
            return findParent(el.parentNode, className);
        }
    }

    function bindingTabEvent(wrap) {
        let wrapEl = document.querySelectorAll(wrap);

        wrapEl.forEach(function (tabArea) {
            let btn = tabArea.querySelectorAll('.btn_tab');

            btn.forEach(function (item) {
                item.addEventListener('click', function () {
                    // 현재 클릭한 버튼에 해당하는 탭의 영역단위를 묶고 있는 부모를 찾습니다.
                    let parent = findParent(this, 'tab__area');
                    // 현재 버튼이 가지고 있는 idx 값.
                    let idx = this.dataset['idx'];
                    // 현재 버튼이 가지고 있는 depth값.
                    let depth = this.dataset['depth'];
                    // 현재 버튼과 동일 선상에 있는 다른 버튼들.
                    let btnArr = parent.querySelectorAll('.btn_tab[data-depth="' + depth + '"]');
                    // 현재 버튼에 해당하는 그륩단위 안의 컨텐츠 엘리먼트들.
                    let contentArr = parent.querySelectorAll('.content_area[data-depth="' + depth + '"]');

                    btnArr.forEach(function (btn) {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-selected', 'false');
                    });
                    this.classList.add('active');
                    this.setAttribute('aria-selected', 'true');
                    contentArr.forEach(function (content) {
                        content.classList.remove('active');
                    });
                    parent.querySelector('.content_area[data-idx="' + idx + '"][data-depth="' + depth + '"]').classList.add('active');
                });
            });
        });
    }
    bindingTabEvent('.tab_wrap');

    /*
     *  게시판 필터(최신순, 인기순)
     */
    const boardFilter = document.querySelector('.board-list__filter');

    if (boardFilter) {
        let boardFilterBtn = boardFilter.querySelectorAll('li');

        boardFilterBtn.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                let boardFilterBtnOn = boardFilter.querySelector('.active');
                if (boardFilterBtnOn) {
                    boardFilterBtnOn.classList.remove('active');
                }
                this.classList.add('active');
            });
        });
    }

    /**
     * 게시판 pagination
     */
    const pageNum = document.querySelector('.pagination');

    if (pageNum) {
        let pageNumBtn = pageNum.querySelectorAll('.page-num--btn a');

        pageNumBtn.forEach(function (btn) {
            btn.addEventListener('mouseenter', function () {
                if (!this.classList.contains('active')) {
                    this.style.backgroundColor = '#f5f5f5';
                }
            });
            btn.addEventListener('mouseleave', function () {
                if (!this.classList.contains('active')) {
                    this.style.background = 'none';
                }
            });
        });
    }

    /**
     * table open/close
     */
    // close
    function hideRow() {
        const row = document.querySelector('.td-more--btn.close');
        row.style.display = 'none';
    }
    // open
    function showRow() {
        const row = document.querySelector('.td-more--btn.open');
        row.style.display = '';
    }

    /*
     *  팝업(magnific popup - inline)
     */
    $(document).ready(function () {
        $('.open-popup-inline').each(function () {
            $(this).magnificPopup({
                type: 'inline',
                midClick: true,
                mainClass: $(this).data('effect') || '', // 추가된 효과가 있는지 확인
                items: {
                    src: $(this).data('popup'),
                },
            });
        });
    });
});




window.addEventListener('scroll', function () {
    const header = document.getElementById('sub_header');
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 100) {
        header.classList.add('scroll-active');
    } else {
        header.classList.remove('scroll-active');
    }
});


//서브메뉴 이벤트
document.addEventListener("DOMContentLoaded", function () {
const menu1 = document.querySelector('.menu-1');
const menu1Anchor = menu1.querySelector('a');
const menu2 = document.querySelector('.menu-2');
const menu2Anchor = menu2.querySelector('a');
const menu2SubMenu = menu2.querySelector('.sub-menu');

// 각 항목에 대응할 내용 매핑
const menuMap = {
    guid: {
        title: "학교 안내",
        items: [
            { text: "총장 인사말", link: "../sub/총장인사말.html" },
            { text: "설립 철학 및 목적", link: "../sub/설립이념및교육목적.html" },
            { text: "이사, 조직도", link: "../sub/조직도.html" },
            { text: "오시는 길", link: "../sub/오시는길.html" }
        ]
    },
    admission: {
        title: "입학 안내",
        items: [
            { text: "모집요강", link: "../sub/모집요강.html" },
            { text: "원서접수", link: "../sub/원서접수.html" }
        ]
    },
    academic: {
        title: "학사 안내",
        items: [
            { text: "학사 제도", link: "../sub/학사제도.html" },
            { text: "학사 규정", link: "../sub/학사규정.html" },
            { text: "장학 규정", link: "../sub/장학규정.html" }
        ]
    },
    department: {
        title: "학과 안내",
        items: [
            { text: "목회학과", link: "../sub/목회학과.html" },
            { text: "목회음악학과", link: "../sub/목회음악학과.html" },
            { text: "외래교수 소개", link: "../sub/외래교수소개.html" }
        ]
    },
    community: {
       items: [
            { text: "오프라인 세미나", link: "../sub/오프라인세미나.html" },
            { text: "서식 자료실", link: "../sub/서식자료실.html" },
            { text: "갤러리", link: "../sub/갤러리.html" }
        ]
    },
    news: {
        title: "뉴스",
        items: [
            { text: "공지사항", link: "../sub/게시판.html" }
        ]
    }
};

// menu-1 링크 클릭 이벤트
document.querySelectorAll('.menu-1 .sub-menu li a').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = this.dataset.target;
        const linkText = this.textContent.trim();

        if (menuMap[target]) {
            const { items } = menuMap[target];

            // 1. menu-1의 텍스트를 클릭된 항목으로 변경
            menu1Anchor.innerHTML = `${linkText}<img src="../img/sub/icon_submenu.svg">`;

            // 2. menu-2의 텍스트를 동적으로 변경 (menu-2의 첫 번째 하위 메뉴 항목으로)
            if (items.length > 0) {
                const firstItemText = items[0].text; // Use .text property
                menu2Anchor.innerHTML = `${firstItemText}<img src="../img/sub/icon_submenu.svg">`;
                
                // menu-2의 하위 메뉴를 업데이트. 링크와 텍스트를 동적으로 설정
                menu2SubMenu.innerHTML = items.map(item => `<li><a href="${item.link}">${item.text}</a></li>`).join('');
            } else {
                menu2Anchor.innerHTML = `<img src="../img/sub/icon_submenu.svg">`;
                menu2SubMenu.innerHTML = '';
            }

            // 3. 다른 메뉴는 모두 닫고, menu-2만 활성화
            document.querySelectorAll('.menu').forEach(otherMenu => {
                otherMenu.classList.remove('active');
            });
            menu2.classList.add('active');
        }
    });
});

// menu-1과 menu-2의 클릭 이벤트를 추가하여 하위 메뉴를 토글
document.querySelectorAll('.menu').forEach(menu => {
    const anchor = menu.querySelector('a');
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // 다른 메뉴는 닫고, 현재 메뉴만 토글
        document.querySelectorAll('.menu').forEach(otherMenu => {
            if (otherMenu !== menu) {
                otherMenu.classList.remove('active');
            }
        });
        menu.classList.toggle('active');
    });
});
});
