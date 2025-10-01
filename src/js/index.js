import '../styles/all.css';
import '../styles/form.css';
import '../styles/button.css';
import '../styles/section.css';
import '../styles/tab.css';
import '../styles/tag.css';
import '../styles/table.css';
import 'font-awesome/css/font-awesome.min.css';
import 'air-datepicker/air-datepicker.css';

window.addEventListener('load', async () => {
    const path = window.location.pathname.replace(/\/+|\.html$/g, '')
    const liEle = document.querySelector('.app-side ul li.' + path)
    if (liEle) {
        liEle.classList.add('active')
    }
    const sideBtn = document.querySelector('#side-btn')
    if (sideBtn) {
        sideBtn.addEventListener('click', toggleSide)
    }
})

function toggleSide() {
    const mainEle = document.querySelector('.app-main')
    if (mainEle) {
        mainEle.classList.toggle('collapsed')
    }

    const sideEle = document.querySelector('.app-side')
    if (sideEle) {
        sideEle.classList.toggle('collapsed')
    }

    const sideBtnIcon = document.querySelector('#side-btn > i')
    if (sideBtnIcon) {
        sideBtnIcon.classList.toggle('fa-arrow-circle-o-left')
        sideBtnIcon.classList.toggle('fa-arrow-circle-o-right')
    }
}
