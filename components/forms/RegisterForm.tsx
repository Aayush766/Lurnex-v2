"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, GraduationCap, Grid2X2, LoaderCircle, Mail, Phone, UserRound, X } from "lucide-react";
import { ApiError, learningApi } from "@/lib/api";
import { courseOptions, gradeOptions } from "@/lib/programs";
import { registrationCountries } from "@/lib/registration-data";
import { leadSourceFor } from "@/lib/lead-source";
import "./RegistrationFlow.css";

type FormData = { course:string; grade:string; name:string; email:string; mobile:string; school:string; country:string; parentName:string; parentEmail:string; parentMobile:string };
const empty:FormData={course:"",grade:"",name:"",email:"",mobile:"",school:"",country:"India",parentName:"",parentEmail:"",parentMobile:""};
const side=[{icon:BookOpen,title:"Start Your Journey",text:"Select your curriculum."},{icon:Grid2X2,title:"Choose Your Grade",text:"Find the right learning path."},{icon:UserRound,title:"Your Details",text:"Add learner, school and guardian details."}];
const validE164=(value:string)=>/^\+[1-9]\d{7,14}$/.test(value);

export function RegisterForm({initialProgram,initialRedirect,onClose}:{initialProgram?:string;initialRedirect?:string;onClose?:()=>void}) {
  const router=useRouter();
  const [step,setStep]=useState(1);
  const [form,setForm]=useState<FormData>(()=>({...empty,course:initialProgram?courseOptions.find(x=>x.toLowerCase()===initialProgram.toLowerCase())||courseOptions.find(x=>x.toLowerCase().startsWith(initialProgram.toLowerCase()))||"":""}));
  const [dial,setDial]=useState("+91");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const submitting=useRef(false);
  const grades=useMemo(()=>gradeOptions[form.course]||gradeOptions.Default,[form.course]);
  const panel=side[step-1]||side[0];
  const Icon=panel.icon;
  const set=(key:keyof FormData,value:string)=>setForm(current=>({...current,[key]:value}));
  const back=()=>{setError("");setStep(current=>Math.max(1,current-1));};
  const register=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault(); if(submitting.current)return; submitting.current=true; setBusy(true); setError("");
    const mobile=`${dial}${form.mobile.replace(/\D/g,"")}`;
    const parentMobile=form.parentMobile?`${dial}${form.parentMobile.replace(/\D/g,"")}`:"";
    if(!validE164(mobile)){setError("Enter a valid mobile number, including the country code.");setBusy(false);submitting.current=false;return;}
    if(parentMobile&&!validE164(parentMobile)){setError("Enter a valid guardian mobile number or leave it blank.");setBusy(false);submitting.current=false;return;}
    try {
      const result=await learningApi.registerStudent({accountRegistration:true,name:form.name.trim(),email:form.email.trim(),password,mobile,course:form.course,curriculum:form.course,grade:form.grade,school:form.school.trim(),country:form.country,parentName:form.parentName.trim(),parentEmail:form.parentEmail.trim(),parentMobile,leadSource:leadSourceFor("Course registration"),leadIntent:initialProgram?`Registration for ${initialProgram}`:"General registration",registrationUrl:window.location.href,sourcePage:window.location.pathname,referrerUrl:document.referrer||null});
      if(!result.token||!result.user)throw new Error("Registration did not return an active learner session. Please try again.");
      localStorage.setItem("lumex_token",result.token);localStorage.setItem("lumex_user",JSON.stringify(result.user));window.dispatchEvent(new Event("lumex-auth-changed"));const target=initialRedirect?.startsWith("/")&&!initialRedirect.startsWith("//")?initialRedirect:"/dashboard";router.replace(target);return;
    } catch(reason) {
      if(reason instanceof ApiError && (reason.status===429 || reason.message.toLowerCase().includes("too many signup attempts"))) setError("Signup is temporarily rate limited. Please wait before trying again. If you already submitted your details, try logging in.");
      else setError(reason instanceof Error?reason.message:"Registration failed.");
    }
    finally { setBusy(false); submitting.current=false; }
  };
  return <div className="registration-overlay"><section className="registration-dialog" aria-label="Student registration"><aside className="registration-aside"><div className="registration-blobs" aria-hidden="true"><span/><span/><span/></div><Link href="/" className="registration-brand">lurnex<span>.</span></Link><div className="registration-aside-copy" key={step}><span className="registration-aside-icon"><Icon size={30}/></span><h2>{panel.title}</h2><p>{panel.text}</p></div><span className="registration-copyright">© {new Date().getFullYear()} lurnex</span></aside><div className="registration-main"><button type="button" className="registration-close" aria-label="Close registration" onClick={onClose??(()=>router.push("/"))}><X size={22}/></button>{step>1&&<button className="registration-back" type="button" onClick={back}><ArrowLeft size={16}/> Back</button>}<div className="registration-progress"><span>Step {step} of 3</span><div className="registration-progress-track"><span style={{width:`${((step-1)/2)*100}%`}}/></div></div><div className="registration-stage" key={step}>
    {step===1&&<><header className="registration-heading"><span className="registration-eyebrow">PERSONALISED LEARNING</span><h1>Choose your curriculum</h1><p>Select the programme you currently study.</p></header><div className="registration-course-grid">{courseOptions.map(course=><button key={course} type="button" className="registration-choice" onClick={()=>{set("course",course);set("grade","");setStep(2);}}><span>{course}</span><ArrowRight size={17}/></button>)}</div></>}
    {step===2&&<><header className="registration-heading"><span className="registration-eyebrow">YOUR LEARNING PATH</span><h1>What grade are you in?</h1><p>Choose your current academic level.</p></header><div className="registration-grade-grid">{grades.map(grade=><button key={grade} type="button" className="registration-choice" onClick={()=>{set("grade",grade);setStep(3);}}><span>{grade}</span><ArrowRight size={17}/></button>)}</div></>}
    {step===3&&<><header className="registration-heading registration-step3-heading"><span className="registration-eyebrow">STEP 3 · CREATE YOUR ACCOUNT</span><h1>Your learning profile</h1><p>Share your details so we can set up your personalised learning account.</p></header><form className="registration-step3-form" onSubmit={register}><section className="registration-form-card"><h2><span><UserRound size={17}/></span> Student details</h2><div className="registration-step3-fields"><label className="registration-input-row"><UserRound size={18}/><input autoComplete="name" placeholder="Student full name" value={form.name} onChange={e=>set("name",e.target.value)} required/></label><label className="registration-input-row"><Mail size={18}/><input type="email" autoComplete="email" placeholder="Email address" value={form.email} onChange={e=>set("email",e.target.value)} required/></label><label className="registration-input-row"><UserRound size={18}/><input type="password" autoComplete="new-password" minLength={8} placeholder="Create password (8+ characters)" value={password} onChange={e=>setPassword(e.target.value)} required/></label><div className="registration-phone-row"><Phone size={18}/><label className="registration-country-select"><span className="sr-only">Country dialing code</span><select value={dial} onChange={e=>{setDial(e.target.value);set("country",registrationCountries.find(c=>c.dialCode===e.target.value)?.name||"Other");}}>{registrationCountries.map(c=><option key={`${c.name}-${c.dialCode}`} value={c.dialCode}>{c.dialCode} · {c.name}</option>)}</select><ChevronDown size={14}/></label><input type="tel" autoComplete="tel-national" placeholder="Student mobile number" value={form.mobile} onChange={e=>set("mobile",e.target.value)} required/></div><label className="registration-input-row"><GraduationCap size={18}/><input type="text" autoComplete="organization" placeholder="School name" value={form.school} onChange={e=>set("school",e.target.value)} required/></label></div></section><section className="registration-form-card"><h2><span><GraduationCap size={17}/></span> Parent / guardian</h2><p className="registration-form-card-hint">Add a family contact for learner updates.</p><div className="registration-step3-fields"><label className="registration-input-row"><UserRound size={18}/><input autoComplete="name" placeholder="Full name" value={form.parentName} onChange={e=>set("parentName",e.target.value)} required/></label><label className="registration-input-row"><Mail size={18}/><input type="email" autoComplete="email" placeholder="Email address" value={form.parentEmail} onChange={e=>set("parentEmail",e.target.value)} required/></label><label className="registration-input-row"><Phone size={18}/><input type="tel" autoComplete="tel" placeholder="Mobile number (optional)" value={form.parentMobile} onChange={e=>set("parentMobile",e.target.value)}/></label></div></section>{error&&<p className="registration-error" role="alert">{error}</p>}<button type="submit" disabled={busy} className="registration-primary-button registration-step3-submit">{busy?<><LoaderCircle className="registration-spin" size={18}/> Creating account…</>:<>Create learner account <ArrowRight size={18}/></>}</button></form></>}    </div><p className="registration-secure-note"><span><Check size={13}/></span> Your information is kept private and secure.</p></div></section></div>;
}
