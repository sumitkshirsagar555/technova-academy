document.addEventListener("DOMContentLoaded",()=>{
const courses=[
{key:"java",cat:"Full Stack",icon:"☕",title:"Java Full Stack Development",desc:"Build production-style web applications with a strong Java backend and modern development practices.",duration:"6 Months",mode:"Classroom / Online",tech:["Java","Spring Boot","Hibernate","MySQL","REST API"]},
{key:"python",cat:"Full Stack",icon:"🐍",title:"Python Full Stack Development",desc:"Learn Python application development, APIs, databases and modern frontend fundamentals.",duration:"6 Months",mode:"Classroom / Online",tech:["Python","Django","SQL","REST API","HTML/CSS"]},
{key:"mern",cat:"Full Stack",icon:"⚛",title:"MERN Full Stack Development",desc:"Create modern web applications using JavaScript across the frontend, backend and database.",duration:"6 Months",mode:"Classroom / Online",tech:["MongoDB","Express","React","Node.js","REST API"]},
{key:"testing",cat:"Testing",icon:"✓",title:"Software Testing",desc:"Develop manual and automation testing skills with practical QA workflows and interview preparation.",duration:"4 Months",mode:"Classroom / Online",tech:["Manual QA","Selenium","TestNG","Postman","Jira"]},
{key:"data",cat:"Data",icon:"◫",title:"Data Science & AI",desc:"Learn data preparation, statistics, machine learning concepts and applied AI project workflows.",duration:"6 Months",mode:"Classroom / Online",tech:["Python","Pandas","NumPy","ML","Visualization"]},
{key:"analytics",cat:"Data",icon:"◒",title:"Data Analytics",desc:"Turn business data into useful dashboards and insights with practical analytics tools.",duration:"4 Months",mode:"Classroom / Online",tech:["Excel","SQL","Power BI","Python","Dashboards"]},
{key:"cloud",cat:"Cloud",icon:"☁",title:"Cloud & DevOps",desc:"Understand cloud foundations, Linux, containers, CI/CD and modern deployment workflows.",duration:"5 Months",mode:"Classroom / Online",tech:["AWS","Linux","Docker","Git","CI/CD"]},
{key:"cyber",cat:"Cybersecurity",icon:"⌁",title:"Cybersecurity",desc:"Build foundational security knowledge across networks, web security, monitoring and ethical practices.",duration:"5 Months",mode:"Classroom / Online",tech:["Networking","Web Security","Linux","SOC","Security Basics"]}
];
const list=document.querySelector("#courseList"), search=document.querySelector("#courseSearch"), filters=document.querySelector("#courseFilters"), empty=document.querySelector("#courseEmpty"); let active="All";
function render(){
 const q=(search?.value||"").trim().toLowerCase();
 const data=courses.filter(c=>(active==="All"||c.cat===active)&&(`${c.title} ${c.desc} ${c.tech.join(" ")}`.toLowerCase().includes(q)));
 list.innerHTML=data.map(c=>`<article class="course-card reveal visible" id="${c.key}"><div class="course-icon">${c.icon}</div><span class="category">${c.cat}</span><h3>${c.title}</h3><p>${c.desc}</p><div class="course-meta"><span>◷ ${c.duration}</span><span>◉ ${c.mode}</span></div><div class="tech-tags">${c.tech.map(t=>`<span>${t}</span>`).join("")}</div><div class="course-bottom"><a href="index.html#demo">View Course →</a></div></article>`).join("");
 empty.style.display=data.length?"none":"block";
}
filters?.querySelectorAll(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{filters.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));btn.classList.add("active");active=btn.dataset.filter;render()}));
search?.addEventListener("input",render);render();
});