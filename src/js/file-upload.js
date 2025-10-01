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


window.addEventListener('load', async () => {
    new AirDatepicker('#startDate', {
        locale: zh, // 可選，設置中文
        dateFormat: 'yyyy-MM-dd'
    });
    new AirDatepicker('#endDate', {
        locale: zh, // 可選，設置中文
        dateFormat: 'yyyy-MM-dd'
    });

    document.querySelectorAll('.btn-group .btn').forEach((ele) => {
        ele.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-group .btn.active').forEach((activeEle) => {
                activeEle.classList.remove('active')
            })
            ele.classList.add('active')
        })
    })

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


    const columns1 = [{
        key: 'id',
        label: '項次',
        width: '100px'
    }, {
        key: 'time',
        label: '新增時間'
    }, {
        key: 'package',
        label: '包裹單號'
    }, {
        key: 'phone',
        label: '門號'
    }, {
        key: 'success',
        label: '是否成功'
    }];

    const data1 = [{
        id: 1,
        time: '2025-10-10 13:45:20',
        package: '288195635',
        phone: '0911517400',
        success: '是'
    }, {
        id: 2,
        time: '2025-10-10 13:45:20',
        package: '288195635',
        phone: '0947586253',
        success: '否'
    }, {
        id: 3,
        time: '2025-10-10 13:45:20',
        package: '288195635',
        phone: '0911517400',
        success: '是'
    }, {
        id: 4,
        time: '2025-10-10 13:45:20',
        package: '288195635',
        phone: '0913487569',
        success: '是'
    }, {
        id: 5,
        time: '2025-10-10 13:45:20',
        package: '288195635',
        phone: '0969478521',
        success: '否'
    }];

    const packageTableEle = document.getElementById('package-table')
    if (packageTableEle) {
        new Table({
            columns: columns1,
            data: data1,
            container: packageTableEle
        });

    }

    const columns2 = [{
        key: 'id',
        label: '項次',
        width: '100px'
    }, {
        key: 'date',
        label: '新增時間'
    }, {
        key: 'lastAccess',
        label: '最後存取時間'
    }, {
        key: 'name',
        label: '姓名'
    }, {
        key: 'phone',
        label: '實際號碼'
    }, {
        key: 'address',
        label: '地址'
    }]

    const data2 = [
        { id: 1, date: '2025-10-10 13:45:20', lastAccess: '2025-10-11 09:12:30', name: '張大*', phone: '0926****89', address: '台北市中山區建國北路二段86號1*樓之一' },
        { id: 2, date: '2025-10-10 13:46:10', lastAccess: '2025-10-11 10:15:22', name: '阮氏*花', phone: '0926****89', address: '新北市板橋區文化路一段188號*樓' },
        { id: 3, date: '2025-10-10 13:47:05', lastAccess: '2025-10-12 08:30:10', name: 'James B****', phone: '0926****89', address: '桃園市中壢區中山路100號*樓' },
        { id: 4, date: '2025-10-10 13:48:30', lastAccess: '2025-10-12 11:20:45', name: '齊藤*一', phone: '0926****89', address: '台中市西屯區台灣大道三段200號' },
        { id: 5, date: '2025-10-10 13:49:15', lastAccess: '2025-10-13 09:05:55', name: '李碧*', phone: '0926****89', address: '高雄市左營區自由路88號' },
        { id: 6, date: '2025-10-10 13:50:00', lastAccess: '2025-10-13 10:22:18', name: '范姜*惠', phone: '0926****89', address: '台南市東區中華東路二段66號' },
        { id: 7, date: '2025-10-10 13:51:20', lastAccess: '2025-10-13 11:33:40', name: '王小*', phone: '0926****89', address: '新竹市東區光復路一段123號' },
        { id: 8, date: '2025-10-10 13:52:10', lastAccess: '2025-10-14 09:44:12', name: '林美*', phone: '0926****89', address: '嘉義市西區民族路45號' },
        { id: 9, date: '2025-10-10 13:53:05', lastAccess: '2025-10-14 10:55:23', name: '陳建*', phone: '0926****89', address: '彰化縣員林市中正路200號' },
        { id: 10, date: '2025-10-10 13:54:00', lastAccess: '2025-10-14 11:06:34', name: '李雅*', phone: '0926****89', address: '屏東市民生路88號' },
        { id: 11, date: '2025-10-10 13:55:10', lastAccess: '2025-10-15 09:17:45', name: '黃志*', phone: '0926****89', address: '基隆市仁愛區愛三路12號' },
        { id: 12, date: '2025-10-10 13:56:20', lastAccess: '2025-10-15 10:28:56', name: '吳美*', phone: '0926****89', address: '新竹縣竹北市光明六路東一段88號' },
        { id: 13, date: '2025-10-10 13:57:30', lastAccess: '2025-10-15 11:39:07', name: '林志*', phone: '0926****89', address: '台北市信義區松仁路100號' },
        { id: 14, date: '2025-10-10 13:58:40', lastAccess: '2025-10-16 09:50:18', name: '陳冠*', phone: '0926****89', address: '新北市新店區北新路三段200號' },
        { id: 15, date: '2025-10-10 13:59:50', lastAccess: '2025-10-16 10:01:29', name: '王大*', phone: '0926****89', address: '台中市南屯區五權西路二段66號' },
        { id: 16, date: '2025-10-10 14:00:10', lastAccess: '2025-10-16 11:12:40', name: '李小*', phone: '0926****89', address: '高雄市三民區建國三路88號' },
        { id: 17, date: '2025-10-10 14:01:20', lastAccess: '2025-10-17 09:23:51', name: '周杰*', phone: '0926****89', address: '台南市北區公園路123號' },
        { id: 18, date: '2025-10-10 14:02:30', lastAccess: '2025-10-17 10:34:02', name: '林俊*', phone: '0926****89', address: '新竹市北區中正路45號' },
        { id: 19, date: '2025-10-10 14:03:40', lastAccess: '2025-10-17 11:45:13', name: '蔡依*', phone: '0926****89', address: '台北市大安區忠孝東路四段200號' },
        { id: 20, date: '2025-10-10 14:04:50', lastAccess: '2025-10-18 09:56:24', name: '江*', phone: '0926****89', address: '台中市北區學士路88號' }
    ];

    const dataTableEle = document.getElementById('data-table')
    if (dataTableEle) {
        new Table({
            columns: columns2,
            data: data2,
            container: dataTableEle
        });
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

    let table3 = null;
    const FileBtnEle = document.querySelector('#FileBtn')
    const SignBtnEle = document.querySelector('#SignBtn')
    if(SignBtnEle){
        SignBtnEle.addEventListener('click', ()=>{
            window.showToast('success', '簽章', '已送出簽章請求');
        })
    }

    const fileInputEle = document.querySelector('#FileInput')
    if (fileInputEle) {
        fileInputEle.addEventListener('change', (e) => {
            if (fileInputEle.files[0]) {
                const fileName = fileInputEle.files[0].name;
                const validExt = /\.(xlsx|xls|csv)$/i;
                if (!validExt.test(fileName)) {
                    window.showToast('error', '錯誤', `檔案格式不正確，請選擇 Excel 檔案`);
                } else {
                    window.showToast('success', '成功', `已選擇檔案：${fileName}`);
                    if(!table3){
                        const excelTableEle = document.getElementById('excel-table')
                        if (excelTableEle) {
                            table3 = new Table({
                                columns: columns3,
                                data: data3,
                                container: excelTableEle,
                                onSelect: (data) => {
                                    console.log('勾選狀態改變', data);
                                    if(SignBtnEle) {

                                        if (data.some(d => d.select && d.status === '未簽名')) {
                                            SignBtnEle.removeAttribute('disabled')
                                        } else {
                                            SignBtnEle.setAttribute('disabled', 'true')
                                        }
                                    }
                                }
                            });
                        }
                    }else{
                        data3.push({
                            select: false,
                            id: data3.length + 1,
                            fileName: fileName.split('.')[0] + '.pdf',
                            uploadTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                            status: '未簽名',
                            action: ''
                        });
                        table3.updateData(data3);
                    }

                }
            }
        })
    }

    if (FileBtnEle) {
        FileBtnEle.addEventListener('click', (e) => {
            fileInputEle.value = ''

            if (fileInputEle) {
                fileInputEle.click()
            }
        })
    }
})

window.handleViewClick = function() {
    window.location.href = '/sign.html'
}
