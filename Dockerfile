FROM node:10.15.0
RUN export http_proxy=http://devproxy.oa.com:8080
RUN export https_proxy=http://devproxy.oa.com:8080

RUN mkdir -p /front-end
WORKDIR /front-end
COPY . /front-end

# 安装tnpm
RUN npm install @tencent/tnpm -g --registry=http://r.tnpm.oa.com --proxy=http://r.tnpm.oa.com:80 --verbose
# 安装依赖
RUN tnpm install
RUN tnpm rebuild node-sass
# 构建
RUN npm run build

FROM nginx
# 创建日志目录
RUN mkdir -p /data/logs/static
# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf
# 创建静态资源路径
RUN mkdir -p /data/static
# 拷贝indexd到/data目录下
COPY --from=0 /front-end/manage/index.html /data
# 拷贝build完的静态文件到/data/static/tlearn目录下
COPY --from=0 /front-end/manage /data/static/manage
# 添加配置文件
COPY static.conf /etc/nginx/conf.d
# 启动nginx
CMD nginx -g 'daemon off;'
