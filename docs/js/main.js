const l=document.querySelector(".js_coctails"),a=document.querySelector(".js_search"),k=document.querySelector(".js-btn-search"),_="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=",L=document.querySelector(".js_reset"),d=document.querySelector(".js_coctails_favorite"),o=document.querySelector(".js_reset_favorites");document.querySelector(".js_log");let c=[],n=[];function m(){l.innerHTML="",a.value===""?(alert("Introduce un coctail para empezar a buscar :)"),u("margarita")):u(a.value)}k.addEventListener("click",m);a.addEventListener("keydown",function(e){e.key==="Enter"&&m()});function b(){a.value="",l.innerHTML=""}L.addEventListener("click",b);function S(){d.innerHTML="",n=[],localStorage.removeItem("coctailsFavorite"),o.classList.add("hidden"),document.querySelectorAll(".blue").forEach(t=>{t.classList.remove("blue")})}o.addEventListener("click",S);const u=e=>{fetch(_+e).then(t=>t.json()).then(t=>{c=t.drinks,c===null?alert("No se han encontrado resultados ):"):v(),console.log(t)})},p=(e,t,s)=>{let i=e.strDrinkThumb;i===null&&(i="https://media.glamour.mx/photos/632371dd8645b8d42bd2a706/master/pass/cocteles-para-el-15-de-septiembre.jpg");var r="";return s?r+=`<li class="card blue"><button class="js_remove_fav" id="${e.idDrink}">❌</button>`:t?r+=`<li class="card js_coctails_li blue" id="${e.idDrink}">`:r+=`<li class="card js_coctails_li" id="${e.idDrink}">`,r+=`<h6>${e.strDrink}</h6>
    <p class="card_ingredients">${e.strIngredient1}, ${e.strIngredient2}, ${e.strIngredient3}</p>
    <img src="${i}"/>
    </li>`,r},v=()=>{l.innerHTML="";for(var e of c){const s=n.some(i=>i.idDrink==e.idDrink);console.log(s),l.innerHTML+=p(e,s,!1)}const t=document.querySelectorAll(".js_coctails_li");for(let s=0;s<t.length;s++)t[s].addEventListener("click",h)},h=e=>{const t=e.currentTarget.id;console.log(`El Id a tratar es: ${t}`);const s=c.find(r=>r.idDrink===t),i=n.findIndex(r=>r.idDrink===t);i===-1?n.push(s):n.splice(i,1),console.log(n),f(),v(),g(),localStorage.setItem("coctailsFavorite",JSON.stringify(n))},D=e=>`<li class="card fav_coctail">
        <button class="btn_remove js_remove_fav" id="${e.idDrink}">❌</button>
        <h6>${e.strDrink}</h6>
        <p class="card_ingredients">${e.strIngredient1}, ${e.strIngredient2}, ${e.strIngredient3}</p>
        <img src="${e.strDrinkThumb}"/>
    </li>`;function f(){d.innerHTML="";for(const t of n)d.innerHTML+=D(t);const e=document.querySelectorAll(".js_remove_fav");for(let t=0;t<e.length;t++)e[t].addEventListener("click",j)}const j=e=>{const t=e.currentTarget.id,s=c.find(r=>r.idDrink===t),i=n.findIndex(r=>r.idDrink===t);i===-1?n.push(s):n.splice(i,1),f(),v(),n.length===0&&o.classList.add("hidden"),localStorage.setItem("coctailsFavorite",JSON.stringify(n))};function F(){const e=localStorage.getItem("coctailsFavorite");e!==null&&(n=JSON.parse(e),f())}function g(){n.length===0?o.classList.add("hidden"):o.classList.remove("hidden")}F();g();u("margarita");
//# sourceMappingURL=main.js.map
