import AirDatepicker from 'air-datepicker';
import './toast-utils'
import './table'

const zh = {
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    daysShort: ['日', '一', '二', '三', '四', '五', '六'],
    daysMin: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    today: '今天',
    clear: '清除',
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'hh:mm',
    firstDay: 0
}

const columns3 = [{
    key: 'select',
    type: 'checkbox'
}, // 勾選欄
    {
        key: 'id',
        label: '項次',
        width: '100px'
    }, {
        key: 'fileName',
        label: '檔名'
    }, {
        key: 'uploadTime',
        label: '上傳時間'
    }, {
        key: 'status',
        label: '簽章狀態',
        render: (val, data) => `<span class="tag tag-${val === '已簽名' ? 'success' : val === '簽名中' ? 'warning' : 'default'}">${val}</span>`
    }, {
        key: 'action',
        label: '功能',
        render: (_, data) => `<button type="button" class="login-btn sm" onclick="handleViewClick('${data.id}')">查看</button>`
    }
];

const data3 = [{
    select: false,
    id: 1,
    fileName: '收款批次.pdf',
    uploadTime: '2025-10-10 13:45:20',
    status: '已簽名',
    action: ''
}, {
    select: false,
    id: 2,
    fileName: '銷貨單批次.pdf',
    uploadTime: '2025-10-10 13:45:20',
    status: '簽名中',
    action: ''
}, {
    select: false,
    id: 3,
    fileName: '應付批次.pdf',
    uploadTime: '2025-10-10 13:45:20',
    status: '已簽名',
    action: ''
}, {
    select: false,
    id: 4,
    fileName: '訂貨單批次.pdf',
    uploadTime: '2025-10-10 13:45:20',
    status: '未簽名',
    action: ''
}, {
    select: false,
    id: 5,
    fileName: '採購訂單批次.pdf',
    uploadTime: '2025-10-10 13:45:20',
    status: '未簽名',
    action: ''
}];

window.addEventListener('load', async () => {
    new AirDatepicker('#startDate', {
        locale: zh, // 可選，設置中文
        dateFormat: 'yyyy-MM-dd'
    });
    new AirDatepicker('#endDate', {
        locale: zh, // 可選，設置中文
        dateFormat: 'yyyy-MM-dd'
    });

    document.querySelectorAll('.tabs .tab').forEach((ele, index) => {
        ele.addEventListener('click', (e) => {
            document.querySelectorAll('.tabs .tab.active').forEach((activeEle) => {
                activeEle.classList.remove('active')
            })
            document.querySelectorAll('.tabs-container > *.active').forEach((activeEle) => {
                activeEle.classList.remove('active')
            })
            ele.classList.add('active')

            const tabsContainers = document.querySelectorAll('.tabs-container > *')
            if (tabsContainers?.length > 0) {
                tabsContainers[index].classList.add('active')
            }
        })
    })

    const dropZone = document.getElementById('dropZone');
    const xlsxBtn = document.getElementById('xlsxBtn');
    const xlsxInput = document.getElementById('xlsxInput');
    const xlsxFileList = document.getElementById('xlsxFileList');
    const uploadXlsxBtn = document.getElementById('uploadXlsxBtn');
    let files = [];

    if (xlsxBtn) {
        xlsxBtn.onclick = () => xlsxInput.click();
    }
    if (xlsxInput) {
        xlsxInput.onchange = (e) => {
            files = Array.from(e.target.files);
            renderFileList();
        };
    }

    if (dropZone) {
        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
        dropZone.addEventListener('dragleave', e => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
        });
        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            files = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.xlsx') || f.name.endsWith('.csv') || f.name.endsWith('.xls'));
            renderFileList();
        });
    }

    const SignBtnEle = document.querySelector('#SignBtn')
    if(SignBtnEle){
        SignBtnEle.addEventListener('click', ()=>{
            window.showToast('success', '簽章', '已送出簽章請求');
        })
    }

    let table3 = null;
    uploadXlsxBtn.onclick = () => {
        if (files.length === 0) {
            window.showToast('error', '錯誤', '請先選擇檔案');
        } else {
            window.showToast('success', '成功', `已上傳檔案，檔案筆數：${files.length}`);
            if (!table3) {
                const excelTableEle = document.getElementById('excel-table')
                if (excelTableEle) {
                    table3 = new Table({
                        columns: columns3,
                        data: data3,
                        container: excelTableEle,
                        onSelect: (data) => {
                            console.log('勾選狀態改變', data);
                            if (SignBtnEle) {
                                if (data.some(d => d.select && d.status === '未簽名')) {
                                    SignBtnEle.removeAttribute('disabled')
                                } else {
                                    SignBtnEle.setAttribute('disabled', 'true')
                                }
                            }
                        }
                    });
                }
            } else {
                files.forEach(f=>{
                    data3.push({
                        select: false,
                        id: data3.length + 1,
                        fileName: f.name.split('.')[0] + '.pdf',
                        uploadTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        status: '未簽名',
                        action: ''
                    });
                })

                table3.updateData(data3);
            }

        }
    };

    function renderFileList() {
        xlsxFileList.innerHTML = files.map(f => `<li>${f.name}</li>`).join('');
    }

})

window.handleViewClick = function() {
    window.location.href = '/sign.html'
}
