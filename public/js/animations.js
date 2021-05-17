const words = ["build.", "cut.", "saw.", "renovate.", "Tool Trader."]

const cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
const masterTl = gsap.timeline({repeat: -1}).pause()
const boxTl = gsap.timeline()

boxTl.to('.box', {duration:1, width:"17vw", delay: 0.5, ease: "power4.inOut"})
  .from('.ready', {duration:1, y:"7vw", ease: "power3.out"})
  .to('.box', {duration:1, height:"7vw", ease: "elastic.out", onComplete: () => masterTl.play() })
  .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})
words.forEach(word => {
  let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1.5})
  tl.to('.text', {duration: 1, text: word})
  masterTl.add(tl)
})

gsap.timeline()
    .from('#body', {duration:1, opacity:0})
    .from('#owl', {opacity:0, scale:0, ease:'back'})
    .from('#owl img', {y:160, stagger:0.2, duration:0.8, ease:'back'})
    .from('#nav', {xPercent:100, duration:0.2 })

gsap.from('#left', {duration:1, y:'100%', ease:'bounce'});

gsap.from('#right', {duration:1, y:'-110%', ease:'bounce', delay:1, stagger:0.5});

gsap.from('#card', {duration:1.5, opacity:0.2, ease:'back', xPercent:100})