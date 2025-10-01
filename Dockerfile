# 使用官方 Nginx 映像
FROM nginx:stable-alpine

# 複製 dist 資料夾內容到 Nginx 預設靜態目錄
COPY dist /usr/share/nginx/html

# 開放 80 port
EXPOSE 80

# 啟動 Nginx（預設即可）
CMD ["nginx", "-g", "daemon off;"]

