// Table 元件：可傳入 columns（標題）與 data（資料），支援分頁、篩選、排序
class Table {
    constructor({
                    columns,
                    data,
                    pageSize = 10,
                    container,
                    onSelect
                }) {
        this.columns = columns; // [{ key: 'id', label: '項次' }, ...]
        this.data = data;
        this.pageSize = pageSize;
        this.container = container;
        this.currentPage = 1;
        this.sortKey = null;
        this.sortOrder = 'asc';
        this.filters = {};
        this.onSelect = onSelect;
        this.render();
    }

    render() {
        // 清空容器
        this.container.innerHTML = '';
        // 篩選資料
        let filteredData = this.data.filter(row => {
            return Object.keys(this.filters).every(key => {
                if (!this.filters[key]) return true;
                return String(row[key]).includes(this.filters[key]);
            });
        });
        // 排序資料
        if (this.sortKey) {
            filteredData.sort((a, b) => {
                if (a[this.sortKey] === b[this.sortKey]) return 0;
                if (this.sortOrder === 'asc') {
                    return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
                } else {
                    return a[this.sortKey] < b[this.sortKey] ? 1 : -1;
                }
            });
        }
        // 分頁資料
        const total = filteredData.length;
        const totalPages = Math.ceil(total / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize;
        const pageData = filteredData.slice(start, start + this.pageSize);

        // 建立 table
        const table = document.createElement('table');
        table.className = 'custom-table';
        // 標題列
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        this.columns.forEach(col => {
            const th = document.createElement('th');
            th.style.width = col.width || undefined;

            if (col.type === 'checkbox') {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = this.data.every(row => row.select);
                input.onclick = (e) => this.checkAll(e);
                th.appendChild(input);
            } else {
                th.innerHTML = `${col.label} <span style="cursor:pointer;">⇅</span>`;
                th.onclick = () => this.toggleSort(col.key);
            }

            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        // 篩選列
        const trFilter = document.createElement('tr');
        this.columns.forEach(col => {
            const td = document.createElement('td');
            if (col.key !== 'id' && col.key !== 'index' && col.key !== 'action' && col.key !== 'select') {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = '請輸入';
                input.value = this.filters[col.key] || '';
                input.onblur = (e) => {
                    this.filters[col.key] = e.target.value;
                    this.currentPage = 1;
                    this.render();
                };
                td.appendChild(input);
            }
            trFilter.appendChild(td);
        });
        thead.appendChild(trFilter);
        table.appendChild(thead);
        // 資料列
        const tbody = document.createElement('tbody');
        pageData.forEach((row, idx) => {
            const tr = document.createElement('tr');
            this.columns.forEach(col => {
                const td = document.createElement('td');

                if (col.type === 'checkbox') {
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.checked = row.select || false;
                    input.onclick = (e) => {
                        row.select = e.target.checked;
                        if(this.onSelect && typeof this.onSelect === 'function') {
                            this.onSelect(this.data)
                        }
                        this.render();
                    }
                    td.appendChild(input);
                } else {
                    if (typeof col.render === 'function') {
                        td.innerHTML = col.render(row[col.key], row);
                    } else {
                        td.textContent = row[col.key];
                    }
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        // 分頁
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.innerHTML = `顯示第${start + 1}至${Math.min(start + this.pageSize, total)}筆，共${total}筆資料 `;
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.disabled = i === this.currentPage;
            btn.onclick = () => {
                this.currentPage = i;
                this.render();
            };
            pagination.appendChild(btn);
        }
        // pageSize select
        const select = document.createElement('select');
        [10, 20, 50, 100].forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            if (size === this.pageSize) option.selected = true;
            select.appendChild(option);
        });
        select.onchange = (e) => {
            this.pageSize = Number(e.target.value);
            this.currentPage = 1;
            this.render();
        };
        pagination.appendChild(select);
        // 渲染
        this.container.appendChild(table);
        this.container.appendChild(pagination);
    }

    toggleSort(key) {
        if (this.sortKey === key) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortKey = key;
            this.sortOrder = 'asc';
        }
        this.render();
    }

    checkAll(event) {
        this.data.forEach(row => {
            row.select = event.target.checked;
        });
        if(this.onSelect && typeof this.onSelect === 'function') {
            this.onSelect(this.data)
        }
        this.render();
    }

    updateData(newData) {
        this.data = newData;
        this.currentPage = 1; // 可選，重設分頁
        this.render();
    }
}

window.Table = Table;
