# Protobuf

## 安装

```shell
# Download
# 版本可以选择，建议和团队其他开发者统一
wget https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protobuf-cpp-3.6.1.tar.gz

# Decompress to the current directory
tar -xzvf protobuf-cpp-3.6.1.tar.gz
cd protobuf-cpp-3.6.1

# Compile & Install
./configure --prefix=/usr/local/protobuf
make
make check
sudo make install

# Add Envs
sudo vim /etc/profile
##############################
export PATH=$PATH:/usr/local/protobuf/bin
export PKG_CONFIG_PATH:/usr/local/protobuf/lib/pkgconfig
##############################
source /etc/profile

# Config Dynamic Libs
sudo vim /etc/ld.so.conf
##############################
/usr/local/protobuf/lib
##############################
sudo ldconfig

# Install Go Deps
go get -u github.com/golang/protobuf/protoc
go get -u github.com/golang/protobuf/protoc-gen-go
go get github.com/micro/protoc-gen-micro
```

## 语法

> https://developers.google.cn/protocol-buffers/docs/proto3