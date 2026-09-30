document.addEventListener("DOMContentLoaded",()=>{
const records=[
["Rahul Sharma","Java Full Stack","Java Developer","Tech Solutions","₹6.5 LPA","Java"],
["Priya Patil","Software Testing","Software Tester","IT Solutions","₹5.2 LPA","Testing"],
["Aman Verma","MERN Full Stack","Frontend Developer","Digital Works","₹6.8 LPA","MERN"],
["Sneha Joshi","Python Full Stack","Python Developer","Cloud Systems","₹5.7 LPA","Python"],
["Vikram More","Data Science & AI","Data Analyst","Analytics Hub","₹6.2 LPA","Data"],
["Neha Kulkarni","Java Full Stack","Backend Developer","Enterprise Tech","₹7.1 LPA","Java"],
["Kunal Shah","MERN Full Stack","Full Stack Developer","Product Labs","₹6.4 LPA","MERN"],
["Riya Deshmukh","Software Testing","QA Engineer","Quality First","₹5.6 LPA","Testing"],
["Aditya Rao","Python Full Stack","Python Developer","TechWorks","₹5.1 LPA","Python"]
];
const list=document.querySelector("#placementList"), filters=document.querySelector("#placementFilters");let active="All";
function initials(name){return name.split(" ").map(x=>x[0]).join("").slice(0,2)}
function render(){const data=records.filter(r=>active==="All"||r[5]===active);list.innerHTML=data.map(r=>`<article class="placement-card large reveal visible"><div class="avatar">${initials(r[0])}</div><div><h3>${r[0]}</h3><p>${r[1]}</p><span class="company">${r[2]} • ${r[3]}</span></div><div class="salary">${r[4]}</div></article>`).join("")}
filters?.querySelectorAll(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{filters.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));btn.classList.add("active");active=btn.dataset.filter;render()}));render();
});