# 使用 Node.js 14 作为基础镜像
FROM node:18.13.0

# 在容器中创建和设置工作目录
WORKDIR /app

# 将 create-react-app 构建后的文件复制到容器中
COPY build/ /app/build/

ENV REACT_APP_BACKEND_URL=http://asa-zhang.top:8080

# 安装 serve 静态文件服务器
RUN npm install -g serve

# 声明容器运行时需要暴露的端口
EXPOSE 3001

# 在容器启动时运行的命令
CMD ["serve", "-s", "build", "-l", "3001"]