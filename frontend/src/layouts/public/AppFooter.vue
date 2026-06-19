<template>
  <footer class="border-t border-warm-800 bg-warm-900 py-14 text-warm-400">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 shadow-lg shadow-primary-900/20">
              <i class="fas fa-heartbeat text-white"></i>
            </div>
            <span class="font-display text-lg font-bold text-white">Clinique Angelo</span>
          </div>

          <p class="max-w-xs text-sm leading-7">
            {{ $t('footer.description') }}
          </p>
        </div>

        <div>
          <h4 class="mb-4 font-semibold text-white">{{ $t('footer.quickLinks') }}</h4>
          <ul class="space-y-3 text-sm">
            <li><router-link to="/#about" class="footer-link">{{ $t('sections.about') }}</router-link></li>
            <li><router-link to="/#services" class="footer-link">{{ $t('nav.services') }}</router-link></li>
            <li><router-link to="/#doctors" class="footer-link">{{ $t('nav.doctors') }}</router-link></li>
            <li><router-link to="/#contact" class="footer-link">Contact</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 font-semibold text-white">{{ $t('nav.services') }}</h4>
          <ul class="space-y-3 text-sm">
            <li v-for="s in localizedServices.slice(0, 6)" :key="s.name">
              <span class="inline-flex items-center gap-2 text-warm-300">
                <i class="fas fa-angle-right text-xs text-primary-400"></i>
                {{ s.displayName }}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 font-semibold text-white">{{ $t('footer.followUs') }}</h4>

          <div class="flex flex-wrap gap-3">
            <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-700 bg-warm-800 transition hover:border-primary-500 hover:bg-primary-500 hover:text-white"
                :aria-label="social.label"
            >
              <i :class="social.icon" class="text-sm"></i>
            </a>
          </div>

          <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
          >
            <i class="fab fa-whatsapp text-lg"></i>
            {{ clinicPhone }}
          </a>
        </div>
      </div>

      <hr class="my-8 border-warm-800" />

      <div class="flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
        <p>{{ $t('footer.copyright') }}</p>
        <p>{{ $t('footer.location') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHomeContent } from '../../shared/composables/useHomeContent'

const { locale } = useI18n()
const { content } = useHomeContent()

const clinicPhone = ''
const whatsappUrl = `https://wa.me/${clinicPhone.replace(/\D/g, '')}`

const localizedServices = computed(() =>
    (content.value?.services ?? []).map((service) => ({
      ...service,
      displayName: locale.value === 'en' ? service.nameEn || service.name : service.name
    }))
)

const socialLinks = [
  {
    label: 'Facebook',
    icon: 'fab fa-facebook-f',
    url: 'https://www.facebook.com/medicaldouala'
  },
  {
    label: 'Instagram',
    icon: 'fab fa-instagram',
    url: 'https://www.instagram.com/medicaldouala'
  },
  {
    label: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    url: 'https://www.linkedin.com/company/medicaldouala'
  },
  {
    label: 'Email',
    icon: 'fas fa-envelope',
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=angleclinique@gmail.com'
  }
]
</script>

<style scoped>
.footer-link {
  @apply inline-flex items-center text-warm-400 transition hover:translate-x-1 hover:text-accent-400;
}
</style>