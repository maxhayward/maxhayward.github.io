<script setup lang="ts">
import CanvasSection from '@/components/CanvasSection.vue'
import { useExperienceStore } from '@/stores/experience'
import { onMounted, onUnmounted } from 'vue'
import ExperienceItem from '@/components/ExperienceItem.vue'

const experienceStore = useExperienceStore()
let fadeInElements: HTMLElement[] = []

const isElemVisible = (el: HTMLElement) => {
  var rect = el.getBoundingClientRect()
  var elemTop = rect.top + 200 // 200 = buffer
  var elemBottom = rect.bottom
  return elemTop < window.innerHeight && elemBottom >= 0
}

const handleScroll = () => {
  for (var i = 0; i < fadeInElements.length; i++) {
    var elem = fadeInElements[i]
    if (isElemVisible(elem)) {
      elem.style.opacity = '1'
      elem.style.transform = 'scale(1)'
      fadeInElements.splice(i, 1) // only allow it to run once
    }
  }
}

function scrollToElement(id: string) {
  const element = document.querySelector(`#${id}`)
  element?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  fadeInElements = Array.from(document.getElementsByClassName('fade-in')) as HTMLElement[]
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main class="text-white">
    <div class="grid">
      <div class="relative bg-black">
        <div>
          <CanvasSection />
        </div>
        <div class="absolute bottom-10 left-10">
          <div class="text-4xl pb-4">Max Hayward</div>
          <div>
            <ul
              class="sm:flex sm:flex-wrap sm:list-disc sm:space-x-6 sm:me-4 text-xl items-center justify-center text-center"
            >
              <p>AWS Enthusiast</p>
              <li>DevOps Evangelist</li>
              <li>Label Owner</li>
              <li>Events Promoter</li>
              <li>Dad</li>
            </ul>
          </div>
        </div>
        <div class="absolute bottom-10 right-10">
          <button v-on:click="scrollToElement('about')">
            <img
              src="@/components/icons/down.svg"
              alt="Down"
              class="w-16 h-16 rounded-full animate-bounce"
            />
          </button>
        </div>
      </div>
      <div class="relative pt-2 bg-gray-900">
        <div id="about" class="p-10">
          <div class="grid sm:w-128">
            <div class="text-3xl mb-4 fade-in">Hello! 👋🏼</div>
            <div>
              <img src="@/assets/profile_pic.png" alt="ProfilePic" class="mb-4 h-36 w-36 fade-in" />
              <p class="mb-2 md:pr-20 fade-in">
                I am a DevOps Consultant with a passion for AWS and all things cloud. Coming from a
                systems administrator background, I have been helping businesses in a DevOps
                capacity across a range of industries for over 10 years.
              </p>
              <p class="mb-2 md:pr-20 fade-in">
                I have a strong focus on several key pillars of platform engineering:
              </p>
              <ul class="list-disc ml-10 mb-2 fade-in">
                <li>Infrastructure as Code</li>
                <li>Culture & Collaboration</li>
                <li>Continuous Integration / Continuous Deployment</li>
                <li>Monitoring & Observability</li>
                <li>Security & Compliance</li>
              </ul>
              <p class="mb-2 md:pr-20 fade-in">
                Outside of technology, I have a passion for music and am involved in organizing a
                regular club night in London. I also run a record label alongside the events brand,
                with the aim of promoting new and upcoming artists.
              </p>
              <p class="mb-2 md:pr-20 fade-in">
                In my spare time I enjoy climbing, watching sport and keeping up to speed with the
                latest tech trends.
              </p>
              <p class="pb-2 md:pr-20 fade-in">
                Last but not least, I am also a father to two amazing children, and husband to an
                amazing wife. They keep me on my toes and I learn more about myself from them all
                the time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative pt-2 bg-black">
        <div id="experience" class="p-10">
          <div class="grid sm:w-128">
            <div class="text-3xl mb-4">Experience</div>
            <div
              v-for="experienceItem in experienceStore.experience"
              v-bind:key="experienceItem.dates"
            >
              <ExperienceItem v-bind="experienceItem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
