<template>
    <div class="file-preview">
        <div class="icon-name">
            <img :src="fileIconUrl" alt="">
            <p>文件名称</p>
        </div>
        <div class="operate">
            <el-button type="text" @click="onItemClick($event)">预览</el-button>
            <el-button type="text" >下载</el-button>
        </div>
    </div>
</template>
<script>
const validFileFormatReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|bmp|png|zip|rar)$/;
const priviewReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|png|bmp|zip|rar)$/;
const pcPreviewReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|png)$/;
const officeFile = /\.(doc|docx|ppt|pptx|xls|xlsx)$/;
const imageReg = /\.(jpg|jpeg|png)$/;
const j = 1024;
const kb = j;
const mb = kb * j;
const gb = mb * j;
const tb = gb * j;
import wx from 'weixin-js-sdk';
export default{
    props:{

    },
　　data(){
　　　　return {
            fileIconUrl:require('../public/images/file-icon/image.svg')
　　　　};
　　},
    mounted(){
        console.log("window.wx===",window.wx.invoke)
    },
    methods:{
        previewFile(item, index) {
            if (imageReg.test(item.name.toLowerCase())) {
                wx.previewImage({
                    current: item.url,
                    urls: this.imageItems.map((item) => {
                        return item.url;
                    })
                });
                
            } else {
                window.wx.invoke('previewFile', {
                    url: item.url,
                    name: item.name,
                    size: item.size
                });
            }
        },
        onItemClick(event) {
            let index=1
            let item={ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
            this.onPreview(event, item, index);
        },
    　  onPreview(event, item, index) {
            const isOfficeFile = officeFile.test(item.name.toLowerCase());
            const isPDF = /.pdf$/.test(item.name.toLowerCase());
            if (isOfficeFile) {
                window.open(`${siteHost()}viewer?v=${officeViewer(encodeURIComponent(item.url))}&title=${item.name}`, '_blank');
            } else if (imageReg.test(item.name.toLowerCase())) {
                let files={}
                let images = JSON.stringify(files.filter((i) => imageReg.test(i.name.toLowerCase())));
                let currentImage = JSON.stringify(item);
                if (window.btoa) {
                    images = window.btoa(encodeURIComponent(images));
                    currentImage = window.btoa(encodeURIComponent(currentImage));
                }
                window.open(`${siteHost()}viewer?images=${images}&current=${currentImage}`, '_blank');
            } else if (isPDF) {
                const url = `${siteHost()}plugins/pdfjs/web/viewer.html?file=${item.url}`;
                window.open(
                    `${siteHost()}viewer?v=${window.btoa ? window.btoa(encodeURIComponent(url)) : url}&title=${item.name}`,
                    '_blank'
                );
            }
            event.stopPropagation();
        }
    },
    
}
</script>
<style lang="less" scoped>
    .file-preview{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:space-between;
        background-color:#ECF1F6;
        border-radius:4px;
        padding:5px 10px;
        .icon-name{
            width:40%;
            display:flex;
            flex-direction:row;
            align-items:center;
            img{
                height:30px;
                width:30px;
            }
            p{
                margin-left:20px;
            }
        }
        .operate{

        }
        
    }
</style>