# Git

## 安装Git

### Ubuntu

```shell
# 更早的版本中为git-core
sudo apt-get install git

# 查看Git版本以验证是否安装成功
git --version
```

## 配置

### 配置当前用户个人信息

```shell
# --global表示配置全局（作用于所有本地仓库）有效
# 配置用户名
git config --global user.name "xxx"

# 配置邮箱
git config --global user.email "xxx@.xxx"
```

### 配置别名

`git config --global alias.<alias-name> '<command-name>'`

#### lg

`git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`

### 查看配置信息

#### 仓库的Git配置

仓库的Git配置文件存放在当前仓库下的.git/config文件中，使用`cat .git/config`查看，可以直接在该文件中删除相关信息，如配置别名。

#### 当前用户的Git配置文件

当前用户当Git配置文件放在用户主目录下的一个隐藏文件`.gitconfig`中，使用`cat ～/.gitconfig`查看。

## 查看仓库中所有人的提交记录

```shell
# 显示的内容是HEAD指向的版本以及它之前的所有版本！！！
# 记录格式：版本号，作者，时间，tag（每行一个信息）
# 可添加 --graph 显示分支合并记录
# 可添加 --pretty=oneline 精简信息，只在一行中显示版本号和tag
# 按时间逆序排
git log
```



## 本地仓库

### 创建本地仓库

```shell
$ mkdir learngit

$ cd learngit

# 将执行改命令所在的目录变成Git可以管理的仓库
# 生成.git隐藏文件夹
$ git init
```

### 工作区/暂存区/版本库

可以绘制状态图。

### 查看当前仓库的状态

```shell
# 可以在每一次操作后执行该命令来获得下一步可执行操作的提示
$ git status
```

### 查看三种状态的差异

```shell
# 比较工作区与暂存区（commit之前add内容的累积）的区别
$ git diff

# 比较暂存区与当前分支HEAD（上次commit之后的内容）的区别
$ git diff --cached
```

### 查看你在当前仓库中输入的所有命令

```shell
# 带有版本号
git reflog
```



### 工作区

在每次commit之后，就将工作区的内容作为一个快照保存在版本库中。每次修改工作区的内容后，有一下两种可执行操作（通过status命令可以查看）。

#### 对修改的内容不满意：丢弃本次改动

```shell
# 丢弃在上次commit之后，下次add之前的内容
$ git checkout -- <file-name>
```

#### 对修改的内容很满意：将工作区的内容添加到暂存区

```shell
# 将工作区中较上一次add/commit更新的部分添加到暂存区
# 可以使用通配符*
$ git add <file-name>
```

### 暂存区

#### 对add的内容不满意：将add之后的文件还原

```shell
# 首先需要将暂存区的内容还原
$ git reset --hard HEAD

# 然后将工作区的内容还原
$ git checkout -- <file-name>
```

#### 对add的内容很满意：将暂存区当内容提交到版本库

```shell
# 相当于快照snapshot
# 提交后暂存区的内容不清空，直到下一次执行add操作才更新其内容
$ git commit -m "xxx"
```

### 本地版本库

#### 对当前版本不满意：需要进行版本回退

```shell
# HEAD 是一个指向当前分支当前版本的指针
# ^ 表示往上一个版本，可使用n个
# ~n 表示往上n个版本
# 返回上个版本
$ git reset --hard HEAD^
```

#### 对当前版本很满意：推送到远程仓库

参见远程仓库。

### 小结

上面三种不满意的情况都是将仓库中的内容返回到上次commit之后的状态！！！

## 分支管理

HEAD指向分支，而分支指向版本（或提交），因此HEAD就指向当前分支的当前版本。

### 查看分支

```shell
# 当前当前所有分支
# *表示HEAD，指向当前分支
$ git branch
```

### 新建分支

```shell
# 新建并切换分支dev
$ git checkout -b dev
```

### 切换分支

```shell
# 切换到master分支
$ git checkout master
```

### 合并分支

```shell
# 将指定分支dev合并到当前分支（HEAD指向的分支）上
# 默认使用 fast-forward 模式，这种模式优点是速度快，但是会丢失分支信息
$ git merge dev

# 使用--no-ff 属性禁用 fast-forward 模式，而使用recursive模式
# 该方式可以在merge时生成一个commit，然后就可以从分支历史上查看分支信息
# [-m <"tag info">]
$ git merge --no-ff [-m <"tag info">] dev
```

#### 解决冲突

当merge时，有可能会产生冲突，而当有冲突产生时，自动merge会失效，Git会使用`<<<<<<< ======= >>>>>>>`来标记出不同分支的内容：

- 使用git status命令查看冲突信息；
- 手动修改文件内容；
- 重新add，commit。

### 删除分支

```shell
# 删除指定的分支dev
git branch -d dev
```

### Bug分支

修复bug时，

首先在dev分支上使用`git stash`命令保存当前工作现场；

然后切换到master分支上修复bug；

等修复完bug后，返回到dev分支，恢复现场，然后继续工作。

```shell
# 在dev分支保存现场
$ git stash

# 切换到master分支
$ git checkout master

# 修复bug

# 切回到dev分支
$ git checkout dev

# 恢复现场
$ git stash pop

########也可使用如下方式恢复现场########
$ git stash apply
$ git stash drop
```

### Feature分支

## 分支管理策略

1. master分支只用来发布新版本；
2. 所有修改都在dev分支上进行；
3. Bug分支用来修复bug；

## 远程仓库

本地仓库默认主分支 master

远程仓库名称 origin

远程仓库默认主分支 master

## 远程协作

### 将本地仓库与远程仓库相关联

```shell
# 当本地仓库先于远程仓库存在时，即先创建本地仓库，然后再在云端创建仓库
# 当远程仓库先于本地仓库存在时，即从云端clone仓库到本地
# origin 表示远程仓库默认名称

# 这里需要明确一下https和git协议的区别：
# git协议默认使用SSH确定用户身份
# https缺点是速度慢，而且每次推送都要输入口令
git remote add origin <reponsity-url>
```

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

