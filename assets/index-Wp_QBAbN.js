(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const i=e=>document.querySelector(e),p=async()=>{try{if(!navigator.geolocation)throw new Error("Geolocation is not supported by this browser.");const e=await new Promise((s,t)=>{navigator.geolocation.getCurrentPosition(s,t)}),{latitude:o,longitude:n}=e.coords;return console.log(`Latitude: ${o}, Longitude: ${n}`),e.coords}catch(e){console.error(`Error getting location: ${e.message}`)}},m=()=>{i("#app").innerHTML=`
    <main class="wrapper">
      <h2>LOCAL TAPAS</h2>
      <p>Make a list of Tapas restaurant you would like to eat</p>
      <p>Once you are done check it off!</p>
      <ul class="plates">
        <li>Loading Tapas...</li>
      </ul>
      <form id="add-items">
        <input type="text" name="item" placeholder="Item Name" required>
        <input type="submit" value="+ Add Item">
      </form>
    </main>
    `},f=(e,o)=>{localStorage.setItem(e,JSON.stringify(o))},g=e=>{try{return JSON.parse(localStorage.getItem(e))}catch(o){return console.error(o),null}},y=()=>g("list"),d=e=>f("list",e),{latitude:h,longitude:L}=p(),a=y()||[],u=document.createElement("div");u.innerHTML=`
<a target="_blank" href="https://www.google.com/maps/search/tapas/@${h},${L},11z/data=!3m1!4b1?entry=ttu"id="localTapas">Check out Tapas around you</a>
`;i(".wrapper").append(u);const b=e=>{e.preventDefault();const s={text:Object.fromEntries(new FormData(e.target)).item,done:!1};a.push(s),l(a,i(".plates")),d(a),e.target.reset()},l=(e=[],o)=>{o.innerHTML=e.map((n,s)=>`
      <li>
        <input type="checkbox" data-index=${s} id="item${s}" ${n.done?"checked":""} />
        <label for="item${s}">${n.text}</label>
      </li>
    `).join("")},w=e=>{if(!e.target.matches("input"))return;const n=e.target.dataset.index;a[n].done=!a[n].done,d(a),l(a,i(".plates"))},O=()=>{m(),l(a,i(".plates")),i("#add-items").addEventListener("submit",b),i(".plates").addEventListener("click",w)};O();
