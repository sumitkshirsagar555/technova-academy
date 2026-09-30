document.addEventListener("DOMContentLoaded",()=>{
const form=document.querySelector("#contactForm");
form?.addEventListener("submit",e=>{
 e.preventDefault();
 const fields=["name","mobile","email","course"]; let ok=true;
 fields.forEach(name=>{
  const f=form.elements[name], err=f.parentElement.querySelector(".field-error");let msg="";
  if(!f.value.trim())msg="This field is required.";
  else if(name==="mobile"&&!/^[6-9]\d{9}$/.test(f.value.trim()))msg="Enter a valid 10-digit mobile number.";
  else if(name==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()))msg="Enter a valid email address.";
  err.textContent=msg;f.classList.toggle("input-error",!!msg);if(msg)ok=false;
 });
 if(ok){document.querySelector("#contactSuccess").classList.add("show");form.reset();window.showTechNovaToast?.("Enquiry validated successfully.");}
});
});