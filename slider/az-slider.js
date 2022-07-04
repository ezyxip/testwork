/*
	Механизм работает следующим образом: 
1. Для класса слайдера задаётся id текущего слайда. Слайд должен находиться в гриде
2. Внутри должны находиться слайды с классами js-slider, current-js-slider
*/

//Класс, который управляет механизмом слайдера
class Slider{
    
    //Задача конструктора - найти все слайды и занести их в память
	constructor(idElement){
        //получение заданного элемента
        let rootElem = document.getElementById(idElement);
        let elems = rootElem.childNodes;
        this.slides = new Array();  //здесь будут храниться все слайды
        //цикл пробегает по всем детям заданного элемента и ищет среди них слайды
        for(let i = 1; i < elems.length; i+=2){
            if(elems[i].classList.contains("az-slide")){
                this.slides.push(elems[i]);
                if(this.slides.length != 1){
                    elems[i].style.display = "none"; // все элементы после первого скрываются
                    elems[i].style.zIndex = "0";
                } else{
                    elems[i].style.zIndex = "2";
                }
            }
        }
        this.flag = true;
        this.slides.push(this.slides.shift());
        this.navigator = document.getElementsByClassName("az-point");
        this.currentSlide = 0;
        this.navigator[this.currentSlide].style.backgroundColor = "black";
    }
    
	//Метод, непосредственно вызываемые для перелистывания страницы на одну
	onFlip(){ 
        if(this.flag){
            this.flag = false;
        }else{
            return;
        }
        this.navigator[this.currentSlide].style.backgroundColor = "gray";
        //Получение целевого слайда
        let nextSlide = this.slides.shift();
        //Помещение его в начало списка
        this.slides.push(nextSlide);
        //Получение текущего слайда
        let currentSlide = this.slides[this.slides.length-2];
        //Тут будут храниться изначальные относительные значения размеров всех дочерних элементов
        /*let computedChild = new Array();
        //рассчёт всех параметров блока
        nextSlide.style.display = "block";
        //В цикле получаются все относительные параметры детей и запоминаются
        //Затем они заменяются на вычисленные значения
        for(let i = 1; i < nextSlide.childNodes.length; i+=2){
            computedChild[i-1] = nextSlide.childNodes[i].style.width;
            computedChild[i] = nextSlide.childNodes[i].style.height;
            nextSlide.childNodes[i].style.width = nextSlide.childNodes[i].offsetWidth + "px";
            nextSlide.childNodes[i].style.height = nextSlide.childNodes[i].offsetHeight + "px";
        }
        //Текущий слайдер помещается за целевой
        currentSlide.style.zIndex = "1";
        nextSlide.style.zIndex = "2";
        //подготовка целевого слайда
        nextSlide.style.marginRight = "0px";
        nextSlide.style.marginLeft = "auto";
        nextSlide.style.width = "0px";
        let width = 0;
        let marginLeft = 0;
        //собственно, анимация
        let SIid = setInterval((function(c){
            //каждые 5мс целевой слайд увеличивается на процент, а текущий - съезжает влево 
            nextSlide.style.width = ++width + "%";
            currentSlide.style.marginLeft = --marginLeft + "%";
            //как только анимация закончена, все значения целевого слайда заменяются обратно на относительные
            //все навесы на текущий слайд обнуляются, он выводится из потока отрисовки
            if(width == 100){
                for(let i = 1; i < nextSlide.childNodes.length; i+=2){
                    nextSlide.childNodes[i].style.width = computedChild[i-1];
                    nextSlide.childNodes[i].style.height = computedChild[i];
                }
                nextSlide.setAttribute("style", "");
                currentSlide.setAttribute("style", "");
                currentSlide.style.display = "none";
                currentSlide.style.zIndex = "0";
                window.slider.flag = true;
                clearInterval(SIid);
            }
        }), 5);*/
        /*let computedChild = new Array();
        computedChild[0] = currentSlide.style.width;
        computedChild[1] = currentSlide.style.height;
        computedChild[2] = nextSlide.style.width;
        computedChild[3] = nextSlide.style.height;*/
        nextSlide.style.display = "";
        /*currentSlide.style.width = currentSlide.offsetWidth + "px";
        currentSlide.style.height = currentSlide.offsetHeight + "px";
        nextSlide.style.width = currentSlide.offsetWidth + "px";
        nextSlide.style.height = currentSlide.offsetHeight + "px";*/
        nextSlide.style.marginLeft = "100%";
        let marginLeft = 100;
        let marginRight = 0;
        let SIid = setInterval((function(c){
            nextSlide.style.marginLeft = --marginLeft + "%";
            currentSlide.style.marginLeft = --marginRight + "%";
            if(marginLeft == 0){
                nextSlide.setAttribute("style", "");
                currentSlide.setAttribute("style", "");
                currentSlide.style.display = "none";
                currentSlide.style.zIndex = "0";
                nextSlide.style.zIndex = "2";
                window.slider.flag = true;
                clearInterval(SIid);
            }
        }), 5);
        
        this.currentSlide++;
        this.currentSlide %= 5;
        this.navigator[this.currentSlide].style.backgroundColor = "black";
     }
     
    onFlipBack(){
        if(this.flag){
            this.flag = false;
        }else{
            return;
        }
        this.navigator[this.currentSlide].style.backgroundColor = "gray";
         //получение текущего слайда
        let currentSlide = this.slides.pop();
        this.slides.unshift(currentSlide);
        let backSlide = this.slides[this.slides.length-1];
        backSlide.style.marginLeft = "-100%";
        backSlide.style.display = "";
        let marginLeft = -100;
        let marginRight = 0;
        let SIid = setInterval((function(c){
            backSlide.style.marginLeft = ++marginLeft + "%";
            currentSlide.style.marginLeft = ++marginRight + "%";
            if(marginLeft == 0){
                backSlide.setAttribute("style", "");
                currentSlide.setAttribute("style", "");
                currentSlide.style.display = "none";
                currentSlide.style.zIndex = "0";
                backSlide.style.zIndex = "2";
                window.slider.flag = true;
                clearInterval(SIid);
            }
        }), 5);
        this.currentSlide--;
        this.currentSlide = (this.currentSlide+5) % 5;
        this.navigator[this.currentSlide].style.backgroundColor = "black";
    }
     
    flip(slideNumber){
        slideNumber %= 6;
        if(this.currentSlide == slideNumber-1)
            return;
        if(this.flag){
            this.flag = false;
        }else{
            return;
        }
        let nextSlide;
        let currentSlide = this.slides[this.slides.length-1];
        for(let i = this.slides.length - 1 - this.currentSlide + slideNumber-1; i > 0; i--){
            nextSlide = this.slides.shift();
            this.slides.push(nextSlide);
        }
        this.navigator[this.currentSlide].style.backgroundColor = "gray";
        //Получение целевого слайда
        nextSlide = this.slides.shift();
        //Помещение его в начало списка
        this.slides.push(nextSlide);
        //Получение текущего слайда
        nextSlide.style.display = "";
        //Тут будут храниться изначальные относительные значения размеров всех дочерних элементов
        nextSlide.style.marginLeft = "100%";
        let marginLeft = 100;
        let marginRight = 0;
        let SIid = setInterval((function(c){
            nextSlide.style.marginLeft = --marginLeft + "%";
            currentSlide.style.marginLeft = --marginRight + "%";
            if(marginLeft == 0){
                nextSlide.setAttribute("style", "");
                currentSlide.setAttribute("style", "");
                currentSlide.style.display = "none";
                currentSlide.style.zIndex = "0";
                nextSlide.style.zIndex = "2";
                window.slider.flag = true;
                clearInterval(SIid);
            }
        }), 5);
        this.currentSlide = slideNumber - 1;
        this.navigator[this.currentSlide].style.backgroundColor = "black";
    }
}

/*this.slides[this.slides.length-2].setAttribute("style", "");
                this.slides[this.slides.length-2].style.display = "none"; // все элементы после первого скрываются
                this.slides[this.slides.length-2].style.zIndex = "0";*/