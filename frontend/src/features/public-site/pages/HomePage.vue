<template>
  <div class="isolate">
    <HeroSection />
    <StatsSection />
    <AboutSection />
    <ServicesSection />
<!--    <NewFeaturesSection />-->
    <DoctorsSection />
    <ImagerySection />
    <TestimonialsSection />
    <CtaSection />
    <ContactSection />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import {
  AboutSection,
  ContactSection,
  CtaSection,
  DoctorsSection,
  HeroSection,
  ImagerySection,
  // NewFeaturesSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection
} from '../../components'
import AppFooter from '../../../layouts/public/AppFooter.vue'
import { useScrollAnimation } from '../../../shared/composables/useScrollAnimation'

useScrollAnimation()
</script>
