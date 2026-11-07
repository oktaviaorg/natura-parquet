'use strict';
const locale=document.body.dataset.locale||'fr';
const menu=document.querySelector('.menuButton');
if(menu)menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));document.getElementById('mobile-menu').hidden=open;});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu){menu.setAttribute('aria-expanded','false');document.getElementById('mobile-menu').hidden=true;}});
const cards=Array.from(document.querySelectorAll('[data-product]'));
if(cards.length){
  const filters=Array.from(document.querySelectorAll('[data-filter]'));const query=document.getElementById('product-search');const more=document.getElementById('load-more');let limit=24;
  const url=new URL(location.href);filters.forEach(select=>{const name=select.dataset.filter;select.value=url.searchParams.get(name==='grade'?'gamme':name==='finish'?'finition':name)||'';});
  const normalize=value=>value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const refresh=()=>{const matching=cards.filter(card=>filters.every(select=>!select.value||(select.dataset.filter==='pose'&&select.value==='point-hongrie'?card.dataset.pose.startsWith('chevron'):card.dataset[select.dataset.filter]===select.value))&&normalize(card.dataset.search).includes(normalize(query.value)));cards.forEach(card=>card.hidden=true);matching.slice(0,limit).forEach(card=>card.hidden=false);document.getElementById('result-count').textContent=matching.length;document.getElementById('no-results').hidden=matching.length>0;more.hidden=matching.length<=limit;};
  filters.forEach(select=>select.addEventListener('change',()=>{limit=24;refresh();}));query.addEventListener('input',()=>{limit=24;refresh();});more.addEventListener('click',()=>{limit+=24;refresh();});document.getElementById('reset-filters').addEventListener('click',()=>{filters.forEach(select=>select.value='');query.value='';limit=24;history.replaceState(null,'',location.pathname);refresh();});refresh();
}
const area=document.getElementById('estimate-area');if(area)area.addEventListener('input',()=>{const value=Number(area.value);document.getElementById('estimate-total').textContent=Number.isFinite(value)&&value>0?new Intl.NumberFormat(locale,{style:'currency',currency:'EUR'}).format(value*Number(area.dataset.unit)):'—';});
const form=document.getElementById('project-form');
if(form){
  const params=new URLSearchParams(location.search);const company=document.getElementById('company-field');const status=document.getElementById('form-status');
  if(params.get('profil')==='professionnel')form.querySelector('[value="professionnel"]').checked=true;
  const syncProfile=()=>{const pro=form.elements.profile.value==='professionnel';company.hidden=!pro;form.elements.company.required=pro;};
  form.querySelectorAll('[name="profile"]').forEach(input=>input.addEventListener('change',syncProfile));syncProfile();
  form.elements.product.value=(params.get('product')||'').slice(0,600);form.elements.surface.value=params.get('surface')||'';
  form.elements.requestType.value=params.get('type')==='echantillon'?'echantillon':params.get('type')==='info'?'info':'devis-personnalise';
  let sending=false;
  const submissionBody=()=>{
    const data=new FormData(form);
    const value=key=>String(data.get(key)||'').trim();
    const types={'devis-personnalise':'Demande de devis','echantillon':'Demande d’échantillons','info':'Question technique'};
    const lines=['NATURA PARQUET — NOUVELLE DEMANDE','',types[value('requestType')]||'Demande de renseignements','', 'CONTACT',value('name')];
    if(value('profile')==='professionnel'&&value('company'))lines.push(value('company'));
    lines.push(value('profile')==='professionnel'?'Professionnel':'Particulier');
    if(value('phone'))lines.push('Téléphone : '+value('phone'));
    const project=[];
    for(const [key,label,suffix] of [['postalCode','Lieu du chantier',''],['surface','Surface',' m²'],['deadline','Échéance',''],['product','Parquet souhaité','']]){
      if(value(key))project.push(label+' : '+value(key)+suffix);
    }
    if(project.length)lines.push('','PROJET',...project);
    lines.push('','MESSAGE',value('message'),'','Langue du client : '+({fr:'français',de:'allemand',en:'anglais'}[locale]||locale),'Politique de confidentialité : prise de connaissance confirmée.');
    const body=new URLSearchParams({'form-name':'natura-demandes',email:value('email'),demande:lines.join('\n')});
    body.set('bot-field',value('bot-field'));
    return body;
  };
  form.addEventListener('submit',async event=>{event.preventDefault();if(sending)return;status.hidden=false;
    if(location.hostname.endsWith('.chatgpt.site')||['localhost','127.0.0.1'].includes(location.hostname)){status.textContent=status.dataset.local;return;}
    sending=true;const button=form.querySelector('button[type="submit"]');button.disabled=true;const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
    try{const response=await fetch('/formulaire.html',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:submissionBody().toString(),signal:controller.signal});if(!response.ok)throw new Error('Submission rejected');status.textContent=status.dataset.success;form.reset();syncProfile();}catch{status.textContent=status.dataset.error;}finally{clearTimeout(timer);sending=false;button.disabled=false;}
  });
  form.querySelector('button[type="submit"]').disabled=false;
}
