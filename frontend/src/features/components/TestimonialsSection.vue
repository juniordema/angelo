<template>
  <section class="section-y border-y border-warm-200/70 bg-gradient-to-b from-white to-warm-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="anim-scroll mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <span class="text-sm font-semibold uppercase tracking-widest text-primary-500">
          {{ $t('sections.testimonials') }}
        </span>

        <h2 class="section-title font-display mt-3 mb-4 font-bold text-warm-900">
          {{ $t('testimonials.subtitle') }}
        </h2>

        <p class="text-base leading-relaxed text-warm-500 sm:text-lg">
          {{ $t('testimonials.description') }}
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article
            class="anim-scroll relative overflow-hidden rounded-3xl bg-primary-700 p-6 text-white shadow-xl shadow-primary-900/20 sm:p-8 lg:p-10"
        >
          <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div class="absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-accent-300/20"></div>

          <div class="relative">
            <div class="mb-6 flex items-center justify-between gap-4">
              <div class="flex gap-1">
                <i v-for="s in 5" :key="s" class="fas fa-star text-sm text-accent-300"></i>
              </div>

              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <i class="fas fa-quote-right text-xl text-white/80"></i>
              </div>
            </div>

            <p class="font-display text-2xl font-bold leading-snug sm:text-3xl">
              “{{ mainTestimonial.displayText }}”
            </p>

            <div class="mt-8 flex items-center gap-4">
              <img
                  :src="`https://picsum.photos/seed/${mainTestimonial.photoSeed}/160/160.jpg`"
                  :alt="mainTestimonial.displayName"
                  class="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/30"
              />

              <div>
                <div class="text-sm font-bold text-white">
                  {{ mainTestimonial.displayName }}
                </div>
                <div class="mt-1 text-xs text-primary-100">
                  {{ mainTestimonial.displayInfo }}
                </div>
              </div>
            </div>
          </div>
        </article>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <article
              v-for="(item, i) in localizedTestimonials.slice(1)"
              :key="item.id"
              class="anim-scroll group rounded-3xl border border-warm-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl sm:p-6"
              :class="'delay-' + (i % 3 + 1)"
          >
            <div class="mb-4 flex items-start justify-between gap-4">
              <div class="flex gap-1">
                <i v-for="s in 5" :key="s" class="fas fa-star text-xs text-accent-400"></i>
              </div>

              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <i class="fas fa-quote-right text-sm"></i>
              </div>
            </div>

            <p class="text-sm leading-7 text-warm-600">
              “{{ item.displayText }}”
            </p>

            <div class="mt-5 flex items-center gap-3 border-t border-warm-100 pt-4">
              <img
                  :src="`https://picsum.photos/seed/${item.photoSeed}/120/120.jpg`"
                  :alt="item.displayName"
                  class="h-11 w-11 rounded-xl object-cover"
              />

              <div>
                <div class="text-sm font-bold text-warm-900">
                  {{ item.displayName }}
                </div>
                <div class="mt-1 text-xs text-warm-400">
                  {{ item.displayInfo }}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHomeContent } from '../../shared/composables/useHomeContent'

const { locale } = useI18n()
const { content } = useHomeContent()

const localizedTestimonials = computed(() =>
    (content.value?.testimonials ?? []).map((testimonial) => ({
      ...testimonial,
      displayName: locale.value === 'en' ? testimonial.nameEn || testimonial.name : testimonial.name,
      displayInfo: locale.value === 'en' ? testimonial.infoEn || testimonial.info : testimonial.info,
      displayText: locale.value === 'en' ? testimonial.textEn || testimonial.text : testimonial.text
    }))
)

const mainTestimonial = computed(
    () =>
        localizedTestimonials.value[0] || {
          id: 0,
          name: '',
          displayName: '',
          displayInfo: '',
          displayText: '',
          photoSeed: 'testimonial-default'
        }
)
</script>