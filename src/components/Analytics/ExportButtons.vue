<template>
      <v-btn class="text-none" @click="exportAsPDF" variant="tonal" color="primary">📄 Download PDF</v-btn>
      <v-btn class="text-none" @click="exportAsPNG" variant="tonal" color="secondary">🖼️ Download Image</v-btn>
</template>

<script setup>
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import { useMatchInfoStore } from '@/stores/matchInfoStore'

const matchInfoStore = useMatchInfoStore()

const exportAsPDF = () => {
  const element = document.getElementById('report')
  if (!element) return alert('Report section not found!')
  const opt = {
    margin:       0.5,
    filename:     `${matchInfoStore.player1FullName} vs ${matchInfoStore.player2FullName} Match Summary.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  }
  html2pdf().set(opt).from(element).save()
}

const exportAsPNG = () => {
  const element = document.getElementById('report')
  if (!element) return alert('Report section not found!')
  html2canvas(element, { scale: 2 }).then(canvas => {
    const link = document.createElement('a')
    link.download = `${matchInfoStore.player1FullName} vs ${matchInfoStore.player2FullName} Match Summary.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  })
}
</script>

<style scoped>
.export-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
</style>