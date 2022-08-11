$(function(){

    loadTl = gsap.timeline()
    
    loadTl.to($('body'),{overflow:'hidden'})
    .to($('.loading .one'),.7,{opacity:1})
    .to($('.loading .one'),.7,{opacity:0})
    .to($('.loading .two'),.7,{opacity:1})
    .to($('.loading .two'),.7,{opacity:0})
    .to($('.loading .three'),.7,{opacity:1})
    .to($('.loading .three'),.5,{'letter-spacing':'2vw'})
    .to($('.loading .three'),.7,{opacity:0})
    .to($('.loading'),.7,{opacity:0})
    .to($('body'),{overflow:'auto'})
    .to($('.sc-main .title:first-child .over'),{rotate:0,y:0,x:0},'-=1')
    .to($('.sc-main .title:nth-child(2) .over'),{rotate:0,y:0,x:0},'-=.5')
    .to($('.sc-main .title:nth-child(3) .over'),{rotate:0,y:0,x:0})


   

    smileIcon = gsap.utils.toArray('.ic-smile');
    smileIcon.forEach((smileIcon) => {
        gsap.to(smileIcon, 1.2, {
            yPercent: -100,
            opacity: 0,
            scrollTrigger : {
                trigger: smileIcon,
                start: 'bottom bottom',
                toggleActions: "play play reverse reverse",
                // markers: true
            }
        })
    })
  




    intoTl = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc-main',
            start:"0% 0%",
            end:"+=200%",
            // markers: true,
            pin: true,
            scrub:1,
        }
    })
  

    intoTl.addLabel('m1')
    .to('.sc-main .left',{xPercent: 23},'m1')
    .to('.sc-main .right',{xPercent: -23},'m1')

    limitTl = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc-ambition',
            start:"-20% 0%",
            end:"+=200%",
            // markers: true,
            // pin: true,
            scrub:1,
        }
    })
  

    limitTl.addLabel('m1')
    .to('.sc-ambition .left',{xPercent: 23},'m1')
    .to('.sc-ambition .right',{xPercent: -23},'m1')

   

    $('.sc-me .magic-area a').hover(
        function(){
            $('.sc-me .sub-text').addClass('active');
        },function(){
            $('.sc-me .sub-text').removeClass('active');
        }
    );

    var circle = document.querySelector(".cursor");

    $(document).mousemove(function(e){
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        circle.style.left = mouseX + 'px';
        circle.style.top = mouseY + 'px';

        
        if (e.target.closest('a, button')) {
            $('.cursor').removeClass('hide');
            gsap.to('.cursor',{scale:2})
        } else {
            $('.cursor').addClass('hide');
            gsap.to('.cursor',{scale:1})
        }
    });

    $(document).scroll(function(){
        var scTop = $(document).scrollTop();
        if(scTop > 0){
            $('header').addClass('color');
        }

    })

    $('.btn-menu').click(function(){
        $('.open').slideToggle();
        $('.close').slideToggle();
        $('.menu-area').toggleClass('active');
        $('header').removeClass('color');

        if($('.menu-area').hasClass('active')) {
            $('body').css('overflow','hidden');
        } else {
            $('body').css('overflow','auto');
        }
    });

    fetch('./asset/data/product.json')
    .then((response) => response.json())
    .then((json) => {
        x = json.imageItems;
        
        html='';
        linehtml='';
        
  
        x.forEach(a => {
  
            pageSize = '';
            if(a.pageSize != null) {
            pageSize = `<a href="${a.href}" target="_blank"  onclick="${a.pageSize}"></a>`;
            } 

            
  
            html += `<li class="pro-item">
            <div class="probtn-wrap">
                <a href="${a.href}" target="_blank"  onclick="${a.pageSize}">
                    <div class="ig-wrap">
                        <img src="${a.thmbnail}" alt="${a.projectName}">
                        <div class="text-box">
                            <p class="detail-title">TYPE</p>
                            <span class="type">${a.type}</span>
                        </div>
                        <div class="code-area">
                            <p class="txt">${a.desc}</p>
                        </div>
                    </div>
                </a>
                <div class="right-wrap">
                    <a href="${a.href}" target="_blank" onclick="${a.pageSize}">
                        <div class="pro-name">
                            <i class="ic-line"></i>
                            <div class="name-wrap">
                                <div class="pro-title">${a.projectName}</div>
                                <div class="point">
                                    <span class="sub-tit">${a.point}</span>
                                    <div class="cover"></div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="${a.href}" target="_blank" onclick="${a.pageSize}" class="link-site">Click Site</a>
                    <a href="${a.codehref}" target="_blank" class="link-review">Code Review</a>
                </div>
            </div>
        </li>`;
        
        });
  
        $('.pro-list').append(html); 

        $('.pro-item:last-child .pro-name').append(`<i class="ic-line"></i>`); 

         


        $('.sc-project .pro-item .pro-name').mousemove(
            function(e){
                var moveW = $(this).width() / 100;
                var moveH = $(this).height() / 100;
    
                var igW = e.offsetX * moveW * 0.005;
                var igH = e.offsetY * moveH * 0.3; 
                
                gsap.config({ nullTargetWarn: false });
    
                gsap.to($('.sc-project .pro-item').find('.ig-wrap'), {
                    xPercent: igW,
                    yPercent: igH,
                    ease: Power1.easeOut,
                });
            }
        );
    
        $('.sc-project .pro-item .pro-name').hover(
            function(e){
                var num = $(this).parent().parent().parent().index() + 1;
                // console.log(num);
                gsap.config({ nullTargetWarn: false });
                gsap.to($(this).parent().parent().find('.ig-wrap'), {
                    yPercent: -5 * num,
                });
            }   
        );
    
        $('.sc-project .pro-item').hover(
            function(){
                gsap.config({ nullTargetWarn: false });
                gsap.to($(this).find('.cover'), {
                    xPercent: 100,
                    ease: "ease-in-out"
                });
            },function(){
                gsap.config({ nullTargetWarn: false });
                gsap.to($(this).find('.cover'), {
                    xPercent: 0,
                    ease: "ease-in-out"
                });
            }
        );

        line = gsap.utils.toArray('.ic-line');
        line.forEach((line, i) => {
            gsap.fromTo(line,{
                width: '0'
            } ,{
                width: '100%', 
                duration: .5,
                delay: .3,
                scrollTrigger: {
                    trigger: line,
                    start: 'top bottom',
                    // maekers: true,
                }
            })
        })


        
    })

   

})