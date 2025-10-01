// Toast Utils
// 用法：showToast('error', '錯誤', '檔案格式錯誤');
//      showToast('success', '成功', '檔案上傳成功');
(function() {
    const icons = {
        error: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#E53935"/><path d="M10 10l12 12M22 10l-12 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
        success: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#43A047"/><path d="M10 17l4 4 8-8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>'
    };
    const colors = {
        error: '#fdeaea',
        success: '#eafaf1'
    };
    const borderColors = {
        error: '#E53935',
        success: '#43A047'
    };
    window.showToast = function(type, title, message) {
        if (!['error', 'success'].includes(type)) type = 'success';
        const toast = document.createElement('div');
        toast.className = 'toast-box ' + type;
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="close">&times;</button>
        `;
        Object.assign(toast.style, {
            background: colors[type],
            borderLeft: '8px solid ' + borderColors[type],
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 24px',
            minWidth: '320px',
            maxWidth: '440px',
            marginBottom: '12px',
            position: 'relative',
            animation: 'toast-fadein 0.3s'
        });
        // Toast 容器
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            Object.assign(container.style, {
                position: 'fixed',
                top: '24px',
                right: '24px',
                zIndex: 9999
            });
            document.body.appendChild(container);
        }
        container.appendChild(toast);
        // 關閉按鈕
        toast.querySelector('.toast-close').onclick = function() {
            toast.style.opacity = 0;
            setTimeout(() => toast.remove(), 300);
        };
        // 自動消失
        setTimeout(() => {
            toast.style.opacity = 0;
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
    // CSS 動畫
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes toast-fadein { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none;}}
    .toast-box { transition: opacity 0.3s; }
    .toast-icon { flex: none; margin-right: 16px; }
    .toast-title { font-weight: bold; color: #E53935; font-size: 18px; }
    .toast-box.success .toast-title { color: #43A047; }
    .toast-message { font-size: 15px; color: #B71C1C; margin-top: 2px; }
    .toast-box.success .toast-message { color: #388E3C; }
    .toast-close { background: none; border: none; color: #E53935; font-size: 28px; font-weight: bold; position: absolute; top: 8px; right: 16px; cursor: pointer; line-height: 1; }
    .toast-box.success .toast-close { color: #43A047; }
    `;
    document.head.appendChild(style);
})();

