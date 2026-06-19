import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null
  const observedElements = new WeakSet<Element>()

  function observeAnimScrollElements(root: ParentNode = document) {
    root.querySelectorAll('.anim-scroll').forEach((element) => {
      if (element.classList.contains('visible') || observedElements.has(element)) return

      observedElements.add(element)
      observer?.observe(element)
    })
  }

  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.anim-scroll').forEach((element) => {
        element.classList.add('visible')
      })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observeAnimScrollElements()

    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return

          if (node.matches('.anim-scroll') && !observedElements.has(node)) {
            observedElements.add(node)
            observer?.observe(node)
          }

          observeAnimScrollElements(node)
        })
      })
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    mutationObserver?.disconnect()
    observer?.disconnect()
  })
}
