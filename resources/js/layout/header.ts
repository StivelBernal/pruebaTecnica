const headerStatic = document.getElementById('fix-header-container-static')
const headerFixed = document.getElementById('fix-header-container-fixed')

if (headerFixed && headerStatic) {

  const observer = new IntersectionObserver((observedEntries) => {
    setEntries(observedEntries)
  }, {
    threshold: 0.75,
    root: null
  })
  
  const setEntries = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((x: IntersectionObserverEntry) => {
      console.log('🚀 ~ file: header.ts:13 ~ entries.forEach ~ x', x)
      headerFixed.classList[x.isIntersecting ? 'add' : 'remove']('hidden')
    })
  }
  
  observer.observe(headerStatic)

}