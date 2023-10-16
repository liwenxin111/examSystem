let MyCard = {
    props:["active","index","items"],
    template: `
        <div class="card blastoise" @mouseout="hideflip(index)"  @mouseover="showflip(index)">
                <span :class={innerCardBackface:true}> <!-- back of the card -->
                    <span class="image">
                            <div class="quesition">{{items[index].quesition}} </div>
                            <span class="unflip" >Unflip</span>
                    </span>
                </span>
                <span :class={innerCard:true,active:active} > <!-- front of the card -->
                             
                            <div class="sno" v-show="!items[index].isMouseHover">{{items[index].text}}</div>
                            <span class="flip"  v-show="items[index].isMouseHover">Flip</span>
                </span>
            </div>
        `,
    data() {
        return {
            title: "我是标题",
          }  
    },
    // temp <span class="unflip"  v-show="items[index].isMouseHover">Unflip</span>
    // temp   
    // <span class="glare"></span>
    methods: {
        run(){
            let calculateAngle = function (e, item, parent) {
                let dropShadowColor = `rgba(0, 0, 0, 0.3)`
                if (parent.getAttribute('data-filter-color') !== null) {
                    dropShadowColor = parent.getAttribute('data-filter-color');
                }
    
                parent.classList.add('animated');
                // 获取用户鼠标相对于按钮本身的x位置
                let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
                // 获取相对于按钮的y位置
                let y = Math.abs(item.getBoundingClientRect().y - e.clientY);
    
                // 计算宽度和高度的一半
                let halfWidth = item.getBoundingClientRect().width / 2;
                let halfHeight = item.getBoundingClientRect().height / 2;
                //创建一个角度。我已经分别除以6和4，所以效果看起来很好。
                //改变这些数字将改变效果的深度。
                let calcAngleX = (x - halfWidth) / 6;
                let calcAngleY = (y - halfHeight) / 14;
    
                let gX = (1 - (x / (halfWidth * 2))) * 100;
                let gY = (1 - (y / (halfHeight * 2))) * 100;
    
        //         item.querySelector('.glare').style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgb(199 198 243),
        // transparent)`;
                // 并设置其容器的视角。
                parent.style.perspective = `${halfWidth * 6}px`
                item.style.perspective = `${halfWidth * 6}px`
    
                // 设置项目转换CSS属性
                item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
                parent.querySelector('.innerCardBackface').style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg)
        scale(1.04) translateZ(-4px)`;
    
                if (parent.getAttribute('data-custom-perspective') !== null) {
                    parent.style.perspective = `${parent.getAttribute('data-custom-perspective')}`
                }
    
                // 重新应用到阴影上，使用不同的分割线
                let calcShadowX = (x - halfWidth) / 3;
                let calcShadowY = (y - halfHeight) / 6;
    
                // 添加一个滤镜阴影——这比普通的框阴影更能表现动画效果。
                item.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`;
            }
    
            document.querySelectorAll('.card').forEach(function (item) {
                if (item.querySelector('.flip') !== null) {
                    item.querySelector('.flip').addEventListener('click', function () {
                        item.classList.add('flipped');
                    });
                }
                if (item.querySelector('.unflip') !== null) {
                    item.querySelector('.unflip').addEventListener('click', function () {
                        item.classList.remove('flipped');
                    });
                }
                item.addEventListener('mouseenter', function (e) {
                    calculateAngle(e, this.querySelector('.innerCard'), this);
                });
    
                item.addEventListener('mousemove', function (e) {
                    calculateAngle(e, this.querySelector('.innerCard'), this);
                });
    
                item.addEventListener('mouseleave', function (e) {
                    let dropShadowColor = `rgba(0, 0, 0, 0.3)`
                    if (item.getAttribute('data-filter-color') !== null) {
                        dropShadowColor = item.getAttribute('data-filter-color')
                    }
                    item.classList.remove('animated');
                    item.querySelector('.innerCard').style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
                    item.querySelector('.innerCardBackface').style.transform = `rotateY(0deg) rotateX(0deg) scale(1.01)
        translateZ(-4px)`;
                    item.querySelector('.innerCard').style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
                });
            })
        },
        showflip(index) {
            // console.log("我在呢");
            this.$props.items[index].isMouseHover = true;
        },
        hideflip(index) {
            // console.log("我出了哈");
            this.$props.items[index].isMouseHover = false;
        },
    },
    mounted() {
        this.run();
    }
};

new Vue({
    el: "#app",
    components: {
        'MyCard': MyCard
    },
    data: {
        buttonText: "开始抽人",
        tureCard: "一键翻牌",
        deleteText: "删除被抽的人",
        quesitions: [
            "1. 输出n个星号,每行输出linen个",
            "2. 求n个数的和",
            "3. 随机产生n个数",
            "4. 求n个数的最大值、最小值:",
            "5. 确保输入一个整型数",
            "6. 确保输入符合一定正则表达式的字符串",
            "7. 确保输入一定范围整型数的方法",
            "8. 字母转换器方法",
            "9. 定义方法输出m~n之间所有素数",
            "10. 电费计算器。年用电量0-2160度;以下0.60元年用电量2161度 - 4200度部分; 0.65元;年用电量超过4200度部分; 0.90元",
        ],
               items: [
           { text: "21", isActive: false ,quesition:"",isMouseHover:false},
           { text: "22", isActive: false ,quesition:"",isMouseHover:false},
           { text: "23", isActive: false ,quesition:"",isMouseHover:false},
           { text: "24", isActive: false ,quesition:"",isMouseHover:false},
           { text: "25", isActive: false ,quesition:"",isMouseHover:false},
           { text: "26", isActive: false ,quesition:"",isMouseHover:false},
           { text: "27", isActive: false ,quesition:"",isMouseHover:false},
           { text: "28", isActive: false ,quesition:"",isMouseHover:false},
           { text: "29", isActive: false ,quesition:"",isMouseHover:false},
           { text: "30", isActive: false ,quesition:"",isMouseHover:false},
           { text: "31", isActive: false ,quesition:"",isMouseHover:false},
           { text: "32", isActive: false ,quesition:"",isMouseHover:false},
           { text: "33", isActive: false ,quesition:"",isMouseHover:false},
           { text: "34", isActive: false ,quesition:"",isMouseHover:false},
           { text: "35", isActive: false ,quesition:"",isMouseHover:false},
           { text: "36", isActive: false ,quesition:"",isMouseHover:false},
           { text: "37", isActive: false ,quesition:"",isMouseHover:false},
           { text: "38", isActive: false ,quesition:"",isMouseHover:false},
           { text: "39", isActive: false ,quesition:"",isMouseHover:false},
           { text: "40", isActive: false ,quesition:"",isMouseHover:false},
           { text: "41", isActive: false ,quesition:"",isMouseHover:false},
           { text: "42", isActive: false ,quesition:"",isMouseHover:false},
           { text: "43", isActive: false ,quesition:"",isMouseHover:false},
           { text: "44", isActive: false ,quesition:"",isMouseHover:false},
            { text: "45", isActive: false, quesition: "", isMouseHover: false },

            { text: "46", isActive: false ,quesition:"",isMouseHover:false},
            { text: "47", isActive: false ,quesition:"",isMouseHover:false},
            { text: "48", isActive: false ,quesition:"",isMouseHover:false},
            { text: "49", isActive: false ,quesition:"",isMouseHover:false},
            { text: "50", isActive: false ,quesition:"",isMouseHover:false},

           { text: "51", isActive: false ,quesition:"",isMouseHover:false},
           { text: "52", isActive: false ,quesition:"",isMouseHover:false},
           { text: "53", isActive: false ,quesition:"",isMouseHover:false},
           { text: "54", isActive: false ,quesition:"",isMouseHover:false},
           { text: "55", isActive: false ,quesition:"",isMouseHover:false},
           { text: "56", isActive: false ,quesition:"",isMouseHover:false},
           { text: "57", isActive: false ,quesition:"",isMouseHover:false},
           { text: "58", isActive: false ,quesition:"",isMouseHover:false},
            { text: "59", isActive: false, quesition: "", isMouseHover: false },
           
            { text: "60", isActive: false ,quesition:"",isMouseHover:false},
            { text: "61", isActive: false ,quesition:"",isMouseHover:false},
            { text: "62", isActive: false ,quesition:"",isMouseHover:false},
            { text: "63", isActive: false ,quesition:"",isMouseHover:false},
            { text: "64", isActive: false ,quesition:"",isMouseHover:false},
            { text: "65", isActive: false ,quesition:"",isMouseHover:false},
        ],
        running: false,
        currentIndex: -1,
        selectPeople: [],
        isDelete: false,
        countdownInterval: "",
        countdownTime:15 * 60 ,
        
    },
    methods: {
        quesitionInit() {
            for (let i = 0; i < this.items.length; i++) {
                this.items.map((item) => {
                    item.quesition = "题目未知等待公布";
                    return item;
                })
            }
        },
        randomquesition(newVue) {
            // console.log("parseInt(Math.random() * this.quesitions.length");
            // console.log(newVue);
            // console.log(newVue.quesitions);
            let index = parseInt(Math.random() * newVue.quesitions.length);
            // console.log("index--"+index);
            let  quesition = newVue.quesitions[index];
            // console.log("quesition");
          return quesition;
        },
        btnStart() {
            let isRuning = true
            this.currentIndex = 14;
            let newVue = this;        
            function snackInit(newVue) {
                for (let i = 0; i < 15; i++){
                    // console.log(newVue.items);
                     // 进行初始化
                    let temp = newVue.items[i];
                    temp.isActive = true;
                }
            };
            snackInit(newVue);
            if (this.items.length <= 15) {
                this.items = this.items.map((item) => {
                    console.log("map -- item");
                    console.log(item);
                    if (item.isActive == true) {
                        item.quesition = this.randomquesition(newVue);
                    }
                    return item;
                })
            } else {
                const intervalId = setInterval(() => {
                    if (!isRuning) {
                        return clearInterval(intervalId)
                    };
                    this.currentIndex++; 
                    this.items[this.currentIndex % this.items.length].isActive = true;
                    this.items[(this.currentIndex - 15) % this.items.length].isActive = false;
                }, 200)
                
                setTimeout(() => {
                    isRuning = false;
                    this.isDelete = true;
                    // console.log("收集被选中的数据");

                    this.items = this.items.map((item) => {
                        // console.log("map -- item");
                        // console.log(item);
                        if (item.isActive == true) {
                            item.quesition = this.randomquesition(newVue);
                        }
                        return item;
                    })
                }, parseInt(Math.random()*900)+4500);
            }

        },
        deleteBtn() {
            let tempArr = this.items;
            this.items = this.items.filter((item) => {
                return !item.isActive == true;
            });

            this.selectPeople = tempArr.filter(item => !this.items.includes(item));
            console.log(this.selectPeople);

            this.isDelete = false;
        },
        tureCardBtn() {
            // 获取所有具有 class="active" 的子元素
            const activeElements = document.querySelectorAll(".active");
            // 遍历所有子元素
            activeElements.forEach(childElement => {
            // 获取父元素
            const parentElement = childElement.parentNode;
            // 切换父元素的类名
            if (parentElement.classList.contains("flipped")) {
                parentElement.classList.remove("flipped");
            } else {
                parentElement.classList.add("flipped");
            }
            });
        },
        countDown() {  
            let newVue = this;
            function formatTime(time) {
                var minutes = Math.floor(time / 60);
                var seconds = time % 60;
                return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
            }

            function countDown() {
                if (newVue.countdownInterval) {
                    newVue.countdownTime = 15 * 60;
                }
                clearInterval(newVue.countdownInterval); // 清除之前的定时器
                var countdown = document.getElementById('countdown');
                countdown.innerHTML = formatTime(newVue.countdownTime); // 初始化显示倒计时
                newVue.countdownInterval = setInterval(function() {
                  if (newVue.countdownTime <= 0) {
                    clearInterval(newVue.countdownInterval);
                    countdown.innerHTML = "倒计时结束！";
                    return;
                  }
                  newVue.countdownTime--;
                  countdown.innerHTML = formatTime(newVue.countdownTime); // 更新显示倒计时
                }, 1000);
            }

            countDown();
        },
        startCountDown() {
            // 开始计数
            this.countDown();
        }
    },
    mounted() {
        this.quesitionInit();
      }
});
