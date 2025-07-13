import{_ as d}from"./ValaxyMain.vue_vue_type_style_index_0_lang.DDZBihCH.js";import{e as h,a as g,u as _}from"./chunks/vue-router.5oi-MqCx.js";import{N as v,a3 as l,U as e,S as s,W as a,u as b,O as f,E as y}from"./framework.ZXDN0mPO.js";import"./app.MTKPrG9B.js";import"./chunks/dayjs.Byk5cVHE.js";import"./chunks/@vueuse/motion.BwYW2Ryt.js";import"./chunks/vue-i18n.CE3NdIHS.js";import"./chunks/pinia.CSzZVkqh.js";import"./chunks/nprogress.CEV-6qg_.js";/* empty css                    */import"./YunComment.vue_vue_type_style_index_0_lang.D9VVdOdH.js";import"./index.C5okkQwF.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang.CUe9N4mi.js";import"./post.jei6d4rt.js";const k="/assets/image-2.DoSwPSJQ.png",$=h("/posts/music/03hithat",async p=>JSON.parse('{"title":"03.hithat","description":"","frontmatter":{"layout":"post","title":"03.hithat","date":"2024-09-22 20:16:07","update":"2024-09-22","categories":"music","tags":["music","game"],"top":3,"aplayer":true},"headers":[],"relativePath":"pages/posts/music/03hithat.md","lastUpdated":1752424871000}'),{lazy:(p,t)=>p.name===t.name}),E={__name:"03hithat",setup(p,{expose:t}){const{data:o}=$(),r=_(),u=g(),i=Object.assign(u.meta.frontmatter||{},o.value?.frontmatter||{});return r.currentRoute.value.data=o.value,y("valaxy:frontmatter",i),globalThis.$frontmatter=i,t({frontmatter:{layout:"post",title:"03.hithat",date:"2024-09-22 20:16:07",update:"2024-09-22",categories:"music",tags:["music","game"],top:3,aplayer:!0}}),(n,c)=>{const m=d;return f(),v(m,{frontmatter:b(i)},{"main-content-md":l(()=>c[0]||(c[0]=[s("h3",{id:"鼓点",tabindex:"-1"},[a("鼓点 "),s("a",{class:"header-anchor",href:"#鼓点","aria-label":'Permalink to "鼓点"'},"​")],-1),s("p",null,"我们来看一下如何编写一段包含大鼓，小鼓和踩镲的鼓点。你能学会两点：live_loop指令和采样。",-1),s("p",null,"在空白的编程面板创建一个名为:drums的live_loop指令。你可以随意命名，名字只是为了快速辨别循环了什么内容。live_loop是一个可以跟其他多个live_loop同步的无限循环（一个live_loop至少要有一个sleep指令）：",-1),s("div",{class:"language-"},[s("button",{title:"Copy code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"live_loop :drums do")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_heavy_kick")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"end")])])]),s("button",{class:"collapse"})],-1),s("p",null,"点击run来听听你的第一个live_loop演奏的每一个漂亮的节拍。",-1),s("p",null,"我们在1、3行用大鼓，2、4行用小鼓做一个简单的基调强节奏。不同于演奏音符，你会触发采样。就像输入sample :sample_name一样简单。下面是鼓点的举例。",-1),s("div",{class:"language-"},[s("button",{title:"Copy code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"use_bpm 100")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"live_loop :drums do")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_heavy_kick")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_snare_hard")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_heavy_kick")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_snare_hard")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"end")])])]),s("button",{class:"collapse"})],-1),s("p",null,"这就是个稳定的基调强节奏。鼓点循环从大鼓开始，小鼓在第二拍，第三拍还是大鼓，第四拍小鼓。然后循环又开始了：",-1),s("figure",null,[s("img",{src:k,alt:"alt text",loading:"lazy",decoding:"async"})],-1),s("p",null,"现在试着变一下节奏（use_bpm后的数字）然后用采样演奏一下。在输入采样名称的时候，浏览一下各种自动完成的采样的特性。试试不同的采样然后感受一下他们听起来都什么样。需要留意的是，你想变换声音的时候并不需要点击终止按钮，改写代码再重新点击运行，声音就会在下一个循环自动变换而不会错过任何一个节拍！",-1),s("h3",{id:"加入踩镲",tabindex:"-1"},[a("加入踩镲 "),s("a",{class:"header-anchor",href:"#加入踩镲","aria-label":'Permalink to "加入踩镲"'},"​")],-1),s("p",null,"现在加一个踩镲。创建一个名为hihat的live_loop然后加入你的hi-hat采样。 你可以直接做这样的八分之一或者十六分之一的音符（这个就是十六分之一）",-1),s("div",{class:"language-"},[s("button",{title:"Copy code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"live_loop :hihat do")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_cymbal_closed")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 0.25")]),a(`
`),s("span",{class:"line"},[s("span",null,"end")])])]),s("button",{class:"collapse"})],-1),s("p",null,"但是不用这么死板，也可以做得像这样放一点：",-1),s("div",{class:"language-"},[s("button",{title:"Copy code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"live_loop :hihat do")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_cymbal_closed")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 0.25")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_cymbal_pedal")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"end")])])]),s("button",{class:"collapse"})],-1),s("p",null,"多重节奏模式最开始是一个“错误”。这个循环时长1.25拍 而不是一拍。但是听起来很带感！所以记得多犯点错，也就能发现点没想刻意发现的结果。",-1),s("p",null,"现在歌曲就听起来像这样了",-1),s("div",{class:"language-"},[s("button",{title:"Copy code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"use_bpm 100")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"live_loop :drums do")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_heavy_kick")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_snare_hard")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_heavy_kick")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_snare_hard")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"end")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"live_loop :hihat do")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_cymbal_closed")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 0.25")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sample :drum_cymbal_pedal")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sleep 1")]),a(`
`),s("span",{class:"line"},[s("span",null,"end")])])]),s("button",{class:"collapse"})],-1)])),"main-header":l(()=>[e(n.$slots,"main-header")]),"main-header-after":l(()=>[e(n.$slots,"main-header-after")]),"main-nav":l(()=>[e(n.$slots,"main-nav")]),"main-content-before":l(()=>[e(n.$slots,"main-content-before")]),"main-content":l(()=>[e(n.$slots,"main-content")]),"main-content-after":l(()=>[e(n.$slots,"main-content-after")]),"main-nav-before":l(()=>[e(n.$slots,"main-nav-before")]),"main-nav-after":l(()=>[e(n.$slots,"main-nav-after")]),comment:l(()=>[e(n.$slots,"comment")]),footer:l(()=>[e(n.$slots,"footer")]),aside:l(()=>[e(n.$slots,"aside")]),"aside-custom":l(()=>[e(n.$slots,"aside-custom")]),default:l(()=>[e(n.$slots,"default")]),_:3},8,["frontmatter"])}}};export{E as default,$ as usePageData};
