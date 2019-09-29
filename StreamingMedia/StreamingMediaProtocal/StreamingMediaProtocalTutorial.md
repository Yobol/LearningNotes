# 流媒体协议初探

## RTSP

### 地址格式

`rtsp://uname:pwd@ip:port/folder`



当摄像头输出的是RTSP的数据流时，可以考虑如下的低时延方案：

1. RTSP -> ffmpeg -> RTMP -> Frontend
2. RTSP -> ffmpeg -> flv -> Frontend
3. RTSP -> 自定义服务器 -> WebSocket -> Frontend

如果以上方案还不能满足需求的话，可以考虑以下优化方案：

1. 优化播放器，甚至重写播放器；

## RTMP

RTMP对服务器要求较高（小打小闹用HTTP-FLV即可）；

不涉及转码问题，RTMP可以将延迟控制在1min之内；但需要转码时，就得靠N卡来加速ffmpeg（？）了。

## HTTP-FLV



## HLS

延迟较高，可以通过把切片分小一点来降低延迟；

## 参考

1. [ffmpeg](<http://ffmpeg.org/documentation.html>)