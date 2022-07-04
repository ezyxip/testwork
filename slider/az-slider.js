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
        //Флаг, останавливающий обработчики событий, пока работает анимация
        this.flag = true;
        this.slides.push(this.slides.shift());
        this.navigator = document.getElementsByClassName("az-point");
        this.currentSlide = 0;
        this.navigator[this.currentSlide].style.backgroundColor = "black";
    }
    
	//Метод, непосредственно вызываемые для перелистывания страницы на одну вперёд.
    // Манипулирует margin элементов
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
        //отрисовка элемента
        nextSlide.style.display = "";
        nextSlide.style.marginLeft = "100%";
        let marginLeft = 100;
        let marginRight = 0;
        //Собственно, анимация
        let SIid = setInterval((function(c){
            nextSlide.style.marginLeft = --marginLeft + "%";
            currentSlide.style.marginLeft = --marginRight + "%";
            if(marginLeft == 0){
                //Конечная обработка стилей элементов
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
     
    //Перелистывание назад
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
     
    //перелистывание на определённый слайд
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

