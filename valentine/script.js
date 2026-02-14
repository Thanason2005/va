const giftBox=document.getElementById("giftBox");
const surprise=document.getElementById("surprise");

giftBox.addEventListener("click",()=>{
    giftBox.classList.add("open");

    setTimeout(()=>{
        giftBox.style.display="none";
        surprise.classList.add("show");
        startFireworks();
    },800);
});

/* 🌸 กลีบกุหลาบ */
setInterval(()=>{
    const petal=document.createElement("div");
    petal.className="petal";
    petal.style.left=Math.random()*window.innerWidth+"px";
    petal.style.animationDuration=(5+Math.random()*5)+"s";
    document.querySelector(".petals").appendChild(petal);
    setTimeout(()=>petal.remove(),10000);
},300);

/* 💥 พลุจริง */
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function createFirework(){
    const x=Math.random()*canvas.width;
    const y=Math.random()*canvas.height/2;

    for(let i=0;i<100;i++){
        const angle=Math.random()*2*Math.PI;
        const speed=Math.random()*5+2;
        particles.push({
            x:x,y:y,
            dx:Math.cos(angle)*speed,
            dy:Math.sin(angle)*speed,
            life:100,
            color:`hsl(${Math.random()*360},100%,60%)`
        });
    }
}

function animate(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,i)=>{
        p.x+=p.dx;
        p.y+=p.dy;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x,p.y,3,0,Math.PI*2);
        ctx.fillStyle=p.color;
        ctx.fill();

        if(p.life<=0) particles.splice(i,1);
    });

    requestAnimationFrame(animate);
}

function startFireworks(){
    setInterval(createFirework,800);
    animate();
}
