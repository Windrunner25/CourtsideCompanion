<template>
    <div class="export-buttons">
      <v-btn @click="exportAsPDF" color="primary">📄 Download PDF</v-btn>
      <v-btn @click="exportAsPNG" color="secondary">🖼️ Download Image</v-btn>
    </div>
</template>

<script setup>
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'

const exportAsPDF = () => {
  const element = document.getElementById('report')
  if (!element) return alert('Report section not found!')
  const opt = {
    margin:       0.5,
    filename:     'match-summary.pdf',
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
    link.download = 'match-summary.png'
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