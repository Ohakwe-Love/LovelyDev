function downloadPDF() {
    // const element = document.getElementById('cv-container');
    // const opt = {
    //     margin: 0.5,
    //     filename: 'Ohakwe_Love_Resume.pdf',
    //     image: { type: 'jpeg', quality: 0.98 },
    //     html2canvas: { 
    //         scale: 2,
    //         useCORS: true,
    //         letterRendering: true
    //     },
    //     jsPDF: { 
    //         unit: 'in', 
    //         format: 'a4', 
    //         orientation: 'portrait' 
    //     }
    // };

    // // Hide the download button before generating PDF
    // const downloadBtn = document.querySelector('.download-btn');
    // downloadBtn.style.display = 'none';

    // html2pdf().set(opt).from(element).save().then(() => {
    //     // Show the download button again after PDF generation
    //     downloadBtn.style.display = 'block';
    // });

    window.print();
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        downloadPDF();
    }
});