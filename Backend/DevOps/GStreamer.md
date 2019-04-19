# GStreamer

GStreamer是设计用来处理多媒体流的框架。

## 安装（Ubuntu 16.04LTS）

```shell
# 安装GStreamer 1.0
$ sudo apt-get install libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools
```

使用官方Demo：

> basic-tutorial-1.c

```c
#include <gst/gst.h>
 
int main(int argc, char *argv[]) {
  GstElement *pipeline;
  GstBus *bus;
  GstMessage *msg;
 
  /* Initialize GStreamer */
  gst_init (&argc, &argv);
 
  /* Build the pipeline */
  pipeline = gst_parse_launch ("playbin uri=https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm", NULL);
 
  /* Start playing */
  gst_element_set_state (pipeline, GST_STATE_PLAYING);
 
  /* Wait until error or EOS */
  bus = gst_element_get_bus (pipeline);
  msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE, GST_MESSAGE_ERROR | GST_MESSAGE_EOS);
 
  /* Free resources */
  if (msg != NULL)
    gst_message_unref (msg);
  gst_object_unref (bus);
  gst_element_set_state (pipeline, GST_STATE_NULL);
  gst_object_unref (pipeline);
  return 0;
}
```

编译：

```shell
gcc basic-tutorial-1.c -o basic-tutorial-1 `pkg-config --cflags --libs gstreamer-1.0`
```

结果：

![1555659253343](assets/1555659253343.png)

代码讲解

1. gst_init() 是所有GStreamer应用的第一步，用来：

   - 初始化所有数据结构；
   - 检查所有可用插件；
   - 运行所有的命令行选项。

2. gst_parse_launch() 本身是用来描述一个管道的，但是也可以很方便地建立一个管道；

   - 上面的代码建立了一个只包含pipeline2元件的管道；

   - playbin2 是一个特殊的元件，既是source也是一个sink，同时也能处理整个pipeline的事务。

## 参考

1. [官方安装教程：Installing on Linux](https://gstreamer.freedesktop.org/documentation/installing/on-linux.html) 如果失败请移步 [在Ubuntu上运行GStreamer](https://blog.csdn.net/sinat_41559158/article/details/80524915)
2. [官方基础教程]() 如果看不懂请移步 [中文版教程集合](https://uzzz.org/2018/03/24/04faa85307086290e8a59b3b21927b70.html)

