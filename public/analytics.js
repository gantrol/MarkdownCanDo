(function loadAnalytics() {
  if (location.hostname !== 'markdown.aicando.xyz') return

  const params = new URLSearchParams(document.currentScript?.src.split('?')[1] ?? '')
  const id = params.get('id')
  if (!id || !/^G-[A-Z0-9]+$/u.test(id)) return

  const load = () => {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', id)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    document.head.appendChild(script)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load, { timeout: 3000 })
  } else {
    window.setTimeout(load, 1500)
  }
})()
