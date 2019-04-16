# Git

本地仓库默认主分支 master

远程仓库名称 origin

远程仓库默认主分支 master

## 远程协作

**git remote查看远程仓库信息：**

```shell
# 默认显示远程仓库名，-v显示更为详细的信息，包括可以推送和抓取的信息
# 如果没有推送权限，就看不到push的地址
git remote -v
```

### 推送分支

**git push推送分支**

```shell
# git push将本地当前分支上的所有提交都推送到远程库，可以指定本地分支
git push origin dev
```

master是主分支，时刻要与远程同步

dev是开发分支，是所有团队成员当工作分支，也需要与远程同步

bug分支只用于在本地修复bug，没必要推送到远程

feature分支是否推送到远程，取决于是否和团队成员合作开发

### 抓取分支

**git checkout -b dev origin/dev**用远程origin的dev分支在本地创建dev分支

### 多人协作模式

多人协作的工作模式：

1. 首先，试用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，说明远程分支上有了新的推送，需要试用`git pull <remote> <branch-name>`拉取远程仓库上最新的内容；
3. 如果拉取失败，说明远程分支上最新的内容与要推送的内容在相同分支上并产生了冲突，首先需要将本地分支`dev`与远程分支`origin/dev`进行链接，``git branch --set-upstream-to=origin/dev dev``，然后在本地手动解决冲突并提交；
4. 待冲突解决完成后，重新推送。

## 标签

标签的实质是指向某个commit的指针。

`git tag [-a] <tag-name> [-m <des>] [<commit-id>]`，给指定commit添加标签，如果省略commit-id，则默认给最新提交的commit打上标签；

`git tag`查看所有标签； # 标签是按字母顺序排列的，而不是按照时间顺序

`git show <tag-name>`查看标签指向的commit信息；

`git tag -d <tag-name>` 删除指定的标签；

## 配置

### 配置别名

`git config --global alias.<alias-name> '<command-name>'`

#### lg

`git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`

### 查看配置信息

#### 仓库的Git配置

仓库的Git配置文件存放在当前仓库下的.git/config文件中，使用`cat .git/config`查看，可以直接在该文件中删除相关信息，如配置别名。

#### 当前用户的Git配置文件

当前用户当Git配置文件放在用户主目录下的一个隐藏文件`.gitconfig`中，使用`cat ～/.gitconfig`查看。

