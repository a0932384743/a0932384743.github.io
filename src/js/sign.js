import './toast-utils'
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs';
import 'pdfjs-dist/build/pdf.worker.min.mjs'

window.addEventListener('load', async () => {
    const url = 'https://pdfobject.com/pdf/sample.pdf';
    pdfjsLib.getDocument(url).promise.then(pdf => {
        pdf.getPage(1).then(page => {
            const canvas = document.getElementById('pdfCanvas');
            if(canvas){
                const context = canvas.getContext('2d');
                const viewport = page.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({ canvasContext: context, viewport: viewport });

            }
        });
    });

    const SignPdfEle = document.querySelector('#SignPdf');
    if (SignPdfEle) {
        SignPdfEle.addEventListener('click', ()=>{
            window.showToast('success', '簽章成功！' , '');
        });
    }

    const GoBackEle = document.querySelector('#goBack');
    if (GoBackEle) {
        GoBackEle.addEventListener('click', ()=>{
            window.history.back();
        });
    }
})
