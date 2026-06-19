import { onMounted, onUnmounted, ref } from 'vue'

const SECTION_IDS = ['home', 'services', 'marketing-hub', 'imagerie', 'doctors', 'contact']

export function useActiveSection() {
  const activeSection = ref('home')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          activeSection.value = visibleEntry.target.id
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer?.observe(element)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { activeSection }
}
